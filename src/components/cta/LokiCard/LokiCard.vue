<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { htmlDecode } from '../../../utils/htmlDecode'
import { useI18n } from 'vue-i18n'
import WithLoader from '../../ui/WithLoader.vue'

interface WordpressArticle {
  ID: number
  URL: string
  title: string
  date: string
  excerpt: string
}

const { t } = useI18n()
const articles = ref<WordpressArticle[]>([])
const loading = ref(true)

async function fetchArticles () {
  const after = '?after=' + new Date(Date.now() - (1000 * 3600 * 24) * 60).toISOString().substring(0, 10)
  const url = 'https://public-api.wordpress.com/rest/v1.1/sites/roolipeliloki.wordpress.com/posts' + after
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
</script>

<template>
  <cyan-card
    id="LokiCard"
    elevation="1"
    class="chroma-box-a "
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
            </a>
          </div>
        </WithLoader>
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
  </cyan-card>
</template>

<style lang="sass" scoped>
#LokiCard
  background-image: url('/proprietary/images/loki.jpeg')
  background-size: cover
  min-width: 100%
  min-height: 100px
  .overlay
    background: linear-gradient(177deg,rgba(0,35,55,.4),rgba(0,35,55,.9))
    margin: -12px
    padding: 12px
    border-radius: 12px
  .articleContainer
    background: linear-gradient(177deg,rgba(0,35,55,.4),rgba(0,35,55,.9))
    margin: 12px -12px
    padding: var(--cn-padding)
    justify-content: left
    align-items: flex-start
</style>