<script lang="ts" setup>
import FabTray from '../../components/FabTray/FabTray.vue'
import LibraryGamesArticle from '../../components/library/LibraryNavigationTray/LibraryGamesArticle/LibraryGamesArticle.vue'
import LibraryNavigationTray from '../../components/library/LibraryNavigationTray/LibraryNavigationTray.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { useSession } from '../../composables/useSession'

const { active, anonymous } = useSession()
</script>
<template>
  <div id="LibraryIndexView">
    <cn-app-bar :title="$t('library.characters.title')" />
    <WithLoader
      large
      :suspended="!active"
    >
      <WithPermission :forbidden="anonymous">
        <LibraryNavigationTray />
        <main class="container">
          <LibraryGamesArticle />
        </main>
      </WithPermission>
    </WithLoader>
    <FabTray>
      <cyan-fab
        noun="add"
        :label="$t('action.add.character')"
      />
    </FabTray>
  </div>
</template>