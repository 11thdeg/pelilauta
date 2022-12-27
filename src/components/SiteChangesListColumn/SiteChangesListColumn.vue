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
  <article class="small Column">
    <cyan-card>
      <h4 slot="title">
        {{ t('site.changes.title') }}
      </h4>
      <cyan-icon
        slot="avatar"
        noun="card"
      />
      <ul
        class="plain"
        style="margin-top: var(--cn-page-grid)"
      >
        <PageChangeListItem
          v-for="page in topPages"
          :key="page.key"
          :page="page"
        />
      </ul>
    </cyan-card>
  </article>
</template>

<style lang="sass" scoped>
ul.plain
  padding: 0
</style>