<script lang="ts" setup>
import { onMounted } from 'vue'
import { loadSite, useSite } from '../../../composables/useSite'
import WithLoader from '../../ui/WithLoader.vue'
import SiteCard from '../../SiteCard/SiteCard.vue'
import { watch } from 'vue'


const props = defineProps<{
  sitekey?: string
}>()

const { site, loading, notFound } = useSite()

onMounted(async() => {
  watch(() => props.sitekey, (key) => {
    if (key) loadSite(key)
  }, { immediate: true })
})

</script>

<template>
  <article
    v-if="sitekey"
    class="Column small"
  >
    <WithLoader :suspended="loading">  
      <SiteCard
        v-if="site && !notFound"
        :site="site"
      />
    </WithLoader>
  </article>
</template>