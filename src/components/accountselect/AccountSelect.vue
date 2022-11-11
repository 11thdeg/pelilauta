<script lang="ts" setup>
import { Profile } from '@11thdeg/skaldstore'
import { onMounted, ref, computed } from 'vue'
import { useProfiles } from '../../composables/useProfiles'

const props = defineProps<{
  noun?: string
  exclude?: string[]
}>()
const emits = defineEmits<{
    (e: 'addAccount', account: string): void
}>()

const { cached, fetchAll } = useProfiles()

const options = computed(() => {
  const all:Record<string, string>[] = Array.from(cached.value.values()).map((e:Profile) => {
    return {
      value: e.key || '',
      label: e.nick
    }
  })
  if (!props.exclude) return all
  return all.filter((e:Record<string, string>) => !props.exclude?.includes(e.value))
})


onMounted(async () => {
  await fetchAll()
})

const selected = ref('')

const icon = computed(() => {
  return props.noun || 'adventurer'
})

</script>

<template>
  <cyan-toolbar class="AccountSelect">
    <cyan-icon :noun="icon" />
    <cyan-select
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