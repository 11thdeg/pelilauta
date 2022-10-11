<script lang="ts" setup>
import { computed } from 'vue'
import { useSite } from '../../../composables/useSite'
import SiteAvatar from '../SiteAvatar.vue'

const { site } = useSite()


const posterStyle = computed(() => {
  if (site.value?.posterURL) return 'background-image: url(' + site.value.posterURL + ')'
  return 'background: var(--color-background)'
})

</script>

<template>
  <div
    v-if="site"
    id="SiteTrayHeader"
    :style="posterStyle"
  >
    <router-link
      :to="`/sites/${site.key}`"
      class="avatar"
    >
      <SiteAvatar
        :site="site"
        class="clickable hoverable"
      />
    </router-link>
  </div>
</template>

<style scoped lang="sass">
#SiteTrayHeader
  margin: -4px
  padding: 12px
  background-position: center
  background-size: cover
  border-radius: 12px
  display: flex
  justify-content: center
  align-items: bottom
  margin-bottom: 12px
  .avatar
    margin-bottom: -24px
    margin-top: 24px
</style>