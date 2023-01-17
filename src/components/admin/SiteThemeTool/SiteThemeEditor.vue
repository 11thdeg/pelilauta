<script lang="ts" setup>
import { Ref, ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { SiteFamily } from '../../../composables/useMeta'
import { logDebug } from '../../../utils/logHelpers'
import Dialog from '../../ui/Dialog.vue'
import NounSelect from '../../ui/NounSelect.vue'

const props = defineProps<{
  theme?: SiteFamily
}>()
const emit = defineEmits<{
  (e: 'save', theme: SiteFamily): void
}>()

const { t } = useI18n()

const item:Ref<SiteFamily|undefined> = ref(undefined)
const open = computed({
  get: () => !!item.value,
  set: (value) => {
    if (!value) item.value = undefined
  }
})

onMounted(() => {
  watch(props, () => {
    logDebug('watch', props.theme)
    item.value = props.theme
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
    :label="t('fields.meta.sitetheme.title')"
  >
    <template v-if="item">
      <cyan-textfield
        :label="t('fields.meta.sitetheme.name')"
        :value="item.name || ''"
        @change="setField('name', $event.target.value)"
      />
      <cyan-textfield
        :label="t('fields.meta.sitetheme.id')"
        :value="item.id || ''"
        @change="setField('id', $event.target.value)"
      />
      <NounSelect
        v-model="item.icon"
        :label="t('fields.meta.sitetheme.icon')"
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
    </template>
  </Dialog>
</template>