<script lang="ts" setup>
import { useSession } from '../../../composables/useSession'
import NavigationTray from '../../NavigationTray/NavigationTray.vue'

const { admin } = useSession()
</script>

<template>
  <NavigationTray>
    <section>
      <cyan-toolbar>
        <cyan-icon noun="books" />
        <cyan-toolbar-heading :level="1">
          {{ $t('library.title') }}
        </cyan-toolbar-heading>
      </cyan-toolbar>
      <p class="TypeBody2 lowEmphasis">
        {{ $t('library.description') }}
      </p>
    </section>
    <section>
      <router-link to="/library">
        <cyan-nav-button
          noun="assets"
        >
          {{ $t('library.media.title') }}
        </cyan-nav-button>
      </router-link>
      <router-link to="/library/games">
        <cyan-nav-button
          noun="mekanismi"
        >
          {{ $t('library.games.title') }}
        </cyan-nav-button>
      </router-link>

      <router-link 
        v-if="admin"
        to="/library/blog"
      >
        <cyan-nav-button
          noun="card"
        >
          {{ $t('blogs.publish.title') }}
        </cyan-nav-button>
      </router-link>
      <!--cyan-nav-button
        disabled
        noun="discussion"
      >
        {{ $t('library.discussion.title') }}
      </cyan-nav-button-->
    </section>
  </NavigationTray>
</template>