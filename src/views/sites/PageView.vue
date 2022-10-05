<script lang="ts" setup>
import { Page, Site } from '@11thdeg/skaldstore'
import { computed, onMounted } from 'vue'
import { ref, Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppBar from '../../components/ui/AppBar.vue'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import { fetchPage } from '../../composables/usePages'
import { fetchSite } from '../../composables/useSites'

const props = defineProps<{
  sitekey: string
  pagekey: string
}>()

const site:Ref<Site|undefined> = ref(undefined)
const page:Ref<Page|undefined> = ref(undefined)
const loading = ref(true)
const notFound = computed(() => {
  return !loading.value && (!page.value || !site.value)
})
const title = computed(() => site.value?.name || '')

onMounted(async () => {
  site.value = await fetchSite(props.sitekey)
  page.value = await fetchPage(props.sitekey, props.pagekey)
  loading.value = false
})

const { t } = useI18n()

</script>

<template>
  <AppBar :title="title" />
  <main class="bookLayout">
    <div
      v-if="loading"
      class="loading"
    >
      <cyan-loader large />
    </div>
    <EmptyCollection
      v-else-if="notFound"
      noun="page"
      :title="t('page.notFound.title')"
      :message="t('page.notFound.message')"
    >
      <cyan-button
        :label="t('action.add.new')"
        noun="page"
        text
        @click="$router.push(`/sites/${props.sitekey}/add/page`)"
      />
    </EmptyCollection>
    <div
      v-if="page"
      class="page"
    >
      <h1>{{ page.name }}</h1>
      <div class="content">
        <Markdown :content="page.markdownContent" />
      </div>
    </div>
  </main>
</template>