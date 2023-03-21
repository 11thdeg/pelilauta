<script lang="ts" setup>
import { Page } from '@11thdeg/skaldstore'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePages } from '../../composables/usePages'
import { useSite } from '../../composables/useSite'
import { store } from '../../utils/firestoreHelpers'
import { logDebug } from '../../utils/logHelpers'

type PageIndexEntry = {
  name: string
  to?: string
  slug?: string
  category: boolean
  weight?: number
}

const { t } = useI18n()
const { site, chapters, loading: siteLoading, canEdit } = useSite()
const { pages, loading: pagesLoading } = usePages()

const editMode = ref(false)

const loading = computed(() => siteLoading.value || pagesLoading.value)


function comparePages(a: Page, b: Page) {
  // Defaults to 0 in case of undefined at the DB
  if (a.sortWeight !== b.sortWeight) {
    return a.sortWeight < b.sortWeight ? 1 : -1
  }
  return a.name > b.name ? 1 : -1
}

function fixWeights(cat: string) {
  const pagesInCategory = pages.value.filter(p => cat !== '-' ? p.category === cat : !p.category)
  const sorted = pagesInCategory.sort((a, b) => comparePages(b, a))
  sorted.forEach((p, i) => {
    p.sortWeight = i + 1
    store(p, { silent: true })
  })
}

function moveUp(slug: string) {
  logDebug('moveUp', slug)
  const cat = pages.value.find(p => p.key === slug)?.category || '-'
  logDebug('cat', cat)
  const pagesInCategory = pages.value.filter(p => cat !== '-' ? p.category === cat : !p.category)
  logDebug('pagesInCategory', pagesInCategory.length)
  const sorted = pagesInCategory.sort((a, b) => comparePages(a, b))
  const index = sorted.findIndex(p => p.key === slug)
  if (index === 0) {
    return
  }
  if (sorted[index].sortWeight === 0) fixWeights(cat)
  sorted[index].sortWeight++
  sorted[index - 1].sortWeight--
  store(sorted[index], { silent: true })
  store(sorted[index - 1], { silent: true })
}

const index = computed(() => {
  const i: PageIndexEntry[] = []
  chapters.value.forEach(c => {
    i.push({
      name: c.name,
      category: true
    })
    pages.value.filter(p => p.category === c.slug).
      sort((a, b) => comparePages(a, b)).forEach(p => {
        i.push({
          name: p.name,
          to: `/sites/${site.value?.key || ''}/pages/${p.key || ''}`,
          category: false,
          slug: p.key,
          weight: p.sortWeight
        })
      })
  })
  const unsorted = pages.value.filter(p => p.category === '-' || !p.category)
  if (unsorted.length) {
    i.push({
      name: t('fields.page.noCategory'),
      category: true
    })
    unsorted.sort((a, b) => comparePages(a, b)).forEach(p => {
      i.push({
        name: p.name,
        to: `/sites/${site.value?.key || ''}/pages/${p.key || ''}`,
        category: false,
        slug: p.key,
        weight: p.sortWeight
      })
    })
  }
  return i
})
</script>

<template>
  <section
    v-if="!loading"
    class="PageIndex"
  >
    <button
      v-if="canEdit"
      class="text editButton"
      @click="editMode = !editMode"
    >
      <cyan-icon noun="edit" />
    </button>
    <template
      v-for="entry, i in index"
      :key="i"
    >
      <h4
        v-if="entry.category"
        class="downscaled"
        style="border-bottom: 1px solid var(--cyan-divider-color); margin: 8px 0"
      >
        {{ entry.name }}
      </h4>
      <div
        v-else-if="entry.to"
        class="flex"
      >
        <router-link :to="entry.to">
          <cyan-nav-button compact>
            {{ entry.name }}
            {{ entry.weight }}
          </cyan-nav-button>
        </router-link>
        <button
          v-if="editMode"
          class="text"
          @click="moveUp(entry.slug || '')"
        >
          <cyan-icon noun="chevron-up" />
        </button>
      </div>
    </template>
  </section>
</template>