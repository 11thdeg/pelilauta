<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <header class="flex space-between">
    <h2 class="downscaled">
      {{ 
        t('forum.index.title') 
      }}
    </h2>
    <router-link
      class="button text"
      to="/add/thread"
    >
      <cyan-icon 
        noun="add"
        small
      />
      {{ 
        t('action.add.new') 
      }}
    </router-link>
  </header>
</template>