<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MarkDownCheatSheetColumn from '../../components/content/MarkDownCheatSheetColumn.vue'
import ThreadEditorColumn from '../../components/ThreadEditorColumn/ThreadEditorColumn.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useSession } from '../../composables/useSession'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const { active, anonymous, frozen } = useSession()

const props = defineProps<{
  streamkey?: string
}>()

const thread = ref(new Thread())

onMounted(() => {
  if (props.streamkey) {
    thread.value = new Thread()
    thread.value.topicid = props.streamkey
  }
})

const forbidden = computed(() => anonymous.value || frozen.value)
</script>

<template>
  <cyan-top-app-bar
    id="TopBar"
    modal
    @back="() => router.back()"
  >
    <h3>{{ t('thread.create.title') }}</h3>
  </cyan-top-app-bar>

  <main
    id="CreateThreadView"
    class="bookLayout"
  >
    <WithLoader :suspended="!active">
      <WithPermission :forbidden="forbidden">
        <ThreadEditorColumn :thread="thread" />
      </WithPermission>
    </WithLoader>
  </main>
  <div class="bookLayout">
    <MarkDownCheatSheetColumn />
  </div>
</template>