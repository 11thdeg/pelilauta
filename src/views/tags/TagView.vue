<script lang="ts" setup>
import { useRouter } from 'vue-router'
import WithLoader from '../../components/ui/WithLoader.vue'
import { useSession } from '../../composables/useSession'
import WithPermission from '../../components/ui/WithPermission.vue'
import { ref } from 'vue'
import { TagInfo } from '@11thdeg/skaldstore'
import { onMounted, watch } from 'vue'
import { collection, getDocs, getFirestore, query, where } from '@firebase/firestore'
import TagEntryItem from '../../components/tags/TagEntryItem.vue'

const props = defineProps<{
  tagkey: string;
}>()

const { anonymous, active } = useSession()

const router = useRouter()

const entries = ref(new Array<TagInfo>())

onMounted(() => {
  watch(anonymous, async (anon) => {
    if (!anon) {
      const q = query(collection(getFirestore(), TagInfo.collectionName), where('tags', 'array-contains', props.tagkey))
      const docs = await getDocs(q)
      const s = new Array<TagInfo>()
      docs.forEach(doc => {
        s.push(new TagInfo(doc.id, doc.data()))
      })
      s.sort((a, b) => {
        return a.entryTitle.localeCompare(b.entryTitle)
      })
      entries.value = s
    }
  }, { immediate: true })
})

</script>

<template>
  <div id="TagView">
    <cn-app-bar
      id="TopBar"
      modal
      :title="$t('tag.title') + ' ' + tagkey"
      @back="router.back()"
    />
    <main class="container">
      <WithLoader :suspended="!active">
        <WithPermission :forbidden="anonymous">
          <article class="auto wd-large column">
            <TagEntryItem
              v-for="entry in entries"
              :key="entry.key"
              :tagkey="tagkey"
              :entry="entry"
            />
          </article>
        </WithPermission>
      </WithLoader>
    </main>
  </div>
</template>