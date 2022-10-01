<script lang="ts" setup>
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Dialog from '../ui/Dialog.vue'
import nounsFile from '../../nouns.json'
import { StreamData } from '../../composables/useMeta';

const nouns = nounsFile as Record<string, string>

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

const item:Ref<StreamData|undefined> = ref(props.topic)
const open = computed({
  get: () => !!item.value,
  set: (value) => {
    if (!value) item.value = undefined
  }
})

const { t } = useI18n()

onMounted(() => {
  watch(props, () => {
    item.value = props.topic
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
}
</script>
<template>
  <cyan-button
    noun="add"
    :label="t('actions.add.new')"
    text
    @click="item = { name: '', icon: '', slug: '', description: '', count: 0, order: -1 }"
  />
  <Dialog
    v-model="open"
    :label="t('fields.meta.topic.title')"
  >
    <template v-if="item">
      <cyan-textfield
        :label="t('fields.meta.topic.name')"
        :value="item.name"
        @change="setField('name', $event.detail)"
      />
      {{ t('fields.meta.topic.slug') }}: {{ item.slug || item.name.toLowerCase() }}
      <cyan-textfield
        :label="t('fields.meta.topic.description')"
        :value="item.description"
        @change="setField('desciption', $event.detail)"
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