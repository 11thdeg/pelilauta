<script lang="ts" setup>
import { Ref, ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { License } from '../../composables/useMeta'
import { logDebug } from '../../utils/logHelpers'
import Dialog from '../ui/Dialog.vue'
import NounSelect from '../ui/NounSelect.vue'

const props = defineProps<{
  license?: License
}>()
const emit = defineEmits<{
  (e: 'save', license: License): void
}>()

const { t } = useI18n()

const item:Ref<License|undefined> = ref(undefined)
const open = computed({
  get: () => !!item.value,
  set: (value) => {
    if (!value) item.value = undefined
  }
})

onMounted(() => {
  watch(props, () => {
    logDebug('watch', props.license)
    item.value = props.license
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
}
</script>
<template>
  <cyan-toolbar>
    <cyan-spacer />
    <cyan-button
      noun="add"
      :label="t('action.add.new')"
      text
      @click="item = { name: '', id: '', icon: ''}"
    />
  </cyan-toolbar>
  <Dialog
    v-model="open"
    :label="t('fields.meta.sitelicense.name')"
  >
    <section
      v-if="item"
      class="fieldset"
    >
      <cyan-textfield
        :label="t('fields.meta.sitelicense.name')"
        :value="item.name || ''"
        @change="setField('name', $event.target.value)"
      />
      <cyan-textfield
        :label="t('fields.meta.sitelicense.id')"
        :value="item.id || ''"
        @change="setField('id', $event.target.value)"
      />
      <cyan-textfield
        :label="t('fields.meta.sitelicense.ref')"
        :value="item.ref || ''"
        @change="setField('ref', $event.target.value)"
      />
      <NounSelect
        v-model="item.icon"
        :label="t('fields.meta.sitelicense.icon')"
      />
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          :label="t('action.cancel')"
          text
          @click="open = false"
        />
        <cyan-button
          :label="t('action.save')"
          @click="save"
        />
      </cyan-toolbar>
    </section>
  </Dialog>
</template>
