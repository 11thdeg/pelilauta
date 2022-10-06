<script lang="ts" setup>
import TopBar from '../../components/ui/TopBar.vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { computed } from 'vue'
import ForbiddenView from '../../components/ui/ForbiddenView.vue'
import { useThread } from '../../composables/useThread'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'

const props = defineProps<{
  threadkey: string
}>()

const { thread, notFound } = useThread(props.threadkey)

const { t } = useI18n()
const { admin, uid } = useSession()
const canDelete = computed(() => thread.value && thread.value.hasOwner(uid.value || '') || admin.value)
</script>

<template>
  <div class="ConfirmThreadDeletionView">
    <ForbiddenView v-if="!canDelete" />
    <template v-else>
      <EmptyCollection
        v-if="notFound"
        noun="discussion"
      />
      <template v-else>
        <TopBar :title="t('action.delete')" />
        <main class="singleColumnLayout">
          {{ thread }}
        </main>
      </template>
    </template>
  </div>
</template>