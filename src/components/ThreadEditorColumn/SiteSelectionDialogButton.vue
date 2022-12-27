<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { computed, onMounted, Ref, watch } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScreenSize } from '../../composables/useScreenSize'
import { fetchSite, useSites } from '../../composables/useSites'

const props = defineProps<{
  modelValue: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { t } = useI18n()
const { sitesAsOptions } = useSites()
const { isSmall } = useScreenSize()

const siteEntry:Ref<Site|undefined> = ref(undefined)

onMounted(async () => {
  watch(props, async (newProps) => {
    siteEntry.value = await fetchSite(newProps.modelValue)
  }, { immediate: true })
})

const dialogOpen = ref(false)

const selected = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emits('update:modelValue', value)
  }
})

const label = computed(() => {
  if (siteEntry.value) {
    if (isSmall.value) {
      return siteEntry.value.systemBadge
    }
    return siteEntry.value.name
  }
  if (isSmall.value) {
    return undefined
  }
  return t('action.link.site')
})

const noun = computed(() => {
  if (siteEntry.value) {
    return siteEntry.value.systemBadge
  }
  return 'mekanismi'
})
</script>

<template>
  <cyan-button
    text
    :label="label"
    :noun="noun"
    @click.prevent="(dialogOpen = true)"
  />
  <teleport to="body">
    <cyan-dialog
      :title="t('action.link.site')"
      :open="dialogOpen"
      @close="dialogOpen = false"
    >
      <cyan-select
        :value="selected"
        :options="sitesAsOptions"
        @change="selected = $event.target.value"
      />
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          :label="t('action.continue')"
          @click.prevent="dialogOpen = false"
        />
      </cyan-toolbar>
    </cyan-dialog>
  </teleport>
</template>