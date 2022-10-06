<script lang="ts" setup>
import TopBar from '../../components/ui/TopBar.vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { computed, ref } from 'vue'
import ForbiddenView from '../../components/ui/ForbiddenView.vue'
import { useThread } from '../../composables/useThread'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import { logEvent } from '../../utils/logHelpers'
import { deleteDoc, getFirestore, doc } from '@firebase/firestore'
import { Thread } from '@11thdeg/skaldstore'
import { useRouter } from 'vue-router'
import { useSnack } from '../../composables/useSnack'
import { forgetThread } from '../../composables/useThreads'

const props = defineProps<{
  threadkey: string
}>()

const { thread, notFound } = useThread(props.threadkey)
const router = useRouter()
const { pushSnack } = useSnack()
const { t } = useI18n()
const { admin, uid } = useSession()
const canDelete = computed(() => thread.value && thread.value.hasOwner(uid.value || '') || admin.value)

const confirm = ref('')
const confirmed = computed(() => confirm.value === 'DELETE')

async function deleteThread () {
  if (!confirmed.value) return
  logEvent('thread', { action: 'delete', thread: props.threadkey })
  await deleteDoc(
    doc(getFirestore(), Thread.collectionName, props.threadkey)
  )
  forgetThread(props.threadkey)
  pushSnack(t('thread.deleted'))
  router.push('/')
}
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
          <p>{{ t('thread.delete.warning') }}</p>
          <cyan-textfield
            :value="confirm"
            :label="t('action.confirm')"
            @change="confirm = $event.detail"
          />
          <cyan-button
            :label="t('action.delete')"
            noun="delete"
            :disabled="!confirmed"
            @click="deleteThread"
          />
        </main>
      </template>
    </template>
  </div>
</template>