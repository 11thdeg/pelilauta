<script lang="ts" setup>
import { onMounted } from 'vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import { loadSite, useSite } from '../../composables/useSite'
import WithPermission from '../../components/ui/WithPermission.vue'
import CraftPageAricle from '../../components/pages/CraftPageArticle.vue'

const { loading, canEdit } = useSite()

const props = defineProps<{
  sitekey: string;
}>()

onMounted(() => {
  // Check if we have the site in the store, load it if not
  loadSite(props.sitekey)
})
</script>
<template>
  <!-- A Modal App-bar with backlink -->
  <cn-app-bar 
    modal
    :title="$t('page.create.title')"
    @back="() => $router.back()"
  />
  <!-- Standard "booklayout" with a single medium column -->
  <main class="bookLayout">
    <!-- Wait untill we have a site, and canEdit returns a sane result -->
    <WithLoader :suspended="loading">
      <WithPermission :forbidden="!canEdit">
        <CraftPageAricle />
      </WithPermission>
    </WithLoader>
  </main>
</template>