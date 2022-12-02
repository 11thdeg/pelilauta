<script lang="ts" setup>
import { Asset } from '@11thdeg/skaldstore'
import { computed, onMounted, ref, Ref } from 'vue'
import { useSession } from '../../composables/useSession'
import AssetEntryForm from './AssetEntryForm.vue'
import isEqual from 'lodash/isEqual'
import clone from 'lodash/clone'
import { DocumentData, getFirestore, updateDoc, doc } from '@firebase/firestore'
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

let carbonCopy:Ref<DocumentData> = ref({})

const asset = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

onMounted(() => {
  carbonCopy.value = clone(props.modelValue.docData)
})

const hasChanged = computed(() => {
  return !isEqual(carbonCopy.value, asset.value.docData)
})

function save () {
  logDebug('AssetEntryColumn', 'save', asset.value.docData)
  updateDoc(
    doc(
      getFirestore(),
      Asset.collectionName,
      asset.value.key || ''
    ),
    asset.value.docData
  )
}
</script>

<template>
  <div class="Column">
    <template v-if="asset.hasOwner(uid)">
      <h4>{{ t('asset.title') }}</h4>
      <AssetEntryForm
        v-model="asset"
      />
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          noun="save"
          :disabled="!hasChanged"
          :label="t('action.save')"
          @click="save"
        />
      </cyan-toolbar>
    </template>
    <template v-else>
      <h4>{{ asset.name }}</h4>
      <ProfileTag :uid="asset.owners[0]" />
    </template>
  </div>
</template>