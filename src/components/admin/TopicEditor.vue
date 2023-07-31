<script lang="ts" setup>
import { onMounted, Ref, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import nounsFile from '../../nouns.json'
import { StreamData } from '../../composables/useMeta'
import { CyanDialog } from '@11thdeg/cyan'

const props = defineProps<{
  topic?: StreamData
}>()
const emit = defineEmits<{
  (e: 'save', topic: {
    name: string
    icon: string
    slug: string
    description: string,
    order: number
  }): void
}>()

const nouns = nounsFile as Record<string, string>
const dialog = ref<CyanDialog>()

// eslint-disable-next-line vue/no-setup-props-destructure
const item:Ref<StreamData|undefined> = ref(props.topic)

const { t } = useI18n()

onMounted(() => {
  watch(props, () => {
    item.value = props.topic
    if (item.value) dialog.value?.showModal()
  })
})

function setField(field: string, value: string|number) {
  if (!item.value) return
  (item.value as unknown as Record<string,string|number>)[field] = value
}

const nounOptions = Object.keys(nouns).map(key => ({ value:key, label: key }))

function save () {
  if (item.value) {
    if (!item.value.slug) item.value.slug = item.value.name.toLowerCase()
    emit('save', item.value as {
      name: string
      icon: string
      slug: string
      description: string,
      order: number
    })
  }
  item.value = undefined
  closeDialog()
}

function openDialog() {
  item.value = { name: '', icon: '', slug: '', description: '', count: 0, order: -1 }
  dialog.value?.showModal()
}
function closeDialog() {
  dialog.value?.close()
}
</script>
<template>
  <cyan-button
    noun="add"
    :label="t('action.add.new')"
    text
    @click="openDialog"
  />
  <cn-dialog
    ref="dialog"
    :title="t('fields.meta.topic.title')"
  >
    <section
      v-if="item"
      class="fieldset"
    >
      <cyan-textfield
        :label="t('fields.meta.topic.name')"
        :value="item.name"
        @change="item && (item.name = $event.target.value)"
      />
      {{ t('fields.meta.topic.slug') }}: {{ item.slug || item.name.toLowerCase() }}
      <cyan-textfield
        :label="t('fields.meta.topic.description')"
        :value="item.description"
        @change="setField('desciption', $event.target.value)"
      />
      <div style="display:flex; gap: 12px">
        <cyan-icon :noun="item.icon" />
        <cyan-select
          :label="t('fields.meta.topic.icon')"
          style="flex-grow: 1"
          :options="nounOptions"
          :value="item.icon"
          @change="setField('icon', $event.target.value)"
        />
      </div>
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