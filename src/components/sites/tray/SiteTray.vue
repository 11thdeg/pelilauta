<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePages } from '../../../composables/usePages'
import { useSession } from '../../../composables/useSession'
import { useSite } from '../../../composables/useSite'
import ShareButton from '../../actions/ShareButton.vue'
import SiteTrayHeader from './SiteTrayHeader.vue'

const { t } = useI18n()
const { site, chapters, loading } = useSite()
const { uid } = useSession()
const { pages } = usePages()

function inChapter(c: string) {
  return pages.value.filter(p => p.category === c)
}
const unCategorized = computed(() => {
  return pages.value.filter(p => (!p.category || !chapters.value.find(c => c.slug === p.category)))
})
const key = computed(() => site.value?.key || '')
</script>

<template>
  <div
    id="SiteTray"
  >
    <template v-if="loading">
      <cyan-loader inline />
    </template>
    <template v-else-if="site">
      <SiteTrayHeader />
      <cyan-toolbar style="padding: 0 8px">
        <cyan-spacer />
        <ShareButton icon />
        <cyan-button
          v-if="site.hasOwner(uid)"
          text
          noun="adventurer"
        />
        <cyan-button
          v-if="site.hasOwner(uid)"
          text
          noun="tools"
          :disabled="$route.fullPath === `/sites/${key}/edit`"
          @click="$router.push(`/sites/${key}/edit`)"
        />
      </cyan-toolbar>


      <cyan-nav-section
        v-if="site.links && site.links.length"
        folds
        style="padding: 0 8px"
        :label="t('fields.site.link.title')"
      >
        <template
          v-for="link in site.links"
          :key="link.url"
        >
          <a :href="link.url">
            <cyan-nav-button
              noun="outlink"
            >{{ link.name }}</cyan-nav-button>
          </a>
        </template>
      </cyan-nav-section>

      <cyan-nav-section
        v-for="chapter in chapters"
        :key="chapter.slug"
        :label="chapter.name"
      >
        <router-link
          v-for="page in inChapter(chapter.slug)"
          :key="page.key"
          :to="`/sites/${site.key}/pages/${page.key}`"
        >
          <cyan-nav-button
            compact
          >
            <div class="oneLiner TypeCaption">
              {{ page.name }}
            </div>
          </cyan-nav-button>
        </router-link>
      </cyan-nav-section>
      <cyan-nav-section
        v-if="unCategorized.length > 0"
        :label="t('site.tray.unCategorizedPagesSection')"
      >
        <router-link
          v-for="page in unCategorized"
          :key="page.key"
          :to="`/sites/${site.key}/pages/${page.key}`"
        >
          <cyan-nav-button
            compact
          >
            <div class="oneLiner TypeCaption">
              {{ page.name }} 
            </div>
          </cyan-nav-button>
        </router-link>
      </cyan-nav-section>
    </template>
  </div>
</template>