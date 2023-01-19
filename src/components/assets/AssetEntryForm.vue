<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { entryOwnersAsArray } from '../../utils/entryOwnersAsArray'
import { parseAssetName } from '../../utils/assetHelpers'
import ProfileLink from '../profileLink/ProfileLink.vue'
import LicenseSelect from '../LicenseSelect/LicenseSelect.vue'

type Asset = {
  key?: string
  name: string
  mimetype?: string
  url?: string
  storagePath?: string
  owners: string|string[]
  description?: string,
  license: string
}

const props = defineProps<{
  modelValue: Asset
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Asset): void
}>()

const { t } = useI18n()

const asset = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <section class="AssetEntryForm fieldset">
    <cyan-textfield
      :value="asset.name"
      :label="t('fields.asset.name')"
      :placeholder="parseAssetName(asset)"
      @change="asset.name = $event.target.value"
    />
    <p
      class="TypeCaption"
      style="margin: 0"
    >
      {{ t('fields.asset.owners') }}:
      <ProfileLink
        v-for="owner in entryOwnersAsArray(asset)"
        :key="owner"
        :uid="owner"
      />
      <br>
      {{ t('fields.asset.mimetype') }}: {{ asset.mimetype }}
    </p>
    <cyan-textfield
      :value="asset.description"
      :label="t('fields.asset.description')"
      @blur="asset.description = $event.target.value"
    />
    <LicenseSelect
      v-model="asset.license"
    />
  </section>
</template>