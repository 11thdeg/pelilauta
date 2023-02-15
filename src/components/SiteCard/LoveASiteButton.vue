<script lang="ts" setup>
import { CyanReactionButton } from '@11thdeg/cyan'
import { Reaction, Site } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { useSession } from '../../composables/useSession'
import { addStorable } from '../../utils/firestoreHelpers'
import { logDebug, logEvent } from '../../utils/logHelpers'

const props = defineProps<{
  site: {
    key?: string
    lovedCount?: number
    hasOwner: (uid: string) => boolean
  }
}>()
const { profile, uid } = useSession()

const loves = computed(
  {
    get: () => profile.value?.loves(props.site.key || '') || false,
    set: async (value: boolean) => {
      logDebug('loves not implemented', value)
      if (value) await loveSite()
      else await unLoveSite()
    }
  }
)

const owns = computed(() => props.site.hasOwner(uid.value || ''))

function handleChange (e: Event) {
  const button = (e.target as CyanReactionButton)
  logDebug('handleChange', button.on, button.ariaPressed)
  loves.value = button.on
}

/**
 * Given   I am logged in
 *   And   Have a profile
 *   And   A Site is not loved by me
 *         (and, thus) The site exists
 *  When   I click love on a site
 *  Then   // The site is loved visually
 *   And   The site loved count++, by the backend
 *   And   The site is added to my loved-sites collection
 */
async function loveSite () {
  logEvent('Love a Site', { uid: uid.value, sitekey: props.site.key,})
  // const site = await getSite(props.site.key || '')
  const reaction = new Reaction()
  if (!props.site.key || !uid.value) throw new Error('Missing site key or uid')
  reaction.actor = uid.value
  reaction.targetEntry = Site.collectionName,
  reaction.targetKey = props.site.key
  reaction.type = Reaction.TYPE_LOVE
  await addStorable(reaction)
}

/**
 * Given   I am logged in
 *   And   Have a profile
 *   And   A Site is loved by me
 *         (and, thus) The site exists
 *  When   I click love on a site
 *  Then   // The site is unloved visually
 *   And   The site loved count--, by the backend
 *   And   The site is removed from my loved-sites collection
 */
async function unLoveSite () {
  logEvent('unLoveReply', { uid: uid.value, sitekey: props.site.key,})
  // const site = await getSite(props.site.key || '')
}
</script>

<template>
  <cn-reaction-button
    :on="loves"
    :aria-pressed="loves + ''"
    :disabled="owns"
    :count="0"
    @change="handleChange"
  />  
</template>