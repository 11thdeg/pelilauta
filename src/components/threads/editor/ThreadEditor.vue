<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMeta } from '../../../composables/useMeta'
import MarkdownSection from '../../content/MarkdownSection.vue'
import YoutubePreview from '../../content/YoutubePreview.vue'

const { t } = useI18n()

const { streams } = useMeta()
const topics = computed(() => streams.value.map(stream => { return { value: stream.slug, label: stream.name } }))
const chosenTopic = computed(() => 'Yleinen')

const videolink = ref(false)
const preview = ref(false)

const thread = ref(new Thread())
</script>

<template>
  <div class="Column form double">
    <template v-if="!preview">
      <cyan-toolbar>
        <div style="flex-grow: 1">
          <cyan-textfield
            :label="t('fields.thread.name')"
            @change="thread.title = $event.detail"
          />
        </div>
        <cyan-button
          text
          noun="youtube"
          :disabled="videolink"
          @click="videolink = true"
        />
        <cyan-button
          text
          noun="asset"
        />
      </cyan-toolbar>
      <cyan-toolbar v-if="videolink || thread.youtubeId">
        <cyan-icon noun="youtube" />
        <div style="flex-grow: 1">
          <cyan-textfield
            :label="t('fields.thread.youtubeId')"
            @change="thread.youtubeId = $event.detail"
          />
        </div>
        <cyan-button
          text
          :label="t('action.remove')"
          @click="videolink = false; thread.youtubeId = ''"
        />
      </cyan-toolbar>
      <cyan-markdown-area
        :label="t('fields.thread.content')"
        @change="thread.markdownContent = $event.detail"
      />
      <cyan-toolbar>
        <cyan-select
          :options="topics"
          :value="chosenTopic"
          :label="t('fields.thread.topic')"
          @change="thread.topicid = $event.target.value"
        />
        <cyan-spacer />
        <cyan-button
          :label="t('action.cancel')"
          text
        />
        <cyan-button
          :label="t('action.preview')"
          text
          noun="eye"
          @click="preview = true"
        />
        <cyan-button
          :label="t('action.send')"
          noun="send"
        />
      </cyan-toolbar>
    </template>
    <template v-else>
      <h1>{{ thread.title }}</h1>
      <YoutubePreview
        v-if="thread.youtubeId"
        :video-id="thread.youtubeId"
      />
      <p class="typeCaption">
        {{ thread.author }}, {{ thread.topicid }}
      </p>
      <MarkdownSection :content="thread.markdownContent" />
    </template>
  </div>
</template>