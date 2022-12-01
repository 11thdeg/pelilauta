<script lang="ts" setup>
import { Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { FileData } from '../../utils/fileHelpers'
import FileInput from '../assets/FileInput.vue'
import LicenseSelect from '../LicenseSelect/LicenseSelect.vue'

const { t } = useI18n()

const dialogOpen = ref(false)
const license = ref('0')
const file:Ref<FileData|undefined> = ref(undefined)
const fileName = ref('')
const description = ref('')

function openDialog() {
  license.value = '0'
  file.value = undefined
  dialogOpen.value = true
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
      <FileInput
        v-model:file="file"
        style="float: left"
      />
      <section style="margin-left: 136px; min-width: 400px;">
        <cyan-textfield
          :value="fileName"
          :label="t('fields.asset.name')"
          :placeholder="fileName"
          @change="fileName = $event.target.value"
        />
        <div>
          <strong>{{ t('fields.asset.mimetype') }}</strong>
          <cyan-code v-if="file">
            {{ file.mimetype }}
          </cyan-code>
        </div>
        <cyan-textfield
          :value="description"
          :label="t('fields.asset.description')"
          @blur="description = $event.target.value"
        />
        <LicenseSelect v-model="license" />
      </section>
    </cyan-dialog>
  </teleport>
</template>