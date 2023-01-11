<script lang="ts" setup>
import { doc, getFirestore, updateDoc } from '@firebase/firestore'
import { Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { License, useMeta } from '../../composables/useMeta'
import { logDebug } from '../../utils/logHelpers'
import SiteLicenseEditor from './SiteLicenseEditor.vue'

const { t } = useI18n()
const { siteLicenses } = useMeta()

const activeLicense:Ref<License|undefined> = ref(undefined)

function update(licences: License[]) {
  logDebug('updating meta.siteLicenses', licences)
  updateDoc(doc(getFirestore(), 'meta', 'pelilauta'), {
    siteLicenses: licences
  })
}

function save(lic:License) {
  logDebug('save', lic)
  const arr = Array.from(siteLicenses.value)
  if(!arr.find(a => a.id === lic.id)) {
    const th:License = {
      name: lic.name || '-',
      id: lic.id || '-',
      ref: lic.ref || '-',
      icon: lic.icon || 'license'
    }
    arr.push(th)
  }
  update(arr)
}

function deleteTheme (index: number) {
  const arr = Array.from(siteLicenses.value)
  arr.splice(index, 1)
  update(arr)
}

function moveUp(index: number) {
  if(index > 0) {
    const arr = Array.from(siteLicenses.value)
    const temp = arr[index]
    arr[index] = arr[index - 1]
    arr[index - 1] = temp
    update(arr)
  }
}

</script>

<template>
  <article class="SiteLicenseTool Column">
    <cyan-card elevation="1">
      <h3 slot="title">
        {{ t('admin.licensetool.title') }}
      </h3>
      <p class="TypeBody2 lowEmphasis">
        {{ t('admin.licensetool.info') }}
      </p>
      <div class="systemTable">
        <template
          v-for="license, index in siteLicenses"
          :key="license.id"
        >
          <cyan-icon
            :noun="license.icon"
            small
          />
          <p class="TypeBody2">
            {{ license.name }}
          </p>
          <cyan-button
            noun="chevron-up"
            text
            :disabled="index === 0"
            @click="moveUp(index)"
          />
          <cyan-button
            noun="edit"
            text
            @click="activeLicense = license"
          />
          <cyan-button
            noun="delete"
            text
            @click="deleteTheme(index)"
          />
        </template>
      </div>
      <SiteLicenseEditor
        :license="activeLicense"
        @save="save($event)"
      />
    </cyan-card>
  </article>
</template>

<style lang="sass" scoped>
.systemTable
  display: grid
  grid-template-columns: 32px auto 32px 32px 32px
  row-gap: 4px
  align-items: center
  .cyan-icon
    width: 48px
    height: 48px
    display: block
</style>