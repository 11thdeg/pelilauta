<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { addDoc, collection, getFirestore } from '@firebase/firestore'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSession } from '../../composables/useSession'
import { useSnack } from '../../composables/useSnack'
import { logDebug } from '../../utils/logHelpers'
import SiteThemeSelect from './SiteThemeSelect.vue'

const { t } = useI18n()
const router = useRouter()
const { uid } = useSession()
const { pushSnack } = useSnack()

function onCancel() {
  router.back()
}
async function onSave() {
  logDebug('onSave', site.value)
  site.value.systemBadge = site.value.system || 'mekanismi'
  site.value.owners = [uid.value]
  const data = site.value.docData
  const siteDoc = await addDoc(
    collection(
      getFirestore(),
      Site.collectionName
    ),
    data
  )
  pushSnack('snacks.site.created')
  router.push(`/sites/${siteDoc.id}`)
}

const site = ref(new Site())

onMounted(() => {
  site.value.system = 'll'
})

</script>

<template>
  <div class="AddSiteForm Column">
    <h3>{{ t('sites.create.title') }}</h3>
    <form class="fieldset">
      <cyan-textfield
        :label="t('fields.site.name')"
        @change="site.name = $event.target.value"
      />
      <cyan-textfield
        :label="t('fields.site.description')"
        @change="site.description = $event.target.value"
      />
      <cyan-toolbar>
        <cyan-icon :noun="site.system" />
        <SiteThemeSelect
          v-model="site.system"
          style="flex-grow:1"
        />
      </cyan-toolbar>
      
      <cyan-toggle
        :label="t('fields.site.hidden')"
        :checkded="site.hidden"
        @change="site.hidden = $event.target.value"
      />
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          text
          :label="t('action.cancel')"
          @click="onCancel"
        />
        <cyan-button
          :label="t('action.add.new')"
          noun="add"
          @click="onSave()"
        />
      </cyan-toolbar>
    </form>
  </div>
</template>