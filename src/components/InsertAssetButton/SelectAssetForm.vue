<script lang="ts" setup>
import { CyanAssetSelect } from '@11thdeg/cyan'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../composables/useSession/useAssets'
import { parseAssetName } from '../../utils/parseAssetName'

const { t } = useI18n()
const { assets } = useAssets()
const selected = ref('')

const emit = defineEmits<{
  (e: 'change', value: string): void
  (e: 'cancel'): void
}>()

function selectionChange(e: CustomEvent) {
  selected.value = (e.target as CyanAssetSelect).selected
}

function select () {
  emit('change', selected.value)
}

function cancel () {
  emit('cancel')
}

</script>
<template>
  <form class="SelectAssetForm">
    <cn-asset-select @change="selectionChange($event)">
      <cn-asset-option
        v-for="asset in assets"
        :key="asset.storagePath"
        :preview="asset.url"
        :value="asset.key"
      >
        {{ parseAssetName(asset) }}
      </cn-asset-option>
    </cn-asset-select>
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        text
        :label="t('action.cancel')"
        @click="cancel"
      />
      <cyan-button
        :label="t('action.select')"
        @click="select"
      />
    </cyan-toolbar>
  </form>
</template>