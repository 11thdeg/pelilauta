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
      <router-link
        to="/library"
        class="button tray-button"
      >
        <cyan-icon
          small
          noun="assets"
        />
        {{ $t('library.media.title') }}
      </router-link>
      <router-link
        to="/library/games"
        class="button tray-button"
      >
        <cyan-icon
          small
          noun="mekanismi"
        />
        {{ $t('library.games.title') }}
      </router-link>

      <router-link 
        v-if="admin"
        to="/library/blog"
        class="button tray-button"
      >
        <cyan-icon
          small
          noun="card"
        />
        {{ $t('blogs.publish.title') }}
      </router-link>
    </section>
  </nav>
</template>