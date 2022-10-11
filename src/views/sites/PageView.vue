<script lang="ts" setup>

import { useI18n } from 'vue-i18n'
import EmptyCollection from '../../components/ui/EmptyCollection.vue'
import SiteAppBar from '../../components/sites/SiteAppBar.vue'
import { usePage } from '../../composables/usePage'
import MarkdownSection from '../../components/content/MarkdownSection.vue'
import SideBar from '../../components/sites/SideBar.vue'
import SiteFabs from '../../components/sites/SiteFabs.vue'
import NavigationTray from '../../components/navigation/NavigationTray.vue'
import SiteTray from '../../components/sites/tray/SiteTray.vue'

const props = defineProps<{
  sitekey: string
  pagekey: string
}>()

const { t } = useI18n()

const { page, loading } = usePage(props.pagekey)

</script>

<template>
  <SiteAppBar
    :sitekey="sitekey"
    :pagekey="pagekey"
    sticky
  />
  <main class="bookLayout">
    <!-- Loader -->
    <div
      v-if="loading"
      class="loading"
    >
      <cyan-loader large />
    </div>
    <!-- Page-->
    <template v-else-if="page">
      <article class="Column double">
        <h1>{{ page.name }}</h1>
        <MarkdownSection
          v-if="page.markdownContent"
          :content="page.markdownContent"
        />
        <div
          v-else
          :innerHTML="page.htmlContent"
        />
      </article>
      <SideBar />
      <SiteFabs
        :sitekey="sitekey"
        :pagekey="pagekey"
      />
    </template>
    <EmptyCollection
      v-else
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
    <NavigationTray>
      <SiteTray />
    </NavigationTray>
  </main>
</template>