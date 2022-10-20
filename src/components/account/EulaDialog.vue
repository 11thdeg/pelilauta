<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSession } from '../../composables/useSession'
import Dialog from '../ui/Dialog.vue'

const { eulaMissing, account } = useSession()
const dismissed = ref(false)

const showDialog = computed({
  get() {
    return eulaMissing.value && !dismissed.value
  },
  set(value) {
    dismissed.value = !value
  }
})
</script>

<template>
  <Dialog
    v-model="showDialog"
    label="EULA!!"
  >
    <h1>EULA not approved! (account does not exist)</h1>
    <p>{{ account }}</p>
  </Dialog>
</template>