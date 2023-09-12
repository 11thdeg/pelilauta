<script lang="ts" setup>
import MovePageTool from '../../components/MovePageTool.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { usePage } from '../../composables/usePage'
import { useSite } from '../../composables/useSite'
import { useRouter } from 'vue-router'

const props = defineProps<{
  sitekey: string;
  pagekey: string;
}>()

const router = useRouter()

// eslint-disable-next-line vue/no-setup-props-destructure
const { canEdit } = useSite()
// eslint-disable-next-line vue/no-setup-props-destructure
const { loading } = usePage(props.pagekey, props.sitekey)

</script>

<template>
  <div id="MovePageView">
    <cn-app-bar
      id="TopBar"
      modal
      :title="$t('page.move.title')"
      @back="() => router.push(`/sites/${props.sitekey}/pages/${props.pagekey}`)"
    />
    <main class="bookLayout">
      <WithLoader :suspended="loading">
        <WithPermission :forbidden="!canEdit">
          <MovePageTool
            :sitekey="props.sitekey"
            :pagekey="props.pagekey"
          />
        </WithPermission>
      </WithLoader>
    </main>
  </div>
</template>
