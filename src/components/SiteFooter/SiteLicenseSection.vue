<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMeta } from '../../composables/useMeta'
import { useSite } from '../../composables/useSite'

const { t } = useI18n()
const { site } = useSite()
const { siteLicenses } = useMeta()

const license = computed(() => siteLicenses.value?.find(l => l.id === site.value?.license))

</script>

<template>
  <section
    v-if="site && license"
    class="flex"
    style="max-width: 400px; flex-wrap: nowrap;"
  >
    <cyan-icon
      :noun="license.icon"
      style="align-self: flex-start;"
    />
    <div style="flex-shrink: 1;">
      <h4
        class="downscaled"
        style="margin: 0"
      >
        <a :href="license.ref">
          {{ license.name }}
        </a>
      </h4>
      <p class="TypeCaption">
        {{ t('site.license.info') }}
      </p>
    </div>
  </section>
</template>