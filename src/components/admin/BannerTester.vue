<script lang="ts" setup>
import { ref } from 'vue'
import { useBanner } from '../../composables/useBanner'

const { raise } = useBanner()

const message = ref('A Test Message')
</script>

<template>
  <div class="Column">
    <h2>Banner tester</h2>
    <cyan-toolbar>
      <cyan-textfield
        :value="message"
        style="flex-grow:1"
        @change="message = $event.target.value"
      />
      <cyan-button
        label="Push to Snacks"
        @click="raise(message)"
      />
    </cyan-toolbar>
  </div>
</template>