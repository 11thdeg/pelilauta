<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { htmlDecode } from '../../../utils/htmlDecode'
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
  const url = 'https://public-api.wordpress.com/rest/v1.1/sites/roolipeliloki.wordpress.com/posts?number=3'
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
  <section class="LokiSection">
    <img
      class="hero"
      src="/proprietary/images/loki.jpeg"
      alt="Loki hero image"
    >
    <div class="flex flex-no-wrap">
      <cyan-icon
        noun="loki"
      />
      <h4 class="downscaled">
        Loki
      </h4>
    </div>

    <div class="articleContainer flex flex-column">
      <WithLoader
        small
        :suspended="loading"
      >
        <div
          v-for="article in articles"
          :key="article.ID"
          class="hoverable clickable"
        >
          <a :href="article.URL">
            <h4
              style="margin-bottom: 0"
              class="downscaled"
            >{{ htmlDecode(article.title) }}</h4>
            <p class="TypeCaption">
              {{ article.date.substring(0, 10) }}
            </p>
            <p class="TypeCaption">
              {{ excerptFrom(article) }}
            </p>
          </a>
        </div>
      </WithLoader>
    </div>
    <br>
    <cyan-toolbar>
      <cyan-spacer />
      <a
        href="https://roolipeliloki.wordpress.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button class="secondary">
          <cyan-icon
            dark
            small
            noun="outlink"
          />
          {{ $t('action.toLoki') }}
        </button>
        
      </a>
      <cyan-spacer />
    </cyan-toolbar>
  </section>
</template>

<style lang="sass" scoped>
.LokiSection
  img.hero
    object-position: left
</style>