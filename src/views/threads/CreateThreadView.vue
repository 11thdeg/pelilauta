<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/navigation/TopBar.vue'
import ThreadEditorColumn from '../../components/ThreadEditorColumn/ThreadEditorColumn.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useSession } from '../../composables/useSession'

const { t } = useI18n()
const { active, anonymous, frozen } = useSession()
const thread = ref(new Thread())

const forbidden = computed(() => anonymous.value || frozen.value)
</script>

<template>
  <TopBar :title="t('thread.create.title')" />
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
</template>