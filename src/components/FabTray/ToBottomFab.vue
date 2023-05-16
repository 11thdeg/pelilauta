<script lang="ts" setup>
function toBottomAction () {
  const rootElement = document.documentElement
  rootElement.scrollTo(0, rootElement.scrollHeight)
}
</script>

<template>
  <div class="toBottomFab">
    <cyan-fab
      noun="arrow-down"
      small
      :label="$t('action.scroll.toBottom')"
      @click="toBottomAction"
    />
  </div>
</template>
  
  