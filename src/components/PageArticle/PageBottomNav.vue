<script setup lang="ts">
import { ContentEntryType } from '@11thdeg/skaldstore/dist/ContentEntry'
import { toRefs } from 'vue'

const props = defineProps<{
  page: ContentEntryType & { parentKey: string }
  canEdit?: boolean
}>()
const { page, canEdit } = toRefs(props)
</script>

<template>
  <nav class="flex space-between border-top">
    <p
      v-if="page.tags && page.tags.length > 0"
      class="m-0 TypeCaption"
    >
      {{ $t('fields.page.tags') }} 
      <span
        v-for="tag in page.tags"
        :key="tag"
      >
        <router-link :to="`/tags/${tag}`">
          {{ tag }}
        </router-link>
      </span>
    </p>
    <p class="m-0 TypeCaption">
      <router-link :to="`/sites/${page.parentKey}/pages/${page.key}/revisions`">
        {{ $t('page.revisions.title') }}
      </router-link>
      <template v-if="canEdit">
        - 
        <router-link
          :to="`/sites/${page.parentKey}/pages/${page.key}/move`"
        >
          {{ $t('page.move.title') }}
        </router-link>
      </template>
    </p>
  </nav>
</template>