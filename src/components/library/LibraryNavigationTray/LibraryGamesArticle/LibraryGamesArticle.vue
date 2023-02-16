<script lang="ts" setup>
import { useSites } from '../../../../composables/useSites'
import GameListItem from './GameListItem.vue'

const { ownSites } = useSites()
</script>

<template>
  <article>
    <h4>{{ $t('library.games.owns') }}</h4>
    <router-link
      to="/add/site"
    >
      <button class="secondary">
        <cyan-icon
          noun="add"
          dark
        />
        {{ $t('action.add.site') }}
      </button>
    </router-link>
    <ul class="mx-0 px-0">
      <GameListItem
        v-for="game in ownSites"
        :key="game.key"
        :game="game"
      />
    </ul>
  </article>
</template>