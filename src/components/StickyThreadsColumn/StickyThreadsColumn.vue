<script lang="ts" setup>
import { Thread } from '@11thdeg/skaldstore'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { collection, getFirestore, limit, onSnapshot, query, where, orderBy } from '@firebase/firestore'
import { logDebug } from '../../utils/logHelpers'
import ProfileLink from '../profileLink/ProfileLink.vue'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'



const route = useRoute()
let unsubscribe:CallableFunction|undefined

const streamThreads = ref<Thread[]>([])

onMounted(() => {
  watch(route, () => {
    if (route.params.streamkey) subscibe(route.params.streamkey as string || 'Yleinen')
    else subscibe('Yleinen')
  }, { immediate: true })
})

onUnmounted(() => {
  unsubscribe && unsubscribe()
})

function pushThreadToStream (thread:Thread) {
  const arr = [...streamThreads.value.filter(t => t.key !== thread.key)]
  arr.push(thread)
  streamThreads.value = [...arr].sort((a, b) => a.compareFlowTime((b as Thread)))
}

async function subscibe (topic: string) {
  unsubscribe && unsubscribe()
  streamThreads.value = []

  logDebug('StickyThreadsColumn', topic)

  if (!topic || typeof topic !== 'string') throw new Error('Invalid topic, must be a string.')

  const q = query(
    collection(
      getFirestore(),
      'stream'
    ),
    limit(7),
    where('sticky', '==', true),
    where('topic', '==', topic),
    orderBy('flowTime', 'desc')
  )

  unsubscribe = onSnapshot(q,
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          // streamThreads.value = streamThreads.value.filter(t => t.key !== change.doc.id)
        }
        else {
          const t = new Thread(change.doc.data(), change.doc.id)
          pushThreadToStream(t)
          logDebug('StickyThreadsColumn', t)
        }
      })
    },
    (error) => {
      console.error(error)
    }
  )
}

</script>

<template>
  <article class="Column small">
    <cyan-card
      v-if="streamThreads.length > 0"
      elevation="2"
    >
      <h4 slot="title">
        {{ $t('threads.sticky.title') }}
      </h4>
      <cyan-icon
        slot="avatar"
        noun="discussion"
      />
      <section
        v-for="t in streamThreads"
        :key="t.key"
        style="margin: 0 -6px; margin-bottom: 12px; padding: 6px; border-radius: 4px;"
        class="hoverable clickable"
      >
        <router-link :to="'/threads/'+t.key">
          <h4 class="downscaled">
            {{ t.title }}
          </h4>
          <div class="flex">
            <ProfileLink :uid="t.author" />
            <cyan-spacer />
            <FlowTimeCaption :flow-time="t.flowTime" />
          </div>
        </router-link>
      </section>
    </cyan-card>
  </article>
</template>