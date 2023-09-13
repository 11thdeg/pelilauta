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
  <li
    class="hoverable clickable m-0 px-1"
    style="list-style-type: none;"
  >
    <router-link :to="to">
      <p class="TypeBody2 oneLiner m-0">
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