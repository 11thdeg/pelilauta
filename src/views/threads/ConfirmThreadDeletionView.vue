<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { computed, ref } from 'vue'
import { useThread } from '../../composables/useThread'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import { logEvent } from '../../utils/logHelpers'
import { deleteDoc, getFirestore, doc } from '@firebase/firestore'
import { Thread } from '@11thdeg/skaldstore'
import { useRouter } from 'vue-router'
import { useSnack } from '../../composables/useSnack'
import { purgeThread } from '../../composables/useThreads'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import DeleteConfirmForm from '../../components/DeleteConfirmForm/DeleteConfirmForm.vue'

const props = defineProps<{
  threadkey: string
}>()

// eslint-disable-next-line vue/no-setup-props-destructure
const { thread, notFound, loading } = useThread(props.threadkey)
const router = useRouter()
const { pushSnack } = useSnack()
const { t } = useI18n()
const { admin, uid } = useSession()
const canDelete = computed(() => thread.value && thread.value.hasOwner(uid.value || '') || admin.value)

const confirmed = ref(false)

async function deleteThread () {
  if (!confirmed.value) return
  logEvent('thread', { action: 'delete', thread: props.threadkey })
  await deleteDoc(
    doc(getFirestore(), Thread.collectionName, props.threadkey)
  )
  purgeThread(props.threadkey)
  pushSnack('snacks.thread.deleted')
  router.push('/')
}
</script>

<template>
  <div class="ConfirmThreadDeletionView">
    <cn-app-bar
      id="TopBar"
      modal
      :title="t('action.delete') + ' ' + thread?.title"
      @back="() => router.back()"
    />
    <main class="container">
      <WithLoader :suspended="loading">
        <EmptyCollection
          v-if="notFound"
          noun="discussion"
        />
        <WithPermission :forbidden="!canDelete">
          <article class="column">
            <DeleteConfirmForm
              v-model="confirmed"
              :title="t('action.confirmDelete')"
              confirm-text="Poista"
              :message="t('thread.delete.warning') "
            />
            <cyan-toolbar>
              <cyan-spacer />
              <button
                :disabled="!confirmed"
                @click="deleteThread"
              >
                <cyan-icon
                  small
                  noun="delete"
                />
                {{ t('action.delete') }}
              </button>
          
              <!--cyan-button
                :label="t('action.delete')"
                noun="delete"
                :disabled="!confirmed"
                @click="deleteThread"
              /-->
            </cyan-toolbar>
          </article>
        </WithPermission>
      </WithLoader>
    </main>
  </div>
</template>