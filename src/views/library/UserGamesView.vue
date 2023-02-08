<script lang="ts" setup>
import LibraryGamesArticle from '../../components/library/LibraryNavigationTray/LibraryGamesArticle/LibraryGamesArticle.vue'
import LibraryNavigationTray from '../../components/library/LibraryNavigationTray/LibraryNavigationTray.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useSession } from '../../composables/useSession'

const { active, anonymous } = useSession()
</script>
<template>
  <div id="LibraryIndexView">
    <cyan-top-app-bar>
      <h2>
        {{ $t('library.games.title') }}
      </h2>
    </cyan-top-app-bar>
    <WithLoader
      large
      :suspended="!active"
    >
      <WithPermission :forbidden="anonymous">
        <LibraryNavigationTray />
        <main class="bookLayout">
          <LibraryGamesArticle />
        </main>
      </WithPermission>
    </WithLoader>
  </div>
</template>