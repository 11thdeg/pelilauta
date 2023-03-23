<script setup lang="ts">
import { PageCategory, Site } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePages } from '../../composables/usePages'
import { useSite } from '../../composables/useSite'
import { logDebug } from '../../utils/logHelpers'

const props = defineProps<{
  chapter?: PageCategory
  editor?: boolean
}>()
const { site, canEdit } = useSite()
const { pages, loading } = usePages()

const { t } = useI18n()

const title = computed(() => {
  return props.chapter
    ? props.chapter.name
    : t('site.tray.unCategorizedPagesSection')
})

const pageIndex = computed(() => {
  const pageArray = props.chapter ?
    pages.value.filter(p => p.category === props.chapter?.slug) :
    pages.value.filter(p => !p.category || p.category === '-')

  switch (site.value?.sortOrder) {
  case Site.SORT_BY_MANUAL:
    return pageArray.sort((a, b) => a.sortWeight < b.sortWeight ? 1 : -1)
  case Site.SORT_BY_CREATED_AT:
    return pageArray.sort((a, b) => (a.createdAt?.seconds || 0) < (b.createdAt?.seconds || 0) ? 1 : -1)
  case Site.SORT_BY_FLOWTIME:
    return pageArray.sort((a, b) => (a.flowTime || 0) < (b.flowTime || 0) ? 1 : -1)
  default:
    return pageArray.sort((a, b) => a.name > b.name ? 1 : -1)
  }
})

async function moveUp(key: string) {
  logDebug('moveUp', key)
}

</script>
<template>
  <section v-if="!loading && site">
    <h4 class="downscaled underline">
      {{ title }}
    </h4>
    <ul class="list-unstyled">
      <li
        v-for="page in pageIndex"
        :key="page.key"
        class="flex flex-no-wrap justify-between"
      >
        <router-link :to="`/sites/${site.key}/pages/${page.key}`">
          <cyan-nav-button compact>
            {{ page.name }}
          </cyan-nav-button>
        </router-link>
        <button
          v-if="props.editor && canEdit && site.sortOrder === Site.SORT_BY_MANUAL"
          class="text compact"
        >
          <cyan-icon
            noun="arrow-up"
            small
            @click="moveUp(page.key)"
          />
        </button>
      </li>
    </ul>
  </section>
</template>

<style lang="sass">
.list-unstyled
  margin: 0
  padding: 0
  list-style: none
  flex-wrap: nowrap
  li
    list-style-type: none
    margin: 0
    padding: 0
    display: flex
    a
      flex-grow: 1
</style>