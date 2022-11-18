<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSite } from '../../../composables/useSite'
import SiteAvatar from '../SiteAvatar.vue'
import SelectAssetDialog from '../../assets/SelectAssetDialog.vue'
import { doc, getFirestore, updateDoc } from '@firebase/firestore'
import { Site } from '@11thdeg/skaldstore'
import { logDebug } from '../../../utils/logHelpers'
import SiteThemeSelect from '../SiteThemeSelect.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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

const name = computed({
  get: () => site.value?.name || '',
  set: (e: string) => {
    update({
      name: e
    })
  }
})
const description = computed({
  get: () => site.value?.description || '',
  set: (e: string) => {
    update({
      description: e
    })
  }
})

function setSiteVisibility(e: boolean) {
  update({
    hidden: e
  })
}

</script>

<template>
  <div
    v-if="site"
    class="Column ThemeEditor"
  >
    <div class="card rise-a">
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
      <section class="toolset">
        <cyan-textfield
          :value="name"
          :label="t('fields.site.name')"
          @change="name = $event.target.value"
        />
        <cyan-textfield
          :value="description"
          :label="t('fields.site.description')"
          @change="description = $event.target.value"
        />
        <SiteThemeSelect v-model="siteTheme" />
        <cyan-toolbar>
          <cyan-toggle
            :label="t('fields.site.hidden')"
            :checked="site.hidden"
            @change="setSiteVisibility($event.detail)"
          />
        </cyan-toolbar>
      </section>

      <!-- Poster Actions -->
      <section class="toolset">
        <p
          class="TypeUI"
          style="margin:0"
        >
          {{ t('fields.site.posterurl') }}
        </p>
        <cyan-toolbar>
          <cyan-button
            text
            noun="assets"
            :label="t('action.select')"
            @click="selectPosterDialog = true"
          />
          <cyan-button
            text
            noun="delete"
            :label="t('action.delete')"
            @click="onSelectPoster('')"
          />
        </cyan-toolbar>
      </section>

      <!-- Avatar actions -->
      <section>
        <p
          class="TypeUI"
          style="margin:0"
        >
          {{ t('fields.site.avatarurl') }}
        </p>
        <cyan-toolbar>
          <cyan-button
            text
            noun="assets"
            :label="t('action.select')"
            @click="selectAvatarDialog = true"
          />
          <cyan-button
            text
            noun="delete"
            :label="t('action.delete')"
            @click="onSelectAvatar('')"
          />
        </cyan-toolbar>
      </section>

      <!-- Dialogs -->
      <SelectAssetDialog
        v-model="selectPosterDialog"
        @select="onSelectPoster($event)"
      />
      <SelectAssetDialog
        v-model="selectAvatarDialog"
        @select="onSelectAvatar($event)"
      />
    </div>
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
.toolset
  border-bottom: solid 1px var(--cyan-divider-color)
  padding-bottom: 11px
  margin-bottom: 12px
  p
    margin:0
    padding: 0
</style>