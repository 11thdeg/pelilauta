<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSite } from '../../../composables/useSite'
import SiteAvatar from '../../sites/SiteAvatar.vue'
import { useScreenSize } from '../../../composables/useScreenSize'

const emit = defineEmits<{
    (e: 'show', value: boolean): void
}>()

const { site, loading } = useSite()
const { isSmall } = useScreenSize()
const showTray = ref(false)

function toggleTray() {
  showTray.value = !showTray.value
  emit('show', showTray.value)
}

const posterStyle = computed(() => {
  if (site.value?.posterURL) return 'background-image: url(' + site.value.posterURL + ')'
  return 'background: var(--color-background)'
})

const menuNoun = computed(() => {
  if (showTray.value) return 'close'
  return 'menu'
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
    <div class="flex">
      <div class="flex-grow">
        <h4 class="downscaled title">
          {{ site.name }}
        </h4>
        <p class="TypeCaption lowEmphasis title">
          {{ site.description }}
        </p>
      </div>
      <button
        v-if="isSmall"
        class="text"
      >
        <cyan-icon
          :noun="menuNoun"
          @click="toggleTray"
        />
      </button>
    </div>
  </section>
</template>

<style scoped lang="sass">
#SiteTrayHeader
  // border: red solid 1px
  #TrayPoster
    background-position: center
    background-size: cover
    display: flex
    justify-content: center
    align-items: bottom
    margin-bottom: 12px
    .avatar
      margin-bottom: -22px
      margin-top: 24px
    &.withPoster
      margin: -12px
      margin-bottom: var(--cn-gap)
      height: calc(var(--cn-page-grid) * 5.75)
      border-radius: var(--cn-border-radius)
      .avatar
        margin-top: calc(var(--cn-page-grid) * 3.75)
        filter: drop-shadow(0px 0px 8px var(--chroma-secondary-b))
  .title
    margin: 0
    margin-top: 16px
    text-align: center

</style>