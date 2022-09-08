<script lang="ts" setup>
    import { computed } from 'vue'
    import { useMeta } from '../../composables/useMeta'
        
    const props = defineProps<{
      slug:string
    }>()
    
    const { streams } = useMeta()
    
    const topic = computed(() => {
    const t = streams.value.find(stream => stream.slug === props.slug)
    
    if (t) return t
      return { icon: 'discussion' }
    })
    </script>
        
<template>
  <cyan-icon :noun="topic.icon" />
</template>