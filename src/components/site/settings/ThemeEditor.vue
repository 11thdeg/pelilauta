<script lang="ts" setup>
import { useSite } from '../../../composables/useSite'
import { logError } from '../../../utils/logHelpers'
import SiteCard from '../../SiteCard/SiteCard.vue'
import SiteInfoEditorSection from './SiteInfoEditorSection.vue'
import SiteThemingEditorSection from './SiteThemingEditorSection.vue'

const { site } = useSite()

logError('ThemeEditor', 'Theme image change not implemented yet.')
</script>

<template>
  <article
    class="Column ThemeEditor"
  >
    <section class="m-a">
      <SiteCard :site="site" /> 
    </section>
    
    <section>
      <h2 class="downscaled">
        {{ $t('site.tools.settings.title') }}
      </h2>
    </section>

    

    <SiteInfoEditorSection />

    <SiteThemingEditorSection />
  </article>
</template>