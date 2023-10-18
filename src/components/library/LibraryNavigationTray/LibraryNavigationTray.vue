<script lang="ts" setup>
import { useSession } from '../../../composables/useSession'

const { admin } = useSession()
</script>

<template>
  <nav class="cn-tray">
    <section>
      <cyan-toolbar>
        <cyan-icon noun="books" />
        <cyan-toolbar-heading :level="1">
          {{ $t('library.title') }}
        </cyan-toolbar-heading>
      </cyan-toolbar>
      <p>
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
  </nav>
</template>