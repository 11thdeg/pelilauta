<script lang="ts" setup>
import NavigationTray from '../../NavigationTray/NavigationTray.vue'

</script>

<template>
  <NavigationTray>
    <section style="padding: 8px 12px;">
      <cyan-toolbar>
        <cyan-icon noun="books" />
        <h4 class="downscaled">
          {{ $t('library.title') }}
        </h4>
      </cyan-toolbar>
    </section>
    <section>
      <router-link to="/library">
        <cyan-nav-button
          noun="mekanismi"
        >
          {{ $t('library.games.title') }}
        </cyan-nav-button>
      </router-link>
      <router-link to="/library/media">
        <cyan-nav-button
          noun="assets"
        >
          {{ $t('library.media.title') }}
        </cyan-nav-button>
      </router-link>
      <router-link to="/library/threads">
        <cyan-nav-button
          noun="discussion"
        >
          {{ $t('library.discussion.title') }}
        </cyan-nav-button>
      </router-link>
    </section>
  </NavigationTray>
</template>