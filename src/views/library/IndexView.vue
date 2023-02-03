<script lang="ts" setup>
import LibraryGamesArticle from '../../components/library/LibraryNavigationTray/LibraryGamesArticle/LibraryGamesArticle.vue'
import LibraryNavigationTray from '../../components/library/LibraryNavigationTray/LibraryNavigationTray.vue'

</script>
<template>
  <div id="LibraryIndexView">
    <cyan-top-app-bar>
      <h2>
        {{ $t('library.games.title') }}
      </h2>
    </cyan-top-app-bar>
    <LibraryNavigationTray />
    <main class="bookLayout">
      <LibraryGamesArticle />
    </main>
  </div>
</template>