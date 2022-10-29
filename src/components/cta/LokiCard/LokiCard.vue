<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { logDebug } from '../../../utils/logHelpers'

interface WordpressArticle {
  ID: number
  URL: string
  title: string
  date: string
  excerpt: string
}

const articles = ref<WordpressArticle[]>([])

async function fetchArticles () {
  const after = '?after=' + new Date(Date.now() - (1000 * 3600 * 24) * 30).toISOString().substring(0, 10)
  const url = 'https://public-api.wordpress.com/rest/v1.1/sites/roolipeliloki.wordpress.com/posts' + after
  try {
    const response = await fetch(url)
    const json = await response.json()
    logDebug('LokiCard', 'fetchArticles', 'json', json)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    articles.value = json.posts.map((article:unknown) => {
      return article as WordpressArticle
    })
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchArticles()
})
</script>

<template>
  <section class="MekanismiAd chroma-box-a card">
    <p
      v-for="article in articles"
      :key="article.ID"
    >
      {{ article.title }}
    </p>
  </section>
</template>