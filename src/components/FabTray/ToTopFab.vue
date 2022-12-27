<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

// *** On Scroll, show to top FAB ***************************************
const toTopVisibleToggle = ref(false)

const scrollListener = (e: Event) => {
  const top = window.pageYOffset || (e.target as HTMLElement).scrollTop || 0
  toTopVisibleToggle.value = top > 112
}

onMounted(() => {
  window.addEventListener('scroll', scrollListener)
})
onUnmounted(() => {
  window.removeEventListener('scroll', scrollListener)
})

function toTopAction () {
  const rootElement = document.documentElement
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
     
</script>

<template>
  <div class="toTopFab">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      :duration="100"
    >
      <cyan-fab
        v-if="toTopVisibleToggle"
        noun="arrow-up"
        secondary
        @click="toTopAction"
      />
    </transition>
  </div>
</template>
  
  