<script lang="ts" setup>
import { computed } from 'vue'
import { useSession } from '../../composables/useSession'
import SiteAvatar from '../sites/SiteAvatar.vue'
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import SystemTag from '../actions/SystemTag.vue'

const props = defineProps<{
  site: {
    name: string;
    flowTime: number;
    systemBadge: string;
    description: string;
    avatarURL: string;
    posterURL: string;
    hasOwner: (u: string) => boolean;
    players?: string[];
    hidden: boolean;
  }
}>()

const { uid } = useSession()

function hasPlayer(key: string) {
  if (!props.site.players) return false
  return props.site.players.includes(key)
}
const cover = computed(() => {
  return props.site.posterURL || undefined
})
</script>

<template>
  <cyan-card
    elevation="1"
    :cover="cover"
  >
    <h3
      slot="title"
      class="downscaled"
    >
      {{ site.name }}
    </h3>
    <div slot="avatar">
      <SiteAvatar
        :large="cover"
        :site="site"
        class="siteAvatar"
      />
    </div>
    <p class="TypeBody2">
      {{ site.description }}
    </p>
    <cyan-toolbar small>
      <cyan-tag
        v-if="site.hasOwner(uid)"
        noun="avatar"
        label="GM"
      />
      <cyan-tag
        v-if="hasPlayer(uid)"
        noun="adventurer"
        label="PC"
      />
      <cyan-spacer />
      <FlowTimeCaption :flow-time="site.flowTime" />
      <SystemTag :system-family="site.systemBadge" />
    </cyan-toolbar>
  </cyan-card>
</template>

<style lang="sass" scoped>
.SiteCard
  display: block
  flex-grow: 0
  flex-shrink: 0
.hasPoster
  .cardPoster
    position: relative
    margin: -12px
    margin-bottom: 12px
    padding: 12px
    background-position: center
    background-size: cover
    border-radius: 12px 12px 0 0
    height: 72px
    .siteName
      position: absolute
      right: 12px
      bottom: 0
      width: calc(100% - 108px)
      text-align: right
      color: var(--chroma-secondary-i)
      text-shadow: 0px 0px 8px var(--chroma-secondary-c)
    .siteAvatar
      position: absolute
      bottom: -8px
      left: 12px
</style>