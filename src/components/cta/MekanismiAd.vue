<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'

const { t } = useI18n()
const { anonymous } = useSession()
</script>

<template>
  <cyan-card
    elevation="1"
    class="MekanismiAd chroma-box-b"
    cover="/proprietary/images/wootha-public-domain-talk-to-me.jpeg"
  >
    <cyan-icon
      slot="avatar"
      noun="mekanismi"
      large
      dark
    />
    <h3 slot="title">
      {{ t('cta.mekanismiAd.title') }}
    </h3> 
    <p class="TypeBody2">
      {{ $t('cta.mekanismiAd.description') }}
    </p>
    <cyan-toolbar>
      <cyan-spacer />
      <router-link to="/sites">
        <cyan-button
          noun="mekanismi"
          :label="t('action.toSites')"
          text
          dark
        />
      </router-link>
      <router-link
        v-if="!anonymous"
        to="/add/site"
      >
        <cyan-button
          noun="add"
          text
          dark
          :label="t('action.create')"
        />
      </router-link>
      <cyan-spacer />
    </cyan-toolbar>
  </cyan-card>
</template>
