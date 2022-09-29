<script lang="ts" setup>
import { computed, ref } from 'vue'
import SiteListFilterPane from './SiteListFilterPane.vue'
import { useSites } from '../../composables/useSites'
import { useSession } from '../../composables/useSession'

const { uid } = useSession()
const { allSites } = useSites()

const filteredSites = computed(() => {
  let arr = allSites.value
  if (filter.value.includes('visibility:own')) {
    arr = arr.filter(site => site.hasOwner(uid.value))
  }
  if (filter.value.includes('visibility:player')) {
    arr = arr.filter(site => site.players.includes(uid.value))
  }
  return arr
})

const filter = ref(new Array<string>())
</script>
<template>
  <article class="Column double">
    <h1>Sites!</h1>
    <SiteListFilterPane v-model="filter" />
    <p>{{ filter }}</p>
    <p
      v-for="site in filteredSites"
      :key="site.key"
    >
      {{ site.name }}
    </p>
  </article>
</template>