<script lang="ts" setup>
import AppBar from '../components/ui/AppBar.vue'
import ThreadCardList from '../components/threads/ThreadCardList.vue'
import CreateAccountAd from '../components/cta/CreateAccountAd.vue'
import MekanismiAd from '../components/cta/MekanismiAd.vue'

</script>
<template>
  <AppBar />
  <main class="bookLayout">
    <ThreadCardList />
    <div class="Column">
      <CreateAccountAd />
      <MekanismiAd />
    </div>
  </main>
</template>