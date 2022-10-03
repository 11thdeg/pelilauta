<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  title?: string
  noun: string,
  message?: string
}>()

const { t } = useI18n()
const sectionTitle = computed(() => props.title || t('app.emptycollection.title'))
</script>

<template>
  <section class="EmptyCollection">
    <h1>{{ sectionTitle }}</h1>
    <div class="iconFrame chroma-box-c">
      <cyan-icon
        :noun="noun"
        xlarge
        dark
        opca
      />
    </div>
    <p v-if="message">
      {{ message }}
    </p>
    <cyan-toolbar class="centered">
      <cyan-spacer />
      <slot />
      <cyan-spacer />
    </cyan-toolbar>
  </section>
</template>

<style lang="sass" scoped>
.EmptyCollection
  text-align: center
.iconFrame
  height: 128px
  width: 128px
  border-radius: 50%
  opacity: 0.5
  padding: 16px
  margin: 0 auto
</style>