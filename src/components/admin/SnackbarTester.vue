<script lang="ts" setup>
import { ref } from 'vue'
import { useSnack } from '../../composables/useSnack'

const { pushSnack } = useSnack()

const message = ref('A Test Message')
</script>

<template>
  <div class="Column">
    <h2>Snackbar tester</h2>
    <cyan-toolbar>
      <cyan-textfield
        :value="message"
        style="flex-grow:1"
        @change="message = $event.target.value"
      />
      <cyan-button
        label="Push to Snacks"
        @click="pushSnack(message)"
      />
    </cyan-toolbar>
  </div>
</template>