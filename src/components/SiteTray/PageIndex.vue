<script setup lang="ts">
import { Site } from '@11thdeg/skaldstore'
import { computed, ref } from 'vue'
import { usePages } from '../../composables/usePages'
import { useSite } from '../../composables/useSite'
import PageIndexChapter from './PageIndexChapter.vue'

const { site, chapters, loading, canEdit } = useSite()
const { pages } = usePages()

const editMode = ref(false)

const hasEmptyChapter = computed(() => {
  return pages.value.find(p => !p.category || p.category === '-')
})
const showEditButton = computed(() => {
  return canEdit.value && site.value?.sortOrder === Site.SORT_BY_MANUAL
})

</script>

<template>
  <section
    v-if="site && !loading"
    class="PageIndex"
  >
    <PageIndexChapter
      v-for="chapter in chapters"
      :key="chapter.slug"
      :chapter="chapter"
      :editor="editMode"
    />
    <PageIndexChapter
      v-if="hasEmptyChapter"
      :editor="editMode"
    />

    <!-- Modal: only visible if the user can edit, and the site index is set to manual-->
    <cyan-toolbar v-if="showEditButton">
      <cyan-spacer />
      <button
        v-if="!editMode"
        class="text editButton"
        @click="editMode = !editMode"
      >
        <cyan-icon
          noun="edit"
          small
        />
        {{ $t('action.edit') }}
      </button>
      <button
        v-else
        class="text editButton"
        @click="editMode = !editMode"
      >
        <cyan-icon
          noun="close"
          small
        />
        {{ $t('action.done') }}
      </button>
    </cyan-toolbar>
  </section>
</template>

<style lang="sass">
.PageIndex
  max-width: 100%
  overflow: hidden

@media screen and (max-width: 768px)
  .PageIndex
    border-radius: 12px
</style>