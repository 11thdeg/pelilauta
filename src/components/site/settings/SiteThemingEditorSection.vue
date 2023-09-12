<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import InsertAssetButton from '../../InsertAssetButton/InsertAssetButton.vue'
import { updateStorable } from '../../../utils/firestoreHelpers'
import { useSite } from '../../../composables/useSite'
import { useAssets } from '../../../composables/useAssets'

const { t } = useI18n()
const { site } = useSite()
const { fetchAsset } = useAssets()

function onSelectPoster (e: string) {
  updateStorable(site.value, {
    posterURL: e
  })
}

function onSelectAvatar (e: string) {
  updateStorable(site.value, {
    avatarURL: e
  })
}
function onSelectBackground (e: string) {
  updateStorable(site.value, {
    backgroundURL: e
  })
}

async function onInsertPosterAsset (key: string) {
  const asset = await fetchAsset(key)
  if (asset && asset.url) {
    await onSelectPoster(asset.url)
  }
}
async function onInsertAvatarAsset (key: string) {
  const asset = await fetchAsset(key)
  if (asset && asset.url) {
    await onSelectAvatar(asset.url)
  }
}
async function onInsertBackgroundAsset (key: string) {
  const asset = await fetchAsset(key)
  if (asset && asset.url) {
    await onSelectBackground(asset.url)
  }
}

</script>

<template>
  <section>
    <fieldset>
      <legend>{{ $t('site.tools.settings.theming') }}</legend>
      <p
        class="TypeUI m-0"
      >
        {{ t('fields.site.posterurl') }}
      </p>
      <cyan-toolbar>
        <InsertAssetButton
          :label="t('action.change')"
          @insert="onInsertPosterAsset"
        />
        <cyan-button
          text
          noun="delete"
          :label="t('action.delete')"
          @click="onSelectPoster('')"
        />
      </cyan-toolbar>
      <p
        class="TypeUI"
        style="margin:0"
      >
        {{ t('fields.site.avatarurl') }}
      </p>
      <cyan-toolbar>
        <InsertAssetButton
          :label="t('action.change')"
          @insert="onInsertAvatarAsset"
        />
        <cyan-button
          text
          noun="delete"
          :label="t('action.delete')"
          @click="onSelectAvatar('')"
        />
      </cyan-toolbar>
      <p
        class="TypeUI m-0"
      >
        {{ t('fields.site.backgroundurl') }}
      </p>

      <img
        v-if="site.backgroundURL"
        class="poster"
        :src="site.backgroundURL"
        alt=""
      >

      <cyan-toolbar>
        <InsertAssetButton
          :label="t('action.change')"
          @insert="onInsertBackgroundAsset"
        />
        <cyan-button
          text
          noun="delete"
          :label="t('action.delete')"
          @click="onSelectBackground('')"
        />
      </cyan-toolbar>
    </fieldset>
  </section>
</template>
