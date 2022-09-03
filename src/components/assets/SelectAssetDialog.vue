<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../composables/useAssets'
import { useSession } from '../../composables/useSession'
import Dialog from '../ui/Dialog.vue'

const props= defineProps<{
  modelValue: boolean
}>()
    
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void,
  (e: 'select', asset: string): void
}>()

const selected = ref('')
const { t } = useI18n()
const { assets } = useAssets()
const { account, profile } = useSession() 

const open = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function selectionChange(e: CustomEvent) {
  if (e.detail?.url) selected.value = e.detail.url
}

function selectAsset() {
  emit('select', selected.value)
  open.value = false
}
</script>

<template>
  <Dialog
    v-model="open"
    :label="t('action.selectImage')"
  >
    <cyan-asset-select @change="selectionChange($event)">
      <cyan-asset-option
        round
        :url="profile.avatarURL"
        :name="t('settings.profile.useCurrentImage')"
      />
      <cyan-asset-option
        round
        :url="account.photoURL"
        :name="t('settings.profile.useSSOImage')"
      />
      <cyan-asset-option
        v-for="asset in assets"
        :key="asset.storagePath"
        round
        :url="asset.url"
        :name="asset.name || '...'"
      />
    </cyan-asset-select>
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        :label="t('action.cancel')"
        text
        @click="open = false"
      />
      <cyan-button
        :label="t('action.select')"
        @click="selectAsset"
      />
    </cyan-toolbar>
  </Dialog>
</template>
