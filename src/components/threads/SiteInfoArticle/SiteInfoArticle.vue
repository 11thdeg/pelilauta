<script lang="ts" setup>
import { useSites } from '../../../composables/useSites'
import WithLoader from '../../ui/WithLoader.vue'
import SiteCard from '../../SiteCard/SiteCard.vue'

import SiteThreadListSection from '../../SiteThreadList/SiteThreadListSection.vue'
import { Site } from '@11thdeg/skaldstore';
import { computed } from 'vue';


const props = defineProps<{
  sitekey?: string
  threadkey: string
}>()

const { allSites } = useSites()

const site = computed(() => {
  return allSites.value.find((s:Site) => s.key === props.sitekey)
})

</script>

<template>
  <article
    v-if="sitekey"
    class="column small"
  >
    <WithLoader :suspended="!site">  
      <SiteCard
        v-if="site"
        :site="site"
      />
      <SiteThreadListSection
        v-if="site"
        :sitekey="sitekey"
        :count="7"
        :omit="[threadkey]"
      />
    </WithLoader>
  </article>
</template>