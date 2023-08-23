<script setup lang="ts">
import { Thread } from '@11thdeg/skaldstore'
import { collection, getDocs, getFirestore, limit, orderBy, query, where } from '@firebase/firestore'
import { onMounted, ref } from 'vue'
import FlowTimeCaption from '../../content/FlowTimeCaption.vue'
import ProfileLink from '../../profileLink/ProfileLink.vue'
import ProfileAvatar from '../../ProfileAvatar/ProfileAvatar.vue'

const thread = ref(new Thread())
const loading = ref(true)
const notFound = ref(false)

const props = defineProps<{
  topic: string
}>()

onMounted(async () => {
  const q = query(
    collection(getFirestore(), Thread.collectionName),
    where('topic', '==', props.topic),
    orderBy('flowTime', 'desc'),
    limit(1)
  )
  const threadDocs = await getDocs(q)

  if (threadDocs.empty) {
    loading.value = false
    notFound.value = true
    return
  }

  thread.value = new Thread(threadDocs.docs[0].data(), threadDocs.docs[0].id)
  loading.value = false
})

</script>

<template>
  <div
    v-if="!loading && !notFound"
    class="LatestPost flex flex-no-wrap items-center"
  >
    <ProfileAvatar :uid="thread.author" />
    <div>
      <p
        class="TypeBody2 my-0 oneLiner"
      >
        <router-link
          :to="`/threads/${thread.key}`"
        >
          {{ thread.title }}
        </router-link>
      </p>
      <p class="TypeCaption flex-shrink">
        <ProfileLink :uid="thread.author" /> - 
        <FlowTimeCaption :flow-time="thread.flowTime" /> - 
      </p>
    </div>
  </div>
</template>
