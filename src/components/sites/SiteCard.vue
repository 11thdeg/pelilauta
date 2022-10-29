<script lang="ts" setup>
import { computed } from 'vue'
import { useSession } from '../../composables/useSession'
import SiteAvatar from './SiteAvatar.vue'
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

const icon = computed(() => {
  return props.site.systemBadge ? props.site.systemBadge : 'adventurer'
})
const posterStyle = computed(() => {
  return props.site.posterURL ? `background-image: url(${props.site.posterURL})` : ''
})
function hasPlayer(key: string) {
  if (!props.site.players) return false
  return props.site.players.includes(key)
}
/*
const visibleNoun = computed(() => {
  if (props.site.hidden) return 'eye-closed'
  return 'eye-open'
})
*/
</script>

<template>
  <article
    class="card rise-a SiteCard"
    :class="{ 
      hasPoster: !!props.site.posterURL,
      hasAvatar: !!props.site.avatarURL
    }"
  >
    <div
      v-if="!!props.site.posterURL"
      class="cardPoster"
      :style="posterStyle"
    >
      <h3 class="siteName">
        {{ site.name }}
      </h3>
      <SiteAvatar
        :site="site"
        class="siteAvatar"
      />
    </div>
    <template v-else>
      <cyan-toolbar>
        <cyan-icon :noun="icon" />
        <h3>{{ site.name }}</h3>
      </cyan-toolbar>
    </template>
    <p class="TypeBody2">
      {{ site.description }}
    </p>
    <cyan-toolbar small>
      <!--cyan-icon
        style="opacity: 0.44;"
        xsmall
        :noun="visibleNoun"
      /-->
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
  </article>
</template>

<style lang="sass" scoped>
.SiteCard
  width:330px
  flex-grow: 0
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