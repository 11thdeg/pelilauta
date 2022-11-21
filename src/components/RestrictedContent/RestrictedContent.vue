<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <div class="RestrictedContent">
    <h2 style="text-align: center;">
      {{ t('restrictedContent.title') }}
    </h2>
    <div class="iconContainer">
      <cyan-icon
        noun="avatar"
        xlarge
        class="icon"
      />
    </div>
    <p class="TypeBody2 lowEmphasis">
      {{ t('restrictedContent.description') }}
    </p>
  </div>
</template>

<style lang="sass" scoped>
.iconContainer
  display: block
  justify-content: center
  align-items: center
  margin: 24px auto
  background: linear-gradient(144deg, var(--chroma-alert), var(--chroma-secondary-c))
  height: 144px
  width: 144px
  border-radius: 50%
  position: relative
  .icon
    position: absolute
    top: 7px
    left: 7px
    
</style>