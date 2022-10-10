<script lang="ts" setup>
import { Ref, ref, watch } from 'vue'
import FileInput from './FileInput.vue'
import { FileData } from '../../utils/fileHelpers'
import { useSnack } from '../../composables/useSnack'
import { useI18n } from 'vue-i18n'
import Dialog from '../ui/Dialog.vue'
import { useAssets } from '../../composables/useSession/useAssets'
    
const { t } = useI18n()
const { pushSnack } = useSnack()

const dialog = ref(false)
const uploading = ref(false)

const fileName = ref('')
const description = ref('')
const license = ref('0')
const licenses = [
  { label: t('fields.asset.licenses.0'), option: '0' },
  { label: t('fields.asset.licenses.1'), option: '1' },
  { label: t('fields.asset.licenses.2'), option: '2' },
  { label: t('fields.asset.licenses.3'), option: '3' },
]
    
const file:Ref<FileData|undefined> = ref(undefined)

watch(file, (newVal) => {
  if (newVal) {
    fileName.value = newVal.name
  }
})

function open () {
  file.value = undefined
  fileName.value = ''
  description.value = ''
  license.value = '0'
  dialog.value = true
}

async function upload () {
  uploading.value = true
  const { uploadAsset } = useAssets()
  if (file.value) {
    uploading.value = true
    await uploadAsset(
      fileName.value || file.value.name,
      file.value.mimetype,
      file.value.dataURL,
      description.value,
      parseInt(license.value)
    )
    pushSnack('Asset uploaded')
  }
  uploading.value = false
  dialog.value = false
}

</script>
    
<template>
  <cyan-button
    :label="t('action.add.new')"
    noun="add"
    @click.prevent="open"
  />
  <Dialog
    v-model="dialog"
    :label="t('assets.add.title')"
  >
    <div class="fileDataForm">
      <FileInput v-model:file="file" />
      <div class="fields">
        <cyan-textfield
          :value="fileName"
          :label="t('fields.asset.name')"
          :placeholder="fileName"
          @change="fileName = $event.target.value"
        />
        <div>
          <strong>{{ t('fields.asset.mimetype') }}</strong> <cyan-code v-if="file">
            {{ file.mimetype }}
          </cyan-code>
        </div>
        <cyan-textfield
          :value="description"
          :label="t('fields.asset.description')"
          @blur="description = $event.target.value"
        />
        <cyan-select
          :value="license"
          :label="t('fields.asset.license')"
          :options="licenses"
          @change="license = $event.target.value"
        />
      </div>
    </div>
    <div class="actions">
      <cyan-button
        text
        :label="t('action.cancel')"
        @click="dialog = false"
      />
      <cyan-button
        noun="save"
        :working="uploading + ''"
        :label="t('action.upload')"
        @click="upload"
      />
    </div>
  </Dialog>
</template>
    
    <style lang="sass" scoped>
    .fileDataForm
      display: flex
      gap: 12px
      .fields
        flex-grow: 1
        display: flex
        gap: 12px
        flex-direction: column
    .actions
      width: 100%
      display: flex
      gap: 12px
      justify-content: flex-end
      margin-top: 12px
        
    </style>