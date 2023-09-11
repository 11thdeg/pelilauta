<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSite } from '../../../composables/useSite'
import { computed } from 'vue'
import { updateStorable } from '../../../utils/firestoreHelpers'
import SiteThemeSelect from '../../sites/SiteThemeSelect.vue'

const { t } = useI18n()

const { site } = useSite()

const name = computed({
  get: () => site.value?.name || '',
  set: (e: string) => {
    site.value.name = e
    updateStorable(site.value, {
      name: e
    })
  }
})

const description = computed({
  get: () => site.value?.description || '',
  set: (e: string) => {
    site.value.description = e
    updateStorable(site.value, {
      description: e
    })
  }
})

const siteTheme = computed({
  get: () => site.value?.systemBadge || 'default',
  set: (e: string) => {
    if (site.value) {
      site.value.system = e
      site.value.systemBadge = e
    }
    updateStorable(site.value, {
      system: e,
      systemBadge: e
    })
  }
})
</script>

<template>
  <section>
    <fieldset>
      <legend>{{ $t('site.tools.settings.info') }}</legend>

      <label>
        {{ t('fields.site.name') }}
        <input
          :value="name"
          type="text"
          @change="event => name = (event.target as HTMLInputElement).value || ''"
        >
      </label>

      <label>
        {{ t('fields.site.description') }}
        <input
          :value="description"
          type="text"
          @change="event => description = (event.target as HTMLInputElement).value || ''"
        >
      </label>

      <SiteThemeSelect v-model="siteTheme" />
    </fieldset>
  </section>
</template>