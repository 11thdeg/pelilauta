<script lang="ts" setup>
import { onMounted, Ref, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSnack } from '../../composables/useSnack'
import { logDebug } from '../../utils/loghelpers'

const { snackStack } = useSnack()
const messageCode = ref('')
const messageParams:Ref<Record<string, string>|undefined>= ref(undefined)
const { t } = useI18n()

onMounted(() => {
    watch(snackStack.value, (stack) => {
    logDebug('Snackbar stack changed', stack)
    if (stack.length > 0) {
        const snack = stack[0]
        messageCode.value = snack.message
        messageParams.value = snack.params
        setTimeout(() => {
            if (stack[0] === snack) {
            messageCode.value = ''
            messageParams.value = undefined
            setTimeout(() => {
                snackStack.value.shift()
            }, 500)
            }
        }, 5000)
    }
    })
})
</script>
    
<template>
  <div id="SnackBar">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOutLeft"
      :duration="330"
    >
      <div
        v-if="messageCode"
        id="SnackMessage"
        class="rise-d"
      >
        {{ t(messageCode) }}
      </div>
    </transition>
  </div>
</template>
    
<style lang="sass" scoped>
#SnackMessage
    position: fixed
    bottom: 16px
    left: 16px
    background-color: var(--cyan-color-background)
    z-index: var(--z-index-snacks)
    padding: 16px
    border-radius: 4px
</style>