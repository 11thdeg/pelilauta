<script lang="ts" setup>
import FilterChip from "../ui/FilterChip.vue"
import { useMeta } from "../../composables/useMeta"
import { logDebug } from "../../utils/logHelpers"
import { useI18n } from "vue-i18n"


const { siteFamilies } = useMeta()
const { t } = useI18n()

const props = defineProps<{
  modelValue?: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

// const state = computed(() => props.modelValue || [] )

function onClick (id:string) {
  logDebug("onclick", id)
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

</script>

<template>
  <div class="SiteListFilterPane">
    <cyan-icon
      noun="filter"
      small
    />
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
      v-for="theme in siteFamilies"
      :key="theme.id"
      :label="theme.name"
      :value="isActiveFamily(theme.id)"
      @click="onClick(theme.id)"
    />
  </div>
</template>