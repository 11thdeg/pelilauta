<script lang="ts" setup>
import { useSites } from '../../../../composables/useSites'
import GameListItem from './GameListItem.vue'

const { ownSites } = useSites()
</script>

<template>
  <article>
    <h4>{{ $t('library.games.title') }}</h4>
    <ul class="no-margin no-padding">
      <GameListItem
        v-for="game in ownSites"
        :key="game.key"
        :game="game"
      />
    </ul>
  </article>
</template>