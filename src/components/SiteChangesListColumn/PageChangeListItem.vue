<script lang="ts" setup>
import { computed } from 'vue'
import { useSite } from '../../composables/useSite'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ProfileLink from '../profileLink/ProfileLink.vue'

const props = defineProps<{
  page: {
    key?: string
    name: string
    flowTime: number
    author: string
  }
}>()

const { key } = useSite()

const to = computed(() => {
  return `/sites/${key.value}/pages/${props.page.key}`
})
</script>

<template>
  <li class="hoverable clickable">
    <router-link :to="to">
      <p class="TypeBody2 oneLiner noMargin">
        {{ page.name }}
      </p>
      <cyan-toolbar small>
        <ProfileLink :uid="page.author" />
        <FlowTimeCaption
          class="hideOnMobile"
          :flow-time="page.flowTime"
        />
      </cyan-toolbar>
    </router-link>
  </li>
</template>

<style lang="sass" scoped>
li
  list-style-type: none
  height: calc( var(--cn-page-grid) * 2 )
  margin-bottom: calc( var(--cn-page-grid) / 2 )
.noMargin
  margin: 0
</style>