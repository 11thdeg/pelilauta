<script lang="ts" setup>
import { PageCategory } from '@11thdeg/skaldstore/dist/entries/Site'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../../composables/useSession'
import { useSite } from '../../../composables/useSite'
import { logDebug } from '../../../utils/logHelpers'
import ChapterEditor from './ChapterEditor.vue'

const { t } = useI18n()
const { chapters, updateChapters, site } = useSite()
const { uid } = useSession()

const activeChapter = ref<PageCategory|undefined>(undefined)

async function moveUp(index: number) {
  if (index === 0) return
  const arr = chapters.value
  const temp = arr[index - 1]
  arr[index -1 ] = arr[index]
  arr[index] = temp
  await updateChapters(arr)
}

function save(chapter: PageCategory) {
  logDebug('save', chapter, site.value?.owners, uid.value)
  if(!site.value?.hasOwner(uid.value)) throw new Error('You can not edit categories if you are not the owner of the site')

  const arr = Array.from(chapters.value)
  if(!arr.find(a => a.slug === chapter.slug)) {
    const ct:PageCategory = {
      name: chapter.name || '-',
      slug: chapter.slug || '-',
    }
    arr.push(ct)
  }
  updateChapters(arr)
}

function drop(index: number) {
  const arr = chapters.value
  arr.splice(index, 1)
  updateChapters(arr)
}

</script>

<template>
  <div class="Column card rise-b">
    <h3>{{ t('site.tools.chapters.title') }}</h3>
    <p class="TypeCaption">
      {{ t('site.tools.chapters.info') }}
    </p>
    <div
      v-for="chapter, index in chapters"
      :key="chapter.name"
      class="sortableTable"
    >
      <p>
        {{ chapter.name }}
      </p>
      <cyan-button
        noun="chevron-up"
        text
        :disabled="index === 0"
        @click="moveUp(index)"
      />
      <cyan-button
        noun="edit"
        text
        @click="activeChapter = chapter"
      />
      <cyan-button
        noun="delete"
        text
        @click="drop(index)"
      />
    </div>
    <ChapterEditor
      :chapter="activeChapter"
      @save="save($event)"
    />
  </div>
</template>

<style lang="sass" scoped>
.sortableTable
  display: grid
  grid-template-columns: auto 32px 32px 32px
</style>