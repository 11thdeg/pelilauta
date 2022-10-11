<script lang="ts" setup>
import { useSession } from '../../../composables/useSession'
import { useSite } from '../../../composables/useSite'
import ShareButton from '../../actions/ShareButton.vue'

const { site } = useSite()
const { uid } = useSession()
</script>

<template>
  <div
    v-if="site"
    id="SiteTray"
  >
    <cyan-toolbar>
      <cyan-spacer />
      <ShareButton icon />
      <cyan-button
        v-if="site.hasOwner(uid)"
        text
        noun="adventurer"
      />
      <cyan-button
        v-if="site.hasOwner(uid)"
        text
        noun="tools"
      />
    </cyan-toolbar>
    {{ site }}
  </div>
</template>