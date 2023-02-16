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
const { key, canEdit, site } = useSite()
const router = useRouter()

const props = defineProps<{
  homepage?: boolean
}>()

const content = ref('')
onMounted(() => {
  watch(page, (p) => {
    content.value = useContentEntry(p).content.value
    if (!content.value) {
      logError('PageArticle', 'No content found for page, likely a legacy issue', p)
      content.value = '...'
    }
  }, { immediate: true })
})

function toCreatePage() {
  if (props.homepage) return
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
        v-if="notFound && !homepage"
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
      <EmptyCollection
        v-else-if="notFound && homepage"
        :noun="site?.systemBadge || 'mekanismi'"
        :title="t('site.welcome.title')"
        :message="t('site.welcome.message')"
      />
      <div
        v-else
        :innerHTML="content"
      />
    </WithLoader>
  </article>
</template>