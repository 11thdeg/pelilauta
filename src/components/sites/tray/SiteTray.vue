<script lang="ts" setup>
import { computed } from 'vue'
import { usePages } from '../../../composables/usePages'
import { useSession } from '../../../composables/useSession'
import { useSite } from '../../../composables/useSite'
import ShareButton from '../../actions/ShareButton.vue'
import SiteTrayHeader from './SiteTrayHeader.vue'

const { site, chapters } = useSite()
const { uid } = useSession()
const { pages } = usePages()

function inChapter(c: string) {
  return pages.value.filter(p => p.category === c)
}
const key = computed(() => site.value?.key || '')
</script>

<template>
  <div
    v-if="site"
    id="SiteTray"
  >
    <SiteTrayHeader />
    <cyan-toolbar>
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

    <template
      v-for="chapter in chapters"
      :key="chapter.slug"
    >
      <h4>{{ chapter.name }}</h4>
      <p
        v-for="page in inChapter(chapter.slug)"
        :key="page.key"
      >
        - <router-link :to="`/sites/${site.key}/pages/${page.key}`">
          {{ page.name }}
        </router-link>
      </p>
    </template>

    <hr>
    {{ site }}
  </div>
</template>