<script lang="ts" setup>
import { Ref, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { SiteFamily } from '../../composables/useMeta'
import Dialog from '../ui/Dialog.vue'
import NounSelect from '../ui/NounSelect.vue'

const props = defineProps<{
  siteTheme?: SiteFamily
}>()
const emit = defineEmits<{
  (e: 'save', theme: SiteFamily): void
}>()

const { t } = useI18n()

const item:Ref<SiteFamily|undefined> = ref(props.siteTheme)
const open = computed({
  get: () => !!item.value,
  set: (value) => {
    if (!value) item.value = undefined
  }
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
      :label="t('actions.add.new')"
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
        @change="setField('name', $event.detail)"
      />
      <cyan-textfield
        :label="t('fields.meta.sitetheme.id')"
        :value="item.id || ''"
        @change="setField('id', $event.detail)"
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