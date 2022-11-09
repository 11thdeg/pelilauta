

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBanner } from '../../composables/useBanner'
const { show, onCancel, onConfirm, hasAction, text }  = useBanner()
const visible = computed(() => show.value)
const { t } = useI18n()
</script>

<template>
  <div id="Banner">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
      :duration="200"
    >
      <div
        v-if="visible"
        id="BannerContent"
        class="rise-b"
      >
        <p>{{ t(text) }}</p>
        <cyan-toolbar>
          <cyan-spacer />
          <cyan-button
            text
            :label="t('action.cancel')"
            @click="onCancel"
          />
          <cyan-button
            v-if="hasAction"
            text
            :label="t('action.continue')"
            @click="onConfirm"
          />
        </cyan-toolbar>
      </div>
    </transition>
  </div>
</template>

<style lang="sass" scoped>
#BannerContent
  border-top: solid 1px var(--cyan-color-divider)
  border-bottom: solid 1px var(--cyan-color-divider)
  margin: 0
  margin-left: 0px
  padding: 16px 12px
  padding-bottom: 0
  p
    margin: 0
    padding: 0
</style>