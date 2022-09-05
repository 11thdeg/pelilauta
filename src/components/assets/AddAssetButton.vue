<script lang="ts" setup>
import { Ref, ref, watch } from 'vue'
import FileInput from './FileInput.vue'
import { FileData } from '../../utils/fileHelpers'
import { useSnack } from '../../composables/useSnack'
import { useI18n } from 'vue-i18n'
import Dialog from '../ui/Dialog.vue'
import { useAssets } from '../../composables/useAssets'
    
const { t } = useI18n()
const { pushSnack } = useSnack()

const dialog = ref(false)
const uploading = ref(false)

const fileName = ref('')
const description = ref('')
const license = ref('0')
const licenses = {
  '0': 'None',
  '1': 'CC-BY',
}
    
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
        file.value.name,
        file.value.mimetype,
        file.value.dataURL
    )
    pushSnack('Asset uploaded')
    }
    uploading.value = false
    dialog.value = false
}

</script>
    
<template>
  <cyan-button
    :label="t('action.add')"
    noun="assets"
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
          v-model="fileName"
          :label="t('field.asset.name')"
          :placeholder="fileName"
        />
        <div>
          <strong>{{ t('field.asset.mimetype') }}</strong> <cyan-code v-if="file">{{ file.mimetype }}</cyan-code>
        </div>
        <cyan-textfield
          :value="description"
          :label="t('fields.asset.description')"
          @blur="description = $event.target.value"
        />
        <select
          v-model="license"
          label="License"
          :options="licenses"
        />
      </div>
    </div>
    <div class="actions">
      <cyan-button
        text
        @click="dialog = false"
        :label="t('action.cancel')"
      />
      <cyan-button
        noun="save"
        :working="uploading + ''"
        @click="upload"
        :label="t('action.upload')"
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