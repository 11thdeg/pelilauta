

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBanner } from '../../composables/useBanner'
const { show, onCancel, onConfirm, hasAction, text }  = useBanner()
const visible = computed(() => show.value)
const t = useI18n().t
</script>

<template>
  <div id="Banner">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      :duration="200"
    >
      <div
        v-if="visible"
        id="BannerContent"
        class="rise-b"
      >
        <p>{{ text }}</p>
        <cyan-toolbar>
          <cyan-spacer />
          <cyan-button
            :label="t('action.cancel')"
            @click="onCancel"
          />
          <cyan-button
            v-if="hasAction"
            :label="t('action.ok')"
            @click="onConfirm"
          />
        </cyan-toolbar>
      </div>
    </transition>
  </div>
</template>

<style lang="sass" scoped>
#BannerContent
  border-top: solid 1px var(--color-border)
  border-bottom: solid 1px var(--color-border)
  margin: 0
  padding: 16px 12px
  p
    margin: 0
    padding: 0
</style>