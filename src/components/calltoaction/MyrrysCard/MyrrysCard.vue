<script lang="ts" setup>
import MyrrysBlogExcerptSection from './MyrrysBlogExcerptSection.vue'
</script>

<template>
  <section>
    <img
      class="hero"
      src="/proprietary/images/letl_cover.jpg"
      alt="L&L cover"
    >
    <div class="flex flex-no-wrap">
      <cyan-icon
        noun="myrrys"
      />
      <h4 class="downscaled">
        Myrrys
      </h4>
    </div>
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
          dark
        />
        Myrrys.com
      </button></a>
      <cyan-spacer />
    </cyan-toolbar>
  </section>
</template>

<style lang="sass">
.hero
  width: 100%
/* .MyrrysCard
  background-image:  linear-gradient(hsla(var(--chroma-primary-a-hsl), 0.55), hsla(var(--chroma-secondary-a-hsl), 0.55)),url('/proprietary/images/letl_cover.jpg')
  background-size: cover
  background-position-y: center
  background-position-x: right */
</style>