<script setup lang="ts">
import { Reply } from '@11thdeg/skaldstore'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchReply } from '../../composables/useDiscussion'
import { threadSnippet } from '../../utils/threadSnippet'
import ProfileTag from '../profiles/ProfileTag.vue'

const props = defineProps<{
  threadkey: string,
  replykey: string
}>()

const { t } = useI18n()

const loading = ref(true)
const unavailable = ref(false)
const reply = ref(new Reply())

onMounted(async() => {
  const r = await fetchReply(props.threadkey, props.replykey)
  if (r) reply.value = r
  else unavailable.value = true
  loading.value = false
})
</script>

<template>
  <section class="QuotedResponseSection">
    <cyan-loader
      v-if="loading"
      inline
    />
    <template v-else>
      <template v-if="unavailable">
        {{ t('reply.quote.unavailable') }}
      </template>
      <template v-else>
        <span class="author"><ProfileTag :uid="reply.author" /></span>
        <span class="snippet">{{ threadSnippet(reply) }}</span>
      </template>
    </template>
  </section>
</template>

<style lang="sass" scoped>
.QuotedResponseSection
  margin: 0
  margin-bottom: 12px
  padding: 12px
  border: solid 1px var(--chroma-primary-g)
  border-radius: 12px
  background-color: var(--cyan-bubble-background-color-b)
</style>