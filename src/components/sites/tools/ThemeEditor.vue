<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSite } from '../../../composables/useSite'
import SiteAvatar from '../SiteAvatar.vue'
import SelectAssetDialog from '../../assets/SelectAssetDialog.vue'
import { doc, getFirestore, updateDoc } from '@firebase/firestore'
import { Site } from '@11thdeg/skaldstore'
import { logDebug } from '../../../utils/logHelpers'
import SiteThemeSelect from '../SiteThemeSelect.vue'

const { site, update } = useSite()

const posterStyle = computed(() => {
  logDebug('ThemeEditor', 'posterStyle', site.value?.posterURL)
  if (site.value?.posterURL) return 'background-image: url(' + site.value.posterURL + ')'
  return 'background: var(--color-background)'
})

const selectPosterDialog = ref(false)
const selectAvatarDialog = ref(false)

function onSelectPoster (e: string) {
  selectPosterDialog.value = false
  updateDoc(
    doc(
      getFirestore(),
      Site.collectionName,
      site.value?.key || ''
    ),
    {
      posterURL: e
    }
  )
}
function onSelectAvatar (e: string) {
  selectAvatarDialog.value = false
  updateDoc(
    doc(
      getFirestore(),
      Site.collectionName,
      site.value?.key || ''
    ),
    {
      avatarURL: e
    }
  )
}


const siteTheme = computed({
  get: () => site.value?.systemBadge || 'default',
  set: (e: string) => {
    if (site.value) {
      site.value.system = e
      site.value.systemBadge = e
    }
    update({
      system: e,
      systemBadge: e
    })
  }
})
</script>

<template>
  <div
    v-if="site"
    class="Column card rise-b ThemeEditor"
  >
    <div
      class="cardHeader"
      :class="{hasPoster: !!site.posterURL}"
      :style="posterStyle"
    >
      <h3>{{ site.name }}</h3>
      <SiteAvatar
        :site="site"
        class="siteAvatar"
      />
    </div>
    <section style="border-bottom: solid 1px var(--cyan-divider-color); padding-bottom: 11px; margin-bottom: 12px">
      <SiteThemeSelect v-model="siteTheme" />
    </section>
    <cyan-button
      label="SELECT POSTER"
      @click="selectPosterDialog = true"
    />
    <SelectAssetDialog
      v-model="selectPosterDialog"
      @select="onSelectPoster($event)"
    />
    <cyan-button
      label="REMOVE POSTER"
      @click="onSelectPoster('')"
    />
    <cyan-button
      label="SELECT AVATAR"
      @click="selectAvatarDialog = true"
    />
    <SelectAssetDialog
      v-model="selectAvatarDialog"
      @select="onSelectAvatar($event)"
    />
    <cyan-button
      label="REMOVE AVATAR"
      @click="onSelectAvatar('')"
    />
  </div>
</template>

<style lang="sass" scoped>
.cardHeader
  margin: -12px
  margin-bottom: 12px
  border-radius: 12px 12px 0 0
  position: relative
  min-height: 88px
  h3
    color: white
    padding: 12px
    padding-left: 96px
    padding-top: 72px
    text-shadow: 0px 0px 8px #002337
  .siteAvatar
    position: absolute
    bottom: -8px
    left: 12px
.hasPoster
  background-size: cover
  background-position: center
  background-repeat: no-repeat
    
</style>