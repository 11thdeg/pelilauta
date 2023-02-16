<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import WithLoader from '../../ui/WithLoader.vue'

interface WordpressArticle {
  ID: number
  URL: string
  title: string
  date: string
  excerpt: string
}
const articles = ref<WordpressArticle[]>([])
const loading = ref(true)

async function fetchArticles () {
  // const after = '?after=' + new Date(Date.now() - (1000 * 3600 * 24) * 60).toISOString().substring(0, 10)
  const url = 'https://public-api.wordpress.com/rest/v1.1/sites/myrrys.com/posts?number=3'
  try {
    const response = await fetch(url)
    const json = await response.json()
    // logDebug('LokiCard', 'fetchArticles', 'json', json)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    articles.value = json.posts.map((article:unknown) => {
      return article as WordpressArticle
    })
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

onMounted(() => {
  fetchArticles()
})

function excerptFrom(article:WordpressArticle) {
  const element = document.createElement('div')
  element.innerHTML = article.excerpt
  const content = element.textContent
  const ellipsis = content && content.length > 120 ? '...' : ''
  return content?.substring(0, 140) + ellipsis
}

</script>

<template>
  <section class="blogItems">
    <WithLoader :suspended="!articles || articles.length < 1">
      <a
        v-for="article in articles"
        :key="article.ID"
        class="intemlink hoverable clickable"
        :href="article.URL"
        target="_top"
      >
        <h4
          class="downscaled"
          style="margin-bottom: 12px"
          :innerHTML="article.title"
        />
        <p class="TypeCaption">
          {{ excerptFrom(article) }}
        </p>
      </a>
    </WithLoader>
  </section>
</template>

<style scoped>
.intemlink {
  display: block;
  margin: 0 -12px;
  border-radius: 6px;
  padding: 6px;
}
.blogItems {
  margin: 12px -12px;
  margin-bottom: 8px;
  padding: 6px 16px;
  background: 
    linear-gradient(
      hsla(var(--chroma-secondary-a-hsl), 0.44), 
      hsla(var(--chroma-primary-c-hsl), 0.17)
    );
}
</style>