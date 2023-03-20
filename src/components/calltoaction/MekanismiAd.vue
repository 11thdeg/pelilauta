<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'

const { t } = useI18n()
const { anonymous } = useSession()
</script>

<template>
  <cn-card
    :title="$t('cta.mekanismiAd.title')"
    :snippet="$t('cta.mekanismiAd.description')"
    class="MekanismiAd chroma-box-b"
    cover="/proprietary/images/wootha-public-domain-talk-to-me.jpeg"
    noun="mekanismi"
  >
    <cyan-toolbar slot="actions">
      <cyan-spacer />
      <router-link
        v-if="anonymous"
        to="/sites"
      >
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
  </cn-card>
</template>
