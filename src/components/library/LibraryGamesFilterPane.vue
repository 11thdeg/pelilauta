<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useMeta } from '../../composables/useMeta'
import { logDebug } from '../../utils/logHelpers'

const props = defineProps<{
  modelValue?: string[]
  orderBy?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'update:orderBy', value: string): void
}>()

const { siteThemes } = useMeta()

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

function onTagClick (id:string) {
  logDebug('onclick', id)
  const arr = props.modelValue || []
  if (arr.includes('family:'+id)) arr.splice(arr.indexOf('family:'+id), 1)
  else arr.push('family:'+id)
  emit('update:modelValue', arr)
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
        :label="$t('orderBy.flowtime')"
        :noun="orderByFlowtimeNoun" 
        @click="orderBy('flowtime')"
      />
      <cyan-button
        text
        :label="$t('orderBy.title')"
        :noun="orderByNameNoun"
        @click="orderBy('name')"
      />
    </cyan-toolbar>
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__flipInX"
      leave-active-class="animate__animated animate__fadeOut"
      :duration="220"
    >
      <cyan-card
        v-if="showTags"
        elevation="1"
        class="tags"
        style="margin-bottom: var(--cn-gap-column)"
      >
        <section
          class="flex"
          style="gap: 8px"
        >
          <cn-chip
            v-for="theme in siteThemes"
            :key="theme.id"
            filter
            @change="onTagClick(theme.id)"
          >
            {{ theme.name }}
          </cn-chip>
        </section>
      </cyan-card>
    </transition>
  </div>
</template>