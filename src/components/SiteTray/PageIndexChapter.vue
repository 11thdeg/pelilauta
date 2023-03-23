<script setup lang="ts">
import { PageCategory, Site } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePages } from '../../composables/usePages'
import { useSite } from '../../composables/useSite'
import { store } from '../../utils/firestoreHelpers'
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
    return pageArray.sort((a, b) => a.sortWeight > b.sortWeight ? 1 : -1)
  case Site.SORT_BY_CREATED_AT:
    return pageArray.sort((a, b) => (a.createdAt?.seconds || 0) < (b.createdAt?.seconds || 0) ? 1 : -1)
  case Site.SORT_BY_FLOWTIME:
    return pageArray.sort((a, b) => (a.flowTime || 0) < (b.flowTime || 0) ? 1 : -1)
  default:
    return pageArray.sort((a, b) => a.name > b.name ? 1 : -1)
  }
})

async function moveUp(key: string) {
  const index = pageIndex.value.findIndex(p => p.key === key)
  if (index === 0) return
  logDebug('moveUp', key)

  const page = pageIndex.value[index]
  const prevPage = pageIndex.value[index - 1]
  // If the sortWeight is the same, we need to make sure that the sortWeight is unique
  const prevWeight = page.sortWeight === prevPage.sortWeight ? prevPage.sortWeight - 1 : prevPage.sortWeight 
  prevPage.sortWeight = page.sortWeight
  page.sortWeight = prevWeight

  await store(page, { silent: true })
  await store(prevPage, { silent: true })
}

async function moveDown(key: string) {
  logDebug('moveDown', key)
  const index = pageIndex.value.findIndex(p => p.key === key)
  if (index === pageIndex.value.length - 1) return

  const page = pageIndex.value[index]
  const nextPage = pageIndex.value[index + 1]
  // If the sortWeight is the same, we need to make sure that the sortWeight is unique
  const nextWeight = page.sortWeight === nextPage.sortWeight ? nextPage.sortWeight + 1 : nextPage.sortWeight
  nextPage.sortWeight = page.sortWeight
  page.sortWeight = nextWeight

  await store(page, { silent: true })
  await store(nextPage, { silent: true })
}

</script>
<template>
  <section v-if="!loading && site">
    <h4 class="downscaled underline">
      {{ title }}
    </h4>
    <ul class="list-unstyled">
      <li
        v-for="page, index in pageIndex"
        :key="page.key"
        class="flex flex-no-wrap justify-between"
      >
        <router-link
          :to="`/sites/${site.key}/pages/${page.key}`"
          :class="{'no-clicks': editor}"
        >
          <cyan-nav-button compact>
            {{ page.name }}
          </cyan-nav-button>
        </router-link>
        <button
          v-if="props.editor && canEdit && site.sortOrder === Site.SORT_BY_MANUAL"
          class="text compact"
          style="margin-right: -12px"
          :disabled="index === 0"
        >
          <cyan-icon
            noun="arrow-up"
            small
            @click="moveUp(page.key)"
          />
        </button>
        <button
          v-if="props.editor && canEdit && site.sortOrder === Site.SORT_BY_MANUAL"
          class="text compact"
          :disabled="index === pageIndex.length - 1"
        >
          <cyan-icon
            noun="arrow-down"
            small
            @click="moveDown(page.key)"
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
      overflow: hidden
.no-clicks
  pointer-events: none
  opacity: 0.5
</style>