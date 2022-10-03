<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import AppBar from '../../components/ui/AppBar.vue'
import { useSession } from '../../composables/useSession'
import { fetchSite } from '../../composables/useSites'
import LoginRequiredColumn from '../../components/account/LoginRequiredColumn.vue'
const props = defineProps<{
  sitekey: string
}>()

const { anonymous, uid } = useSession()
const site = ref(new Site())

onMounted(async () => {
  site.value = await fetchSite(props.sitekey) || new Site()
})
</script>

<template>
  <div id="EditSiteView">
    <AppBar
      :title="site.name"
      :noun="site.systemBadge"
    />
    <main class="dashboardLayout">
      <LoginRequiredColumn v-if="anonymous || !site.hasOwner(uid)" />
      <template v-else>
        <div class="Column">
          ...
        </div>
      </template>
    </main>
  </div>
</template>