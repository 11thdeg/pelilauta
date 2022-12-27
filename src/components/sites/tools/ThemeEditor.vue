<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSite } from '../../../composables/useSite'
import SiteAvatar from '../SiteAvatar.vue'
import SelectAssetDialog from '../../assets/SelectAssetDialog.vue'
import { doc, getFirestore, updateDoc } from '@firebase/firestore'
import { Site } from '@11thdeg/skaldstore'
import SiteThemeSelect from '../SiteThemeSelect.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { site, update } = useSite()

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

</script>

<template>
  <article
    v-if="site"
    class="Column ThemeEditor"
  >
    <cyan-card
      elevation="2"
      :cover="site.posterURL"
    >
      <h3 slot="title">
        {{ site.name }}
      </h3>
      <SiteAvatar
        slot="avatar"
        :site="site"
        class="siteAvatar"
        large
      />

      <section
        class="toolset fieldset"
        style="margin-top: var(--cn-page-grid)"
      >
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
    </cyan-card>
  </article>
</template>

<style lang="sass" scoped>
.toolset
  border-bottom: solid 1px var(--cyan-divider-color)
  padding-bottom: 11px
  margin-bottom: 12px
  p
    margin:0
    padding: 0
</style>