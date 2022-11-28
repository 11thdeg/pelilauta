<script lang="ts" setup>
import { ref } from 'vue'
import { useSession } from '../../../composables/useSession'

const { active, anonymous, eulaMissing, uid } = useSession()

const show = ref(false)
</script>

<template>
  <cyan-card
    v-if="show"
    id="SessionCard"
    elevation="3"
  >
    <h4 slot="title">
      Session info
    </h4>
    <cyan-icon
      slot="avatar"
      noun="admin"
    />
    <section class="info">
      <p>active</p>
      <p>
        [{{ active }}]
      </p>
      <p>anonymous</p>
      <p>
        [{{ anonymous }}]
      </p>
      <p>eula</p>
      <p>[{{ !eulaMissing }}]</p>
      <p>uid</p>
      <p>[{{ uid }}]</p>
    </section>
  </cyan-card>
</template>

<style lang="sass" scoped>
#SessionCard
  width: 300px
  position: fixed
  bottom: 12px
  left: 88px
  z-index: 100000
  opacity: 40%
  pointer-events: none
  .info
    display: grid
    grid-template-columns: 1fr 3fr
    p
      margin: 0
</style>