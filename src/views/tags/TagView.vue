<script lang="ts" setup>
import { useRouter } from 'vue-router'
import WithLoader from '../../components/ui/WithLoader.vue'
import { useSession } from '../../composables/useSession'
import WithPermission from '../../components/ui/WithPermission.vue'
import { ref } from 'vue'
import { Site } from '@11thdeg/skaldstore'
import { onMounted, watch } from 'vue'
import { collection, getDocs, getFirestore, query, where } from '@firebase/firestore'

const props = defineProps({
  tag: {
    type: String,
    required: true
  }
})

const { anonymous, active } = useSession()

const router = useRouter()

const sites = ref(new Array<Site>())

onMounted(() => {
  watch(anonymous, async (anon) => {
    if (!anon) {
      const q = query(collection(getFirestore(), Site.collectionName), where('tags', 'array-contains', props.tag))
      const docs = await getDocs(q)
      const s = new Array<Site>()
      docs.forEach(doc => {
        s.push(new Site(doc, doc.id))
      })
      s.sort((a, b) => {
        return a.flowTime - b.flowTime
      })
      sites.value = s
    }
  }, { immediate: true })
})

</script>

<template>
  <div id="TagView">
    <cyan-top-app-bar
      id="TopBar"
      modal
      back
      @back="router.back()"
    >
      <h2>{{ $t('tag.title') }}</h2>
    </cyan-top-app-bar>
    <main class="bookLayout">
      <WithLoader :suspended="!active">
        <WithPermission :forbidden="anonymous">
          <article class="Column">
            {{ sites }}
          </article>
        </WithPermission>
      </WithLoader>
    </main>
  </div>
</template>