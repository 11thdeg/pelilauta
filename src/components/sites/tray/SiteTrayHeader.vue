<script lang="ts" setup>
import { computed } from 'vue'
import { useSite } from '../../../composables/useSite'
import SiteAvatar from '../SiteAvatar.vue'

const { site, loading } = useSite()

const posterStyle = computed(() => {
  if (site.value?.posterURL) return 'background-image: url(' + site.value.posterURL + ')'
  return 'background: var(--color-background)'
})

</script>

<template>
  <cyan-loader v-if="loading" />
  <section
    v-else-if="site"
    id="SiteTrayHeader"
  >
    <div
      id="TrayPoster"
      :class="{ withPoster: !!site.posterURL }"
      :style="posterStyle"
    >
      <router-link
        :to="`/sites/${site.key}`"
        class="avatar"
      >
        <SiteAvatar
          large
          :site="site"
          class="clickable hoverable"
        />
      </router-link>
    </div>
    <h4 class="downscaled title">
      {{ site.name }}
    </h4>
    <p class="TypeCaption lowEmphasis title">
      {{ site.description }}
    </p>
  </section>
</template>

<style scoped lang="sass">
#SiteTrayHeader
  padding: 8px
  #TrayPoster
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
    &.withPoster
      height: 124px
      .avatar
        margin-top:77px
        filter: drop-shadow(0px 0px 8px var(--chroma-secondary-b))
  .title
    margin: 0
    margin-top: 16px
    text-align: center
  
</style>