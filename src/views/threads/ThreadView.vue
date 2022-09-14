<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore';
import { computed, onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { fetchThread } from '../../composables/useThreads';
import TopBar from '../../components/ui/TopBar.vue';

const props = defineProps<{
  threadkey: string
}>()
const { t } = useI18n()
const thread:Ref<Thread|undefined> = ref(undefined)

onMounted(async () => {
  if (props.threadkey) thread.value = await fetchThread(props.threadkey)
})

const title = computed(() => {
  if (!thread.value) return t('threads.loading')
  return thread.value.title
})
</script>

<template>
  <div class="ThreadView">
    <TopBar :title="title" sticky />
    <main class="bookLayout">
      <cyan-loader v-if="!thread" />
      <template v-else>
        <article>{{ thread.htmlContent }}</article>
      </template>
      <article class="code">{{ threadkey }}</article>
    </main>
  </div>
</template>