<script lang="ts" setup>
import { computed, ref } from 'vue'
import SiteListFilterPane from './SiteListFilterPane.vue'
import { useSites } from '../../composables/useSites'
import { useSession } from '../../composables/useSession'
import SiteCard from './SiteCard.vue'
import { useI18n } from 'vue-i18n'
import EmptyCollection from '../ui/EmptyCollection.vue'

const { uid } = useSession()
const { allSites } = useSites()
const { t } = useI18n()

const filteredSites = computed(() => {
  let arr = allSites.value
  if (filter.value.includes('visibility:own')) {
    arr = arr.filter(site => site.hasOwner(uid.value))
  }
  if (filter.value.includes('visibility:player')) {
    arr = arr.filter(site => site.players.includes(uid.value))
  }
  for (const index in filter.value) {
    const f = filter.value[index]
    if(f.startsWith('family:')) {
      arr = arr.filter(site => site.systemBadge === f.split(':')[1])
    }
  }
  return arr
})

const filter = ref(new Array<string>())
</script>
<template>
  <article class="Column double">
    <SiteListFilterPane v-model="filter" />
    <div
      v-if="filteredSites.length"
      class="siteListing"
    >
      <router-link
        v-for="site in filteredSites"
        :key="site.key"
        :to="'/sites/' + site.key"
      >
        <SiteCard
          :site="site"
        />
      </router-link>
    </div>
    <EmptyCollection
      v-else
      noun="mekanismi"
      :title="t('sites.empty.title')"
      :message="t('sites.empty.message')"
    />
  </article>
</template>

<style lang="sass" scoped>
.siteListing
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 1rem
  a
    text-decoration: none
</style>