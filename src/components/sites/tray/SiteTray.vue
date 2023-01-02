<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSite } from '../../../composables/useSite'
import PageIndex from '../../PageIndex.vue'
import SiteTrayHeader from './SiteTrayHeader.vue'

const { t } = useI18n()
const { key, loading, canEdit, site } = useSite()

</script>

<template>
  <div
    id="SiteTray"
  >
    <template v-if="loading">
      <cyan-loader inline />
    </template>
    <template v-else-if="site">
      <SiteTrayHeader />
      <cyan-toolbar style="padding: 0 8px">
        <cyan-spacer />
        <router-link :to="`/sites/${key}/keeper`">
          <cyan-button
            v-if="canEdit"
            text
            noun="adventurer"
          />
        </router-link>
        <cyan-button
          v-if="canEdit"
          text
          noun="tools"
          :disabled="$route.fullPath === `/sites/${key}/edit`"
          @click="$router.push(`/sites/${key}/edit`)"
        />
      </cyan-toolbar>


      <cyan-nav-section
        v-if="site.links && site.links.length"
        folds
        style="padding: 0 8px"
        :label="t('fields.site.link.title')"
      >
        <div class="linkList">
          <template
            v-for="link in site.links"
            :key="link.url"
          >
            <a :href="link.url">
              <cyan-nav-button
                noun="outlink"
              >{{ link.name }}</cyan-nav-button>
            </a>
          </template>
        </div>
      </cyan-nav-section>

      <PageIndex />
    </template>
  </div>
</template>

<style lang="sass">
.linkList
  padding: 0 8px
  margin: 0
  display: flex
  flex-direction: column
  gap: 8px
</style>