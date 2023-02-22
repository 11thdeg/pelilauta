<script lang="ts" setup>
import { CyanDialog } from '@11thdeg/cyan'
import { Ref, ref, onMounted, watch } from 'vue'
import { License } from '../../composables/useMeta'
import { logDebug } from '../../utils/logHelpers'
import NounSelect from '../ui/NounSelect.vue'

const props = defineProps<{
  license?: License
}>()
const emit = defineEmits<{
  (e: 'save', license: License): void
}>()

const dialog = ref<CyanDialog>()
const item:Ref<License|undefined> = ref(undefined)

onMounted(() => {
  watch(props, () => {
    logDebug('watch', props.license)
    item.value = props.license
    if (item.value) dialog.value?.showModal()
  })
})

function setField(field: string, value: string|number) {
  if (!item.value) return
  (item.value as unknown as Record<string,string|number>)[field] = value
}
function save() {
  if (item.value) {
    emit('save', item.value)
  }
  item.value = undefined
  dialog.value?.close()
}

function openDialog() {
  item.value = { name: '', id: '', icon: ''}
  dialog.value?.showModal()
}
function closeDialog() {
  dialog.value?.close()
}
</script>
<template>
  <cyan-toolbar>
    <cyan-spacer />
    <cyan-button
      noun="add"
      :label="$t('action.add.new')"
      text
      @click="openDialog()"
    />
  </cyan-toolbar>
  <cn-dialog
    ref="dialog"
    :title="$t('fields.meta.sitelicense.name')"
  >
    <section
      v-if="item"
      class="fieldset"
    >
      <cyan-textfield
        :label="$t('fields.meta.sitelicense.name')"
        :value="item.name || ''"
        @change="setField('name', $event.target.value)"
      />
      <cyan-textfield
        :label="$t('fields.meta.sitelicense.id')"
        :value="item.id || ''"
        @change="setField('id', $event.target.value)"
      />
      <cyan-textfield
        :label="$t('fields.meta.sitelicense.ref')"
        :value="item.ref || ''"
        @change="setField('ref', $event.target.value)"
      />
      <NounSelect
        v-model="item.icon"
        :label="$t('fields.meta.sitelicense.icon')"
      />
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          :label="$t('action.cancel')"
          text
          @click="closeDialog()"
        />
        <cyan-button
          :label="$t('action.save')"
          @click="save"
        />
      </cyan-toolbar>
    </section>
  </cn-dialog>
</template>
