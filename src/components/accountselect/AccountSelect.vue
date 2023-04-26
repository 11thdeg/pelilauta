<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useProfiles } from '../../composables/useProfiles'

const props = defineProps<{
  noun?: string
  exclude?: string[]
}>()
const emits = defineEmits<{
    (e: 'addAccount', account: string): void
}>()

const { cachedAsOptions, fetchAll } = useProfiles()

const suspend = ref(true)

onMounted(async () => {
  await fetchAll()
  suspend.value = false
})

const selected = ref('')

const icon = computed(() => {
  return props.noun || 'adventurer'
})

const options = computed(() => {
  return cachedAsOptions.value.filter((i) => {
    if (props.exclude) return !props.exclude.includes(i.value)
    return true
  })
})

</script>

<template>
  <cyan-toolbar
    v-if="!suspend"
    class="AccountSelect"
  >
    <cyan-icon :noun="icon" />
    <cyan-select
      v-if="!suspend"
      style="flex-grow: 1;"
      :options="options"
      @change="selected = $event.target.value"
    />
    <cyan-button
      text
      noun="add"
      @click="emits('addAccount', selected)"
    />
  </cyan-toolbar>
</template>