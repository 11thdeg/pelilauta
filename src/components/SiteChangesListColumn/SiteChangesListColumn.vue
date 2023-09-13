<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePages } from '../../composables/usePages'
import PageChangeListItem from './PageChangeListItem.vue'

const { t } = useI18n()

const { pages } = usePages()

const topPages = computed(() => {
  return [...pages.value].sort((a, b) => a.compareFlowTime(b)).slice(0, 5)
})
</script>

<template>
  <section>
    <h4 class="downscaled underscore">
      <cyan-icon
        small
        noun="card"
      />
      {{ t('site.changes.title') }}
    </h4>
      
    <ul class="p-0">
      <PageChangeListItem
        v-for="page in topPages"
        :key="page.key"
        :page="page"
      />
    </ul>
  </section>
</template>