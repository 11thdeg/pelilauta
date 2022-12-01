<script lang="ts" setup>
import { Ref, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../composables/useSession/useAssets'
import { useSnack } from '../../composables/useSnack'
import { FileData } from '../../utils/fileHelpers'
import FileInput from '../assets/FileInput.vue'
import LicenseSelect from '../LicenseSelect/LicenseSelect.vue'

const { t } = useI18n()
const { pushSnack } = useSnack()

const dialogOpen = ref(false)
const license = ref('0')
const file:Ref<FileData|undefined> = ref(undefined)
const fileName = ref('')
const description = ref('')
const uploading = ref(false)

watch(file, (newVal) => {
  if (newVal && !fileName.value) {
    fileName.value = newVal.name
  }
})

function openDialog() {
  license.value = '0'
  file.value = undefined
  dialogOpen.value = true
  fileName.value = ''
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
  dialogOpen.value = false
}

</script>
<template>
  <cyan-button
    :label="t('action.add.new')"
    noun="assets"
    @click.prevent="openDialog"
  />
  <teleport to="body">
    <cyan-dialog
      :title="t('action.add.new')"
      :open="dialogOpen"
      @close="dialogOpen = false"
    >
      <div class="parallerOnDesktop">
        <FileInput
          v-model:file="file"
        />
        <section
          class="fieldset"
          style="min-width: 400px;"
        >
          <cyan-textfield
            :value="fileName"
            :label="t('fields.asset.name')"
            :placeholder="fileName"
            @change="fileName = $event.target.value"
          />
          <p class="TypeCaption">
            <strong>{{ t('fields.asset.mimetype') }}</strong>
            <cyan-code v-if="file">
              {{ file.mimetype }}
            </cyan-code>
          </p>
          <cyan-textfield
            :value="description"
            :label="t('fields.asset.description')"
            @blur="description = $event.target.value"
          />
          <LicenseSelect v-model="license" />
          <cyan-toolbar>
            <cyan-spacer />
            <cyan-button
              text
              :label="t('action.cancel')"
              @click="dialogOpen = false"
            />
            <cyan-button
              :disabled="!file"
              noun="save"
              :label="t('action.upload')"
              @click="upload"
            />
          </cyan-toolbar>
        </section>
      </div>
    </cyan-dialog>
  </teleport>
</template>

<style lang="sass" scoped>
.parallerOnDesktop
  display: flex
  flex-direction: column
  justify-items: left
  gap: 13px
  @media (min-width: 768px)
    flex-direction: row
</style>