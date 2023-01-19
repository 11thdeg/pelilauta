<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePages } from '../composables/usePages'
import { useSite } from '../composables/useSite'

type PageIndexEntry = {
  name: string
  to?: string
  category: boolean
}

const { t } = useI18n()
const { site, chapters, loading: siteLoading } = useSite()
const { pages, loading: pagesLoading } = usePages()

const loading = computed(() => siteLoading.value || pagesLoading.value)

const index = computed(() => {
  const i: PageIndexEntry[] = []
  chapters.value.forEach(c => {
    i.push({
      name: c.name,
      category: true
    })
    pages.value.filter(p => p.category === c.slug).
      sort((a, b) => a.name > b.name ? 1 : -1).forEach(p => {
        i.push({
          name: p.name,
          to: `/sites/${site.value?.key || ''}/pages/${p.key || ''}`,
          category: false
        })
      })
  })
  const unsorted = pages.value.filter(p => p.category === '-' || !p.category)
  if (unsorted.length) {
    i.push({
      name: t('fields.page.noCategory'),
      category: true
    })
    unsorted.sort((a, b) => a.name > b.name ? 1 : -1).forEach(p => {
      i.push({
        name: p.name,
        to: `/sites/${site.value?.key || ''}/pages/${p.key || ''}`,
        category: false
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
      <router-link
        v-else-if="entry.to"
        :to="entry.to"
      >
        <cyan-nav-button compact>
          {{ entry.name }}
        </cyan-nav-button>
      </router-link>
    </template>
  </section>
</template>