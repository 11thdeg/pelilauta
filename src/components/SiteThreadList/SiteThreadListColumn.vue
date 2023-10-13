<script lang="ts" setup>
import { useSite } from '../../composables/useSite'
import SiteThreadListSection from './SiteThreadListSection.vue'

const { key } = useSite() 
</script>

<template>
  <article
    class="surface column"
  >
    <h4 class="downscaled underscore">
      <cyan-icon
        noun="discussion"
        small
      />
      {{ $t('site.threads.title') }}
    </h4>

    <SiteThreadListSection
      v-if="key"
      :sitekey="key"
    />

    <button
      class="text"
      style="margin-top: 12px"
    >
      <cyan-icon
        noun="add"
        small
      /> {{ $t('action.add.thread') }}
    </button>
  </article>
</template>
