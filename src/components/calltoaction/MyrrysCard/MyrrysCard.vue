<script lang="ts" setup>
import MyrrysBlogExcerptSection from './MyrrysBlogExcerptSection.vue'
</script>

<template>
  <cyan-card
    elevation="1"
    class="MyrrysCard"
  >
    <h4
      slot="title"
      class="myrrys"
    >
      Myrrys
    </h4>
    <cyan-icon
      slot="avatar"
      noun="myrrys"
    />
    <MyrrysBlogExcerptSection />

    <cyan-toolbar>
      <cyan-spacer />
      <a
        href="https://myrrys.com"
        target="_blank"
      ><button class="secondary">
        <cyan-icon
          noun="outlink"
          small
        />
        Myrrys.com
      </button></a>
      <cyan-spacer />
    </cyan-toolbar>
  </cyan-card>
</template>

<style lang="sass">
.MyrrysCard
  background-image:  linear-gradient(hsla(var(--chroma-primary-a-hsl), 0.55), hsla(var(--chroma-secondary-a-hsl), 0.55)),url('/proprietary/images/letl_cover.jpg')
  background-size: cover
  background-position-y: center
  background-position-x: right
</style>