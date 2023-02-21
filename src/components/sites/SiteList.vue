<script lang="ts" setup>
import { computed, ref } from 'vue'
import SiteListFilterPane from './SiteListFilterPane.vue'
import { useSites } from '../../composables/useSites'
import { useSession } from '../../composables/useSession'
import SiteCard from '../SiteCard/SiteCard.vue'
import { useI18n } from 'vue-i18n'
import EmptyCollection from '../ui/EmptyCollection.vue'

const { uid } = useSession()
const { allSites } = useSites()
const { t } = useI18n()

const orderBy = ref('flowtime')

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
  // Sorting, ugly but works
  if (orderBy.value === 'flowtime') arr.sort((a, b) => a.compareFlowTime(b))
  else if (orderBy.value === '-flowtime') arr.sort((a, b) => b.compareFlowTime(a))
  else if (orderBy.value === 'name') arr.sort((a, b) => a.name > b.name ? 1 : -1)
  else if (orderBy.value === '-name') arr.sort((a, b) => a.name < b.name ? 1 : -1)
  // ...
  return arr
})

const filter = ref(new Array<string>())
</script>
<template>
  <article
    class="Column large"
  >
    <SiteListFilterPane
      v-model="filter"
      v-model:order-by="orderBy"
    />
    <div
      v-if="filteredSites.length"
      class="siteListing"
    >
      <SiteCard
        v-for="site in filteredSites"
        :key="site.key"
        :site="site"
      />
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
  display: flex
  flex-direction: column
  gap: var(--cn-gap-column)
  a
    text-decoration: none

@media screen and (min-width: 800px)
  .siteListing
    padding-top: 4px
    display: grid
    grid-template-columns: calc(700px / 2 - 8px) calc(700px / 2 - 8px)
</style>