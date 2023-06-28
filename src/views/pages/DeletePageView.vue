<script lang="ts" setup>
import { Page, Site } from '@11thdeg/skaldstore'
import { deleteDoc, doc, getFirestore } from '@firebase/firestore'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import DeleteConfirmForm from '../../components/DeleteConfirmForm/DeleteConfirmForm.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { usePage } from '../../composables/usePage'
import { useSnack } from '../../composables/useSnack'

const props = defineProps<{
  sitekey: string;
  pagekey: string;
}>()

const { t } = useI18n()
const { pushSnack } = useSnack()
const router = useRouter()

const { loading, canEdit, page } = usePage(props.pagekey, props.sitekey)

const verified = ref(false)

async function deletePage () {
  if(!verified.value) return
  await deleteDoc(
    doc(
      getFirestore(),
      Site.collectionName,
      props.sitekey,
      Page.collectionName,
      props.pagekey
    )
  )
  pushSnack('snacks.page.deleted')
  router.push(`/sites/${props.sitekey}`)
}
</script>
<template>
  <cn-app-bar
    id="TopBar"
    :title="$t('page.deleteConfirm.title') +' '+ page?.name || ''"
    modal
    @back="() => router.back()"
  />
  <main class="bookLayout">
    <WithLoader :suspended="loading">
      <WithPermission :forbidden="!canEdit">
        <article class="Column">
          <DeleteConfirmForm
            v-model="verified"
            :title="t('page.deleteConfirm.title')"
            :message="t('page.deleteConfirm.message')"
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
              @click="deletePage"
            />
          </cyan-toolbar>
        </article>
      </WithPermission>
    </WithLoader>
  </main>  
</template>