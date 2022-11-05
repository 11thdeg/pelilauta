<script lang="ts" setup>
import FilterChip from '../ui/FilterChip.vue'
import { useMeta } from '../../composables/useMeta'
import { logDebug } from '../../utils/logHelpers'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { orderBy } from 'lodash'


const { siteThemes } = useMeta()
const { t } = useI18n()

const props = defineProps<{
  modelValue?: string[]
  orderBy?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'update:orderBy', value: string): void
}>()

// const state = computed(() => props.modelValue || [] )

const showTags = ref(false)
const orderByNameNoun = computed(() => {
  if (props.orderBy === 'name') return 'chevron-down'
  if (props.orderBy === '-name') return 'chevron-up'
  return ''
})
const orderByFlowtimeNoun = computed(() => {
  if (props.orderBy === 'flowtime') return 'chevron-down'
  if (props.orderBy === '-flowtime') return 'chevron-up'
  return ''
})

function onClick (id:string) {
  logDebug('onclick', id)
  const arr = props.modelValue || []
  if (arr.includes('family:'+id)) arr.splice(arr.indexOf('family:'+id), 1)
  else arr.push('family:'+id)
  emit('update:modelValue', arr)
}

function toggleOwn () {
  const arr = props.modelValue || []
  if (arr.includes('visibility:own')) arr.splice(arr.indexOf('visibility:own'), 1)
  else arr.push('visibility:own')
  emit('update:modelValue', arr)
}

function togglePlayer () {
  const arr = props.modelValue || []
  if (arr.includes('visibility:player')) arr.splice(arr.indexOf('visibility:player'), 1)
  else arr.push('visibility:player')
  emit('update:modelValue', arr)
}

function isActiveFamily (id:string) {
  return props.modelValue?.includes('family:'+id) ?? false
}

function orderBy(field: string) {
  logDebug('order by', field, props.orderBy)
  if (props.orderBy === field) emit('update:orderBy', '-'+field)
  else emit('update:orderBy', field)
}

</script>

<template>
  <div class="SiteListFilterPane">
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
    <section
      v-if="showTags"
      class="card tags"
    >
      <FilterChip
        :label="t('sites.ownedByMe')"
        :value="props.modelValue && props.modelValue.includes('visibility:own')"
        @click="toggleOwn()"
      />
      <FilterChip
        :label="t('sites.playsIn')"
        :value="props.modelValue && props.modelValue.includes('visibility:player')"
        @click="togglePlayer()"
      />
      <FilterChip
        v-for="theme in siteThemes"
        :key="theme.id"
        :label="theme.name"
        :value="isActiveFamily(theme.id)"
        @click="onClick(theme.id)"
      />
    </section>
  </div>
</template>

<style lang="sass" scoped>
.tags
  margin-bottom: 12px
  border: solid 1px var(--chroma-primary-d)
  padding-bottom: 0
</style>
