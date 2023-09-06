<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { doc, getFirestore, updateDoc } from '@firebase/firestore'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePages } from '../../composables/usePages'
import { useSite } from '../../composables/useSite'
import SiteLicenseSelect from './SiteLicenseSelect.vue'
import SiteVisibilityToggle from './SiteVisibilityToggle.vue'
import { useRouter } from 'vue-router'
import SiteConfigSection from './SiteConfigSection.vue'

const { t } = useI18n()
const { site } = useSite()
const { pageOptions} = usePages(site.value?.key || '')
const router = useRouter()

const chosen = computed(() => site.value?.homepage || site.value?.key || '')

async function setHomePage(pageKey: string) {
  updateDoc(
    doc(
      getFirestore(),
      Site.collectionName,
      site.value?.key || ''
    ),
    {
      homepage: pageKey
    }
  )
}
</script>

<template>
  <article class="Column">
    <h3>{{ t('site.tools.meta.title') }}</h3>
    <p class="TypeBody2 lowEmphasis">
      {{ t('site.tools.meta.info') }}
    </p>
    <form class="fieldSet">
      <h4>
        {{ t('fields.site.homepage') }}
      </h4>
      <cyan-select
        :options="pageOptions"
        :value="chosen"
        @change="setHomePage($event.target.value)"
      />
      <p><SiteVisibilityToggle /></p>
      <SiteLicenseSelect />
      <p v-if="site">
        <cyan-button
          text
          noun="delete"
          :label="t('site.tools.meta.delete')"
          @click="router.push(`/sites/${site?.key}/remove`)"
        />
      </p>
    </form>
    <SiteConfigSection />
  </article>
</template>