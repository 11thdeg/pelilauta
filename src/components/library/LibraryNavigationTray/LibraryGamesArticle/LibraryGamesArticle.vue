<script lang="ts" setup>
import { useSites } from '../../../../composables/useSites'

const { ownSites } = useSites()
</script>

<template>
  <article>
    <h4>{{ $t('library.games.title') }}</h4>
    <p
      v-for="site in ownSites"
      :key="site.key"
    >
      {{ site.name }}
    </p>
  </article>
</template>