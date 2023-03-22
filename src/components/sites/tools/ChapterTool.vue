<script lang="ts" setup>
import { CyanSelect } from '@11thdeg/cyan'
import { PageCategory, Site } from '@11thdeg/skaldstore/dist/entries/Site'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../../composables/useSession'
import { useSite } from '../../../composables/useSite'
import { useSnack } from '../../../composables/useSnack'
import { store } from '../../../utils/firestoreHelpers'
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

const orderModes = [
  { label: t('fields.site.orderMode.name'), value: Site.SORT_BY_NAME },
  { label: t('fields.site.orderMode.createdAt'), value: Site.SORT_BY_CREATED_AT },
  { label: t('fields.site.orderMode.flowtime'), value: Site.SORT_BY_FLOWTIME },
  { label: t('fields.site.orderMode.manual'), value: Site.SORT_BY_FLOWTIME },
]

const { pushSnack } = useSnack()

async function updateSortOrder(event: Event) {
  const target = event.target as CyanSelect
  const value = target.value
  const s = site.value
  if (!s) throw new Error('Site not found')
  s.sortOrder = value
  await store(s)
  pushSnack('site.tools.orderMode.updated')
}

</script>

<template>
  <article class="small Column">
    <h3>{{ $t('site.tools.index') }}</h3>

    <section class="fieldset">
      <h4>{{ $t('fields.site.orderMode.title') }}</h4>
      <p class="TypeCaption">
        {{ $t('site.tools.orderMode.info') }}
      </p>
   

      <!-- Order mode for the items inside chapters -->
      <cyan-select
        :label="$t('fields.site.orderMode.title')"
        :value="site?.sortOrder || Site.SORT_BY_NAME"
        :options="orderModes" 
        @change="updateSortOrder($event)"
      />
    </section>

    <!-- ChapterTool itself-->
    <h4>
      {{ t('site.tools.chapters.title') }}
    </h4>
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
  </article>
</template>

<style lang="sass" scoped>
.sortableTable
  display: grid
  grid-template-columns: auto 32px 32px 32px
</style>