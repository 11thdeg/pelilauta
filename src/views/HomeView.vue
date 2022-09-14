<script lang="ts" setup>
import AppBar from '../components/ui/AppBar.vue'
import ThreadCardList from '../components/threads/ThreadCardList.vue'
import CreateAccountAd from '../components/cta/CreateAccountAd.vue'

</script>
<template>
  <AppBar />
  <main class="bookLayout">
    <ThreadCardList />
    <div class="Column">
      <CreateAccountAd />
      <h2>Placeholder for CTA's</h2>
    </div>
  </main>
</template>