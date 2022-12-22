<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useContentEntry } from '../../composables/useContentEntry'
import { usePage } from '../../composables/usePage'
import { useSite } from '../../composables/useSite'
import { logError } from '../../utils/logHelpers'
import EmptyCollection from '../ui/EmptyCollection.vue'
import WithLoader from '../ui/WithLoader.vue'

const { t } = useI18n()
const { key: pageKey, page, loading, notFound } = usePage()
const { key, canEdit } = useSite()
const router = useRouter()

const content = ref('')
onMounted(() => {
  watch(page, (p) => {
    content.value = useContentEntry(p).content.value
    if (!content.value) logError('PageArticle', 'No content found for page, likely a legacy issue', p)
  }, { immediate: true })
})

function toCreatePage() {
  if (!canEdit.value) return
  router.push(`/sites/${key.value}/add/page${pageKey.value === key.value ? '/' + pageKey.value : ''}`)
}

</script>

<template>
  <article class="PageArticle Column large">
    <WithLoader
      :suspended="loading"
    >
      <EmptyCollection
        v-if="notFound"
        noun="page"
        :title="t('page.notFound.title')"
        :message="t('page.notFound.message')"
      >
        <cyan-button
          :disabled="!canEdit"
          :label="t('action.add.new')"
          noun="page"
          text
          @click="toCreatePage"
        />
      </EmptyCollection>
      <div
        v-else
        :innerHTML="content"
      />
    </WithLoader>
  </article>
</template>