<script setup lang="ts">

const props = defineProps<{
  noun: string
  label: string
  to: string
  disabled?: boolean,
  active?: boolean
}>()
</script>

<template>
  <router-link
    class="NavButton"
    :class="{ disabled: disabled, active: active }"
    :to="props.to"
  >
    <div class="activeButtonHighlight" />
    <cyan-icon
      dark
      class="hoverable clickable"
      :noun="`${props.noun}`"
    />
    <div class="label">
      {{ props.label }}
    </div>
  </router-link>
</template>

<style lang="sass" scoped>
.NavButton
  height: 72px
  width: 72px
  box-sizing: border-box
  margin: 0
  padding: 10px 18px
  overflow: hidden
  position: relative
  display: inline-block
  transition: 0.22s all
  text-decoration: none
  cyan-icon
    height: 36px
    width: 36px
    position: absolute
    top: 10px
    left: 18px
    z-index: 2
  div.label
    position: absolute
    bottom: 10px
    left: 0
    margin: 0
    padding: 0
    line-height: 12px
    font-size: 12px
    text-align: center
    width: 72px
    font-weight: bold
    color: var(--chroma-secondary-h)
    z-index: 3
    font-family: var(--cyan-ui-font)
  &.disabled
    opacity: 0.2
    cursor: not-allowed
  .activeButtonHighlight
    position: absolute
    pointer-events: none
    top: 4px
    left: 4px
    width: 64px
    height: 64px
    background-color: rgba(#a2e4ec, 0.11)
    z-index: 1
    border-radius: 8px
    opacity: 0
    transition: 200ms all
  &.active, &:hover
    .activeButtonHighlight
      opacity: 1
  &.active:hover
    .activeButtonHighlight
      background-color: rgba(#a2e4ec, 0.22)
</style>