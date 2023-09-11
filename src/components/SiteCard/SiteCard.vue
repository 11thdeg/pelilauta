<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { useSession } from '../../composables/useSession'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import LoveASiteButton from './LoveASiteButton.vue'

const props = defineProps<{
  site: {
    key: string;
    name: string;
    flowTime: number;
    systemBadge: string;
    description: string;
    avatarURL: string;
    posterURL: string;
    hasOwner: (u: string) => boolean;
    players?: string[];
    hidden: boolean;
    lovesCount?: number;
  },
  hideControls?: boolean
}>()

const { site, hideControls } = toRefs(props)

const { uid } = useSession()

function hasPlayer(key: string) {
  if (!props.site.players) return false
  return props.site.players.includes(key)
}
const cover = computed(() => {
  return props.site.posterURL || undefined
})
const noun = computed(() => {
  if (props.site.systemBadge) return props.site.systemBadge
  return 'homebrew'
})

</script>

<template>
  <cn-card
    class="SiteCard"
    elevation="1"
    :title="site.name"
    :cover="cover"
    :noun="noun"
    :link="`/sites/${site.key}`"
    :snippet="site.description"
  >
    <cyan-toolbar
      v-if="!hideControls"
      slot="actions"
    >
      <cyan-icon
        v-if="site.hidden"
        noun="lock"
        style="opacity:0.55"
      />
      <LoveASiteButton
        v-else
        :site="site"
      />    
      <cyan-icon
        v-if="hasPlayer(uid)"
        noun="adventurer"
        style="opacity:0.55"
      />
      <cyan-icon
        v-if="site.hasOwner(uid)"
        noun="avatar"
        style="opacity:0.55"
      />
      <cyan-spacer /> 
      <FlowTimeCaption :flow-time="site.flowTime" />
    </cyan-toolbar>
  </cn-card>
</template>
