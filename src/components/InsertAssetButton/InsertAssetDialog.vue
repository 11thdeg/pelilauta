<script lang="ts" setup>
import { ref } from 'vue'
import { CyanTabs } from '@11thdeg/cyan'
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../composables/useSession/useAssets'
import AssetEntryForm from '../assets/AssetEntryForm.vue'
import { Asset } from '@11thdeg/skaldstore'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const close = () => {
  emit('update:modelValue', false)
}

const { t } = useI18n()
const { assets } = useAssets()

const tabs = [
  ['upload', t('insertAssetDialog.upload')],
  ['select', t('insertAssetDialog.select')]
]

const mode = ref('select')
const asset = ref(new Asset())

function selectTab(e: Event) {
  const tab = (e.target as CyanTabs).active
  console.log(tab)
  mode.value = tab
}

function selectionChange(e: CustomEvent) {
  console.log(e)
}

</script>

<template>
  <teleport to="body">
    <cyan-dialog
      title="select or upload asset"
      :open="modelValue"
      @close="close"
    >
      <cn-tabs
        :tabs="tabs"
        :active="mode"
        @change="selectTab"
      />
      <cyan-asset-select
        v-if="mode === 'select'"
        @change="selectionChange($event)"
      >
        <cyan-asset-option
          v-for="asset in assets"
          :key="asset.storagePath"
          round
          :url="asset.url"
          :name="asset.name || '...'"
        />
      </cyan-asset-select>
      <AssetEntryForm
        v-if="mode === 'upload'"
        v-model="asset"
      />
    </cyan-dialog>
  </teleport>
</template>