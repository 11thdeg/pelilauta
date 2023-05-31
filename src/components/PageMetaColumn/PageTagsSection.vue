<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  page: {
    tags: string[]
  }
}>()

const count = computed(() => {
  return props.page.tags.length
})
</script>

<template>
  <section v-if="page.tags && page.tags.length > 0">
    <h4 class="downscale">
      {{ $t('fields.page.tags') }} <span class="TypeCaption">
        ({{ count }})
      </span>
    </h4>
    
    <ul class="navigation">
      <li
        v-for="tag in page.tags"
        :key="tag"
      >
        <router-link :to="`/tags/${tag}`">
          <cyan-button
            text
            :label="tag"
          />
        </router-link>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.navigation {
  list-style-type: none;
}
</style>