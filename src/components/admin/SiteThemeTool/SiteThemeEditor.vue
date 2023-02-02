<script lang="ts" setup>
import { CyanDialog } from '@11thdeg/cyan'
import { Ref, ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { SiteFamily, useMeta } from '../../../composables/useMeta'
import { logDebug } from '../../../utils/logHelpers'
import NounSelect from '../../ui/NounSelect.vue'

const props = defineProps<{
  theme?: SiteFamily
}>()

const { t } = useI18n()
const { siteThemes, update } = useMeta()

const dialog = ref<CyanDialog>()

const item:Ref<SiteFamily|undefined> = ref(undefined)

onMounted(() => {
  watch(props, () => {
    item.value = props.theme
    if (item.value) dialog.value?.showModal()
  })
})

function openDialog() {
  item.value = { name: '', id: '', icon: ''}
  dialog.value?.showModal()
}
function closeDialog() {
  dialog.value?.close()
}

function setField(field: string, value: string|number) {
  if (!item.value) return
  (item.value as unknown as Record<string,string|number>)[field] = value
}

async function save() {
  const theme = item.value
  if (!theme) return
  logDebug('Saving', theme)
  const arr = Array.from(siteThemes.value)
  if(!arr.find(a => a.id === theme.id)) {
    const th:SiteFamily = {
      name: theme.name || '-',
      id: theme.id || '-',
      icon: theme.icon || 'fox'
    }
    arr.push(th)
  }
  await update('sitethemes', arr)
  item.value = undefined
  closeDialog()
}


</script>
<template>
  <cyan-toolbar>
    <cyan-spacer />
    <cyan-button
      noun="add"
      :label="t('action.add.new')"
      text
      @click.prevent="openDialog"
    />
  </cyan-toolbar>
  <cn-dialog
    ref="dialog"
    :title="t('fields.meta.sitetheme.name')"
  >
    <section
      v-if="item"
      class="fieldset"
    >
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
          @click="closeDialog"
        />
        <cyan-button
          :label="t('action.save')"
          @click="save"
        />
      </cyan-toolbar>
    </section>
  </cn-dialog>
</template>