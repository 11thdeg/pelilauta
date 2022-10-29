<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { logDebug } from '../../../utils/logHelpers'
import { htmlDecode } from '../../../utils/htmlDecode'
import { useI18n } from 'vue-i18n'

interface WordpressArticle {
  ID: number
  URL: string
  title: string
  date: string
  excerpt: string
}

const { t } = useI18n()

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
  <section
    id="LokiCard"
    class="chroma-box-a card"
  >
    <div class="overlay">
      <cyan-toolbar style="margin-bottom: var(--cyan-col-gap)">
        <h1 class="TypeHeadline5">
          {{ t('cta.loki.title') }}
        </h1>
        <cyan-spacer />
        <cyan-icon
          noun="loki"
          dark
        />
      </cyan-toolbar>
      <div
        v-for="article in articles"
        :key="article.ID"
      >
        <a :href="article.URL">
          <h4 style="margin-bottom: 0">{{ htmlDecode(article.title) }}</h4>
          <p class="TypeCaption">
            {{ article.date.substring(0, 10) }}
          </p>
        </a>
      </div>
      <cyan-toolbar>
        <cyan-spacer />
        <a
          href="https://roolipeliloki.wordpress.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <cyan-button
            noun="loki"
            :label="t('action.toLoki')"
          />
        </a>
        <cyan-spacer />
      </cyan-toolbar>
    </div>
  </section>
</template>

<style lang="sass" scoped>
#LokiCard
  background-image: url('/proprietary/images/loki.jpeg')
  background-size: cover
  .overlay
    background: linear-gradient(177deg,rgba(0,35,55,.4),rgba(0,35,55,.9))
    margin: -12px
    padding: 12px
    border-radius: 12px
</style>