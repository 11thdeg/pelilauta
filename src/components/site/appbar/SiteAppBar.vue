<script setup lang="ts">
import { useSite } from '../../../composables/useSite'
import LoveASiteButton from '../../SiteCard/LoveASiteButton.vue'
import ShareButton from '../../ShareButton/ShareButton.vue'

const { site, canEdit } = useSite()
</script>

<template>
  <cn-app-bar
    id="TopBar"
    :title="site.name"
    sticky
  >
    <LoveASiteButton :site="site" />
    <router-link
      v-if="canEdit"
      :to="`/sites/${site.key}/keeper`"
      class="text button"
    >
      <cyan-icon noun="adventurer" small/>
    </router-link>
    <router-link
      v-if="canEdit"
      :to="`/sites/${site.key}/edit`"
      class="text button"
    >
      <cyan-icon noun="tools" small />
    </router-link>
    <ShareButton />
  </cn-app-bar>
</template>

