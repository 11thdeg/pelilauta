<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useContentEntry } from '../../composables/useContentEntry'
import { usePage } from '../../composables/usePage'
import { useSite } from '../../composables/useSite'
import EmptyCollection from '../ui/EmptyCollection.vue'

const { t } = useI18n()
const { key: pageKey, page, loading, notFound } = usePage()
const { key } = useSite()
const content = ref('')
onMounted(() => {
  watch(page, (p) => {
    content.value = useContentEntry(p).content.value
  }, { immediate: true })
})

</script>

<template>
  <article
    class="Column large"
  >
    <template v-if="loading">
      <cyan-loader large />
    </template>
    <template v-else-if="notFound">
      <EmptyCollection
        noun="page"
        :title="t('page.notFound.title')"
        :message="t('page.notFound.message') + ' ' + pageKey"
      >
        <cyan-button
          :label="t('action.add.new')"
          noun="page"
          text
          @click="$router.push(`/sites/${key}/add/page${pageKey === key ? '/' + pageKey : ''}`)"
        />
      </EmptyCollection>
    </template>
    <template v-else-if="page">
      <div
        :innerHTML="content"
      />
    </template>
  </article>
</template>