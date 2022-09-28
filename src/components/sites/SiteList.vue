<script lang="ts" setup>
import { ref } from 'vue';
import SiteListFilterPane from './SiteListFilterPane.vue'

const filter = ref(new Array<string>())
</script>
<template>
  <article class="Column double">
    <h1>Sites!</h1>
    <SiteListFilterPane v-model="filter" />
    <p>{{ filter }}</p>
  </article>
</template>