<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { ref } from 'vue'
import SiteCard from '../SiteCard/SiteCard.vue'
import { onMounted } from 'vue'
import { collection, query, orderBy, where, limit, getFirestore, getDocs } from '@firebase/firestore'


const topSites = ref(new Array<Site>())

onMounted(async () => {
  const q = query(
    collection(getFirestore(), Site.collectionName),
    orderBy('flowTime', 'desc'),
    orderBy('posterURL', 'desc'),
    where('hidden', '==', false),
    limit(3)
  )
  const docs = await getDocs(q)
  const arr = new Array<Site>()
  docs.forEach(doc => {
    arr.push(new Site(doc.data(), doc.id))
  })
  arr.sort((a, b) => {
    return b.flowTime - a.flowTime
  })
  topSites.value = arr
})

</script>

<template>
  <section
    id="TopSitesSection"
    class="flex flex-column"
  >
    <SiteCard
      v-for="site in topSites"
      :key="site.key"
      :site="site"
      hide-controls
    />
  </section>
</template>