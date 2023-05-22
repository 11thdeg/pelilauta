<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { deleteDoc, doc, getFirestore } from '@firebase/firestore'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import DeleteConfirmForm from '../../components/DeleteConfirmForm/DeleteConfirmForm.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useSession } from '../../composables/useSession'
import { useSite } from '../../composables/useSite'
import { useSnack } from '../../composables/useSnack'

const props = defineProps<{
  sitekey: string;
}>()

const { t } = useI18n()
const { site, loading } = useSite(props.sitekey)
const { uid } = useSession()
const { pushSnack } = useSnack()
const router = useRouter()

const verified = ref(false)

const canEdit = computed(() => site.value?.owners.includes(uid.value || ''))

async function deleteSite() {
  if (!site.value) throw new Error('No site')
  if (!verified.value) throw new Error('Not verified')
  if (!canEdit.value) throw new Error('Not allowed')

  await deleteDoc(
    doc(
      getFirestore(),
      Site.collectionName,
      props.sitekey
    )
  )
  pushSnack('snacks.page.deleted')
  router.push('/sites/')
}
</script>

<template>
  <cyan-top-app-bar
    id="TopBar"
    modal
    back
    @back="router.back()"
  >
    <h3>
      {{ t('site.tools.meta.delete') }} <span class="hideOnMobile">- {{ site?.name }}</span>
    </h3>
  </cyan-top-app-bar>
  <main class="bookLayout">
    <WithLoader :suspended="loading">
      <WithPermission :forbidden="!canEdit">
        <article class="Column">
          <DeleteConfirmForm
            v-model="verified"
            :title="t('site.deleteConfirm.title')"
            :message="t('site.deleteConfirm.message')"
            confirm-text="Poista sivusto pysyvästi"
          />
          <cyan-toolbar>
            <cyan-spacer />
            <cyan-button
              text
              :label="t('action.cancel')"
              @click="router.back()"
            />
            <cyan-button
              :disabled="!verified"
              :label="t('action.remove')"
              @click="deleteSite"
            />
          </cyan-toolbar>
        </article>
      </WithPermission>
    </WithLoader>
  </main>  
</template>