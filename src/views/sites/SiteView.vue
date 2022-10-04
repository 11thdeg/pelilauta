<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import AppBar from '../../components/ui/AppBar.vue'
import { fetchSite } from '../../composables/useSites'
import PageContentArticle from '../../components/pages/PageContentArticle.vue'
import { usePages } from '../../composables/usePages'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  sitekey: string
}>()

const site = ref(new Site())
const { t } = useI18n()

onMounted(async () => {
  usePages(props.sitekey)
  site.value = await fetchSite(props.sitekey) || new Site()
})

const { pages } = usePages(props.sitekey)

</script>

<template>
  <div id="SiteView">
    <AppBar
      :title="site.name"
      :noun="site.systemBadge"
    />
    <main class="bookLayout">
      <PageContentArticle
        :pagekey="site.homepage"
        :sitekey="sitekey"
      />
      <article class="chroma-box-a Column card">
        <h3>{{ site.name }}</h3>
        <p>{{ site.description }}</p>
        <cyan-button
          :label="t('action.edit')"
          noun="tools"
          @click="$router.push(`/sites/${props.sitekey}/edit`)"
        />
        <hr>
        <ul>
          <li
            v-for="page in pages"
            :key="page.key"
          >
            <router-link :to="`/sites/${site.key}/pages/${page.key}`">
              {{ page.name }}
            </router-link>
          </li>
        </ul>
      </article>
    </main>
  </div>
</template>