<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import WithLoader from '../../ui/WithLoader.vue'
import { logDebug } from '../../../utils/logHelpers'

interface WordpressArticle {
  guid: number
  link: string
  title: string
  pubDate: string
  description: string
}
const articles = ref<WordpressArticle[]>([])
const loading = ref(true)

async function fetchArticles () {
  // const after = '?after=' + new Date(Date.now() - (1000 * 3600 * 24) * 60).toISOString().substring(0, 10)
  const url = 'https://www.myrrys.com/rss.xml'
  try {
    const response = await fetch(url)
    // the response is an XML document with a root element <rss><channel>...</channel></rss>
    const xml = await response.text()
    logDebug('myrrysCard', 'fetchArticles', 'xml', xml)
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, 'application/xml')
    const items = doc.getElementsByTagName('item')
    logDebug('myrrysCard', 'fetchArticles', 'items', items)
    for (let i = 0; i < items.length && i < 3; i++) {
      const item = items[i]
      const title = item.getElementsByTagName('title')[0].textContent
      const link = item.getElementsByTagName('link')[0].textContent
      const description = item.getElementsByTagName('description')[0].textContent
      const pubDate = item.getElementsByTagName('pubDate')[0].textContent
      articles.value.push({
        guid: i,
        title: title || '',
        link: link || '',
        description: description || '',
        pubDate: pubDate || ''
      })
    }

    /*const json = await response.blob
    // logDebug('LokiCard', 'fetchArticles', 'json', json)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    articles.value = json.posts.map((article:unknown) => {
      return article as WordpressArticle
    })*/
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

onMounted(() => {
  fetchArticles()
})

/*function excerptFrom(article:WordpressArticle) {
  const element = document.createElement('div')
  element.innerHTML = article.description
  // const content = element.textContent
  //const ellipsis = content && content.length > 120 ? '...' : ''
  //return content?.substring(0, 140) + ellipsis

}*/

</script>

<template>
  <section class="blogItems">
    <WithLoader :suspended="!articles || articles.length < 1">
      <a
        v-for="article in articles"
        :key="article.guid"
        class="intemlink hoverable clickable"
        :href="article.link"
        target="_top"
      >
        <h4
          class="downscaled"
          style="margin-bottom: 12px"
          :innerHTML="article.title"
        />
        <p class="TypeCaption">
          {{ article.description }}
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
  /*background: 
    linear-gradient(
      hsla(var(--chroma-secondary-a-hsl), 0.44), 
      hsla(var(--chroma-primary-c-hsl), 0.17)
    );*/
}
</style>