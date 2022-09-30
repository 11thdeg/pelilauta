<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import AppBar from '../../components/ui/AppBar.vue'
import { fetchSite } from '../../composables/useSites'
import PageContentArticle from '../../components/pages/PageContentArticle.vue'
import { usePages } from '../../composables/usePages'

const props = defineProps<{
  sitekey: string
}>()

const site = ref(new Site())

onMounted(async () => {
  usePages(props.sitekey)
  site.value = await fetchSite(props.sitekey) || new Site()
})

</script>

<template>
  <div id="SiteView">
    <AppBar
      :title="site.name"
      :noun="site.systemBadge"
    />
    <main class="bookLayout">
      <PageContentArticle :pagekey="site.homepage" />
      <article class="chroma-box-a Column card">
        <h3>{{ site.name }}</h3>
        <p>{{ site.description }}</p>
      </article>
    </main>
  </div>
</template>