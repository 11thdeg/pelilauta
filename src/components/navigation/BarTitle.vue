<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  title: string,
  to?: string
}>()

const route = useRoute()

const targetRoute = computed(() => {
  if (props.to) return props.to
  return route.path
})

</script>
<template>
  <div class="BarTitle">
    <h1 class="TypeHeadline5 hideOnMobile">
      <router-link
        :to="targetRoute"
      >
        {{ title }}
      </router-link>
    </h1>
    <h4 class="TypeHeadline6 onlyOnMobile">
      <router-link
        :to="targetRoute"
      >
        {{ title }}
      </router-link>
    </h4>
  </div>
</template>

<style scoped lang="sass">
.BarTitle
  display: flex
  flex-grow: 0
  padding: 0
  height: 56px
  justify-content: center
  // align-items: center
  flex-direction: column
  h4
    line-height: calc(56px / 2)
    max-height: 56px
</style>