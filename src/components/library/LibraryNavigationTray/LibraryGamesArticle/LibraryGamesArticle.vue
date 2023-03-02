<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSites } from '../../../../composables/useSites'
import SiteCard from '../../../SiteCard/SiteCard.vue'
import LibraryGamesFilterPane from '../../LibraryGamesFilterPane.vue'

const { ownSites } = useSites()

const filter = ref(new Array<string>())
const orderBy = ref('-flowtime')

const sites = computed(() => {
  return ownSites.value
    .filter(site => filter.value.includes('family:'+site.systemBadge) || filter.value.length === 0)
    .sort((a, b) => {
      if (orderBy.value === 'name') return a.name.localeCompare(b.name)
      if (orderBy.value === '-name') return b.name.localeCompare(a.name)
      if (orderBy.value === 'flowtime') return a.flowTime - b.flowTime
      if (orderBy.value === '-flowtime') return b.flowTime - a.flowTime
      return 0
    })
})
</script>

<template>
  <article class="Column large">
    <cyan-toolbar>
      <h3 class="downscaled">
        {{ $t('library.games.owns') }}
      </h3>
      <cyan-spacer />
      <router-link
        to="/add/site"
      >
        <button class="secondary">
          <cyan-icon
            noun="add"
            dark
          />
          {{ $t('action.add.site') }}
        </button>
      </router-link>
    </cyan-toolbar>

    <LibraryGamesFilterPane
      v-model="filter"
      v-model:order-by="orderBy"
    />

    <div class="ItemGrid">
      <SiteCard
        v-for="site in sites"
        :key="site.key"
        :site="site"
      />
    </div>
  </article>
</template>