<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'

const { t } = useI18n()
const { anonymous } = useSession()
</script>

<template>
  <section class="MekanismiAd chroma-box-a card">
    <div class="boxHeader">
      <img
        alt=""
        class="splash"
        src="/proprietary/images/wootha-public-domain-talk-to-me.jpeg"
        style="border-radius: 12px 12px 0 0"
      >
      <cyan-icon
        noun="mekanismi"
        large
        dark
        class="adicon"
      />
      <h3>
        <router-link to="/sites">
          {{ $t('cta.mekanismiAd.title') }}
        </router-link>
      </h3>
    </div>
    <p
      class="TypeBody2"
      style="margin-top: 32px; margin-bottom: 0"
    >
      {{ $t('cta.mekanismiAd.description') }}
    </p>
    <cyan-toolbar>
      <cyan-spacer />
      <router-link to="/sites">
        <cyan-button
          noun="mekanismi"
          :label="t('action.toSites')"
        />
      </router-link>
      <router-link
        v-if="!anonymous"
        to="/add/site"
      >
        <cyan-button
          noun="add"
          :label="t('action.create')"
        />
      </router-link>
      <cyan-spacer />
    </cyan-toolbar>
  </section>
</template>



<style lang="sass" scoped>
.MekanismiAd
  padding: var(--cyan-col-gap)
  position: relative
  h3, p
    text-align: center
  .boxHeader 
    position: relative
    cyan-icon
      position: absolute
      left: -8px
      top: -8px
      z-index: 2
    h3
      position: absolute
      bottom: -12px
      margin: 0
      padding-bottom: 4px
      padding-top: 24px
      right: -12px
      width: calc(100% + 24px)
      background: rgb(0,0,0)
      background: linear-gradient(0deg, rgba(0,0,0,0.6) 14%, rgba(0,0,0,0) 100%)
      a
        text-decoration: none
        color: white
  img.splash
    width: calc(100% + 24px)
    max-width: calc(100% + 24px)
    opacity: 1
    margin: -12px
</style>
