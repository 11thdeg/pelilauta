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
  const after = '?after=' + new Date(Date.now() - (1000 * 3600 * 24) * 60).toISOString().substring(0, 10)
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
    class="chroma-box-a card rise-b"
  >
    <div class="overlay">
      <cyan-toolbar style="margin-bottom: var(--cyan-col-gap)">
        <cyan-toolbar-heading level="2">
          {{ t('cta.loki.title') }}
        </cyan-toolbar-heading>
        <cyan-spacer />
        <cyan-icon
          noun="loki"
          dark
        />
      </cyan-toolbar>
      <div class="articleContainer">
        <div
          v-for="article in articles"
          :key="article.ID"
        >
          <a :href="article.URL">
            <h3 style="margin-bottom: 0">{{ htmlDecode(article.title) }}</h3>
            <p class="TypeCaption">
              {{ article.date.substring(0, 10) }}
            </p>
          </a>
        </div>
      </div>
      <cyan-toolbar>
        <cyan-spacer />
        <a
          href="https://roolipeliloki.wordpress.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <cyan-button
            text
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
  .articleContainer
    background: var(--cyan-background-overlay-dark)
    margin: 0 -12px
    padding: 4px 12px
</style>