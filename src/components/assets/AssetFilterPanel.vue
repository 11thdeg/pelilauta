<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue?: string[]
  orderBy?: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'update:orderBy', value: string): void
}>()

const { t } = useI18n()

const showTags = ref(false)

const orderByFlowtimeNoun = computed(() => {
  if (props.orderBy === 'flowtime') return 'chevron-down'
  if (props.orderBy === '-flowtime') return 'chevron-up'
  return undefined
})
const orderByNameNoun = computed(() => {
  if (props.orderBy === 'name') return 'chevron-down'
  if (props.orderBy === '-name') return 'chevron-up'
  return undefined
})

function orderBy (field:string) {
  if (props.orderBy === field) emit('update:orderBy', '-'+field)
  else emit('update:orderBy', field)
}

</script>

<template>
  <section class="SiteListFilterPane">
    <cyan-toolbar>
      <cyan-button
        text
        noun="filter"
        @click="showTags = !showTags"
      />
      <cyan-spacer />
      <cyan-button
        text
        :label="t('orderBy.flowtime')"
        :noun="orderByFlowtimeNoun" 
        @click="orderBy('flowtime')"
      />
      <cyan-button
        text
        :label="t('orderBy.title')"
        :noun="orderByNameNoun"
        @click="orderBy('name')"
      />
    </cyan-toolbar>
  </section>
</template>