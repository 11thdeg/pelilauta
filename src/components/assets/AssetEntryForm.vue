<script lang="ts" setup>
import { Asset } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../composables/useSession/useAssets'

const props = defineProps<{
  modelValue: Asset
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Asset): void
}>()

const { t } = useI18n()
const { licenses } = useAssets()

const asset = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="AssetEntryForm">
    <cyan-textfield
      :value="asset.name"
      :label="t('fields.asset.name')"
      :placeholder="t('fields.asset.placeholder.name')"
      @change="asset.name = $event.target.value"
    />
    <div>
      <strong>{{ t('fields.asset.mimetype') }}</strong> <cyan-code>
        {{ asset.mimetype }}
      </cyan-code>
    </div>
    <cyan-textfield
      :value="asset.description"
      :label="t('fields.asset.description')"
      @blur="asset.description = $event.target.value"
    />
    <cyan-select
      :value="asset.license"
      :label="t('fields.asset.license')"
      :options="licenses"
      @change="asset.license = $event.target.value"
    />
  </div>
</template>