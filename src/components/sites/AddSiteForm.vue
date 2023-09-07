<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSession } from '../../composables/useSession'
import { useSnack } from '../../composables/useSnack'
import { logDebug } from '../../utils/logHelpers'
import SiteThemeSelect from './SiteThemeSelect.vue'
import { toMekanismiURI } from '../../utils/toMekanismiURI'
import { addStorable, fetchStorable } from '../../utils/firestoreHelpers'

const { t } = useI18n()
const router = useRouter()
const { uid } = useSession()
const { pushSnack } = useSnack()

const name = ref('')

const hidden = ref(false)

const system = ref('homebrew')

// Site key generation
const vanityKey = ref(false)
const siteKey = ref('')
const customKey = computed(() => {
  return toMekanismiURI(name.value)
})
const siteKeyExists = ref(false)

async function onSave() {
  const site = new Site()

  site.name = name.value
  site.hidden = hidden.value || false // default to false
  site.system = system.value
  site.systemBadge = system.value

  // push the current user to the owners array
  site.addOwner(uid.value)

  logDebug('AddSiteForm', onSave, site, vanityKey.value)


  let key = ''
  if (vanityKey.value) {
    const sk = siteKey.value ? toMekanismiURI(siteKey.value) : customKey.value

    // Check if the custom key exists, and abort with field error if so
    const secondSite = await fetchStorable([
      Site.collectionName,
      sk
    ])

    if (secondSite) {
      siteKeyExists.value = true
      return
    }
    
    // Add with custom key
    key = await addStorable(site, { key: sk})
  }
  else {
    // Add with auto-generated key
    key = await addStorable(site)
  }

  if (key) {
    pushSnack('snacks.site.created')
    router.push(`/sites/${key}`)
  }
}




</script>

<template>
  <article class="Column column">
    <h1 class="downscaled">
      {{ t('sites.create.title') }}
    </h1>

    <form>
      <fieldset>
        <label>
          {{ t('fields.site.name') }}
          <input
            v-model="name"
            type="text"
            :placeholder="t('fields.site.name')"
          >
        </label>

        <!-- Site theme selection -->
        <cyan-toolbar>
          <cyan-icon :noun="system" />
          <SiteThemeSelect
            v-model="system"
            style="flex-grow:1"
          />
        </cyan-toolbar>
      </fieldset>

      <fieldset>
        <legend>
          {{ t('site.create.extra') }}
        </legend>
        <!-- toggle site visibility in public listings -->
        <cn-toggle-button
          :label="t('fields.site.hidden')"
          :pressed="hidden"
          :aria-pressed="hidden"
          @change="hidden = $event.target.pressed"
        />
        <!-- Toggles site key generation -->
        <cn-toggle-button
          :label="t('site.create.vanityKey')"
          :pressed="vanityKey"
          :aria-pressed="vanityKey"
          @change="vanityKey = $event.target.pressed"
        />

        <!-- Site key input -->
        <label v-if="vanityKey">
          {{ t('fields.site.key') }}
          <input
            v-model="siteKey"
            :class="{ invalid: siteKeyExists }"
            type="text"
            :placeholder="customKey"
            @focus="siteKeyExists = false"
          >
        </label>
      </fieldset>

      <div class="flex flex-row justify-right">
        <button
          class="text"
          @click.prevent="router.back()"
        >
          {{ t('action.cancel') }}
        </button>
        <button
          class="primary"
          @click.prevent="onSave()"
        >
          {{ t('action.save') }}
        </button>
      </div>
    </form>
  </article>
</template>