<script lang="ts" setup>

const props = defineProps<{
  modelValue: boolean
  label: string
}>()
    
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
    
function close () {
  emit('update:modelValue', false)
}    
</script>
    
<template>
  <div
    v-if="props.modelValue"
    id="Dialog"
  >
    <div
      id="DialogCard"
      class="theme-surface"
    >
      <cyan-toolbar style="margin: 0 8px">
        <cyan-icon
          noun="close"
          @click="close"
        />
        <cyan-toolbar-heading>
          {{ props.label }}
        </cyan-toolbar-heading>
      </cyan-toolbar>
      <div class="dialogContent">
        <slot />
      </div>
    </div>
  </div>
</template>
    
<style scoped lang="sass">
#Dialog
  background: var(--pelilauta-dialog-backdrop)
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  z-index: var(--pelilauta-dialog-z-index)
  #DialogCard
    position: absolute
    top: 16px
    left: 16px
    width: calc(100vw - 32px)
    height: auto
    background-color: var(--pelilauta-dialog-background)
    border-radius: 16px
    .dialogContent
      padding: 12px 16px
@media screen and (min-width: 600px)
  #Dialog
    #DialogCard
      width: 580px
      top:  50%
      left: 50%
      transform: translate(-50%,-50%)
      
</style>