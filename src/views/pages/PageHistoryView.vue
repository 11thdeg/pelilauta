<script lang="ts" setup>
import * as Diff from 'diff'
import { watch, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FlowTimeCaption from '../../components/content/FlowTimeCaption.vue'
import TopBar from '../../components/navigation/TopBar.vue'
import ProfileLink from '../../components/profileLink/ProfileLink.vue'
import { usePage } from '../../composables/usePage'
import { useSite } from '../../composables/useSite'

const props = defineProps<{
  sitekey: string
  pagekey: string
}>()

// We need to load state from the server when the route changes
watch(props, () => {
  // init site data, if not already loaded
  useSite(props.sitekey)
  // init page data, if not already loaded
  usePage(props.pagekey || '', props.sitekey)
}, { 
  immediate: true 
})

const { t } = useI18n()
// Composables for site and page data, thise are initiated in the watch above
const { site } = useSite()
const { page } = usePage()

const selected = ref(page.value?.revisionHistory ? page.value.revisionHistory.length - 1 : 0)

const selectedRevision = computed(() => {
  return page.value?.revisionHistory[selected.value] || undefined
})

const diff = computed(() => {
  if (!selectedRevision.value) return undefined
  const d = Diff.diffLines(selectedRevision.value.markdownContent, page.value?.markdownContent || '')
  return d.map((part) => {
    // green for additions, red for deletions
    // grey for common parts
    const color = part.added ? 'var(--chroma-secondary-d)' :
      part.removed ? 'var(--chroma-alert)' : 'transparent'
    return `<pre style="background: ${color}; margin: 0; padding: 8px; overflow: hidden; text-overflow: ellipsis">${part.value}</pre>`
  }).join('')
})
</script>

<template>
  <TopBar :title="t('page.revisions.title')" />
  <main class="bookLayout">
    <article
      v-if="site && page"
      class="large Column"
    >
      <template v-if="selectedRevision">
        <cyan-toolbar>
          <ProfileLink :uid="selectedRevision.author" />
          <cyan-spacer />
          <FlowTimeCaption :flow-time="selectedRevision.createdAt.seconds * 1000" />
        </cyan-toolbar>
        <div :innerHTML="diff" />
      </template>
    </article>
    <article
      v-if="site && page"
      class="small Column"
    >
      <cn-card elevation="0">
        <h4>{{ site.name }}</h4>
        <ul style="margin: 0; padding: 0">
          <li
            v-for="revision, index in page?.revisionHistory"
            :key="revision.createdAt.seconds"
            style="list-style-type: none;"
            class="hoverable clickable"
            @click="selected = index"
          >
            <cyan-toolbar>
              <ProfileLink :uid="revision.author" />
              <cyan-spacer />
              <FlowTimeCaption :flow-time="revision.createdAt.seconds * 1000" />
            </cyan-toolbar>
          </li>
        </ul>
      </cn-card>
    </article>
  </main>
</template>