<script lang="ts" setup>
import { Asset } from '@11thdeg/skaldstore'
import { computed, onMounted } from 'vue'
import { useSession } from '../../composables/useSession'
import AssetEntryForm from './AssetEntryForm.vue'
import isEqual from 'lodash/isEqual'
import { DocumentData } from '@firebase/firestore'
import { useI18n } from 'vue-i18n'
import { logDebug } from '../../utils/logHelpers'
import ProfileTag from '../profiles/ProfileTag.vue'

const props = defineProps<{
  modelValue: Asset;
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: Asset): void;
}>()

const { t } = useI18n()
const { uid } = useSession()

let carbonCopy:DocumentData = {}

const asset = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

onMounted(() => {
  carbonCopy = props.modelValue.docData
})

const hasChanged = computed(() => {
  const eq = isEqual(carbonCopy, asset.value.docData)
  logDebug('AssetEntryColumn.hasChanged', eq, carbonCopy, asset.value.docData)
  return eq
})

function save () {
  logDebug('AssetEntryColumn', 'save', asset.value.docData)
}
</script>

<template>
  <div class="Column">
    <template v-if="asset.hasOwner(uid)">
      <AssetEntryForm
        v-model="asset"
      />
      <cyan-button
        :disabled="!hasChanged + ''"
        :label="t('action.save')"
        @click="save"
      />
    </template>
    <template v-else>
      <h4>{{ asset.name }}</h4>
      <ProfileTag :uid="asset.owners[0]" />
    </template>
  </div>
</template>