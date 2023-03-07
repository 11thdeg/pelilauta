<script lang="ts" setup>
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ProfileLink from '../profileLink/ProfileLink.vue'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  page: {
    key: string
    name: string
    author: string
    flowTime: number
  }
  site: {
    key: string
  }
}>()

</script>

<template>
  <article
    class="small Column"
  >
    <cyan-card>
      <cyan-icon
        slot="avatar"
        noun="card"
      /> 
      <h4
        slot="title"
        class="downscaled"
      >
        {{ page.name }}
      </h4>
      <cyan-toolbar>
        <ProfileLink :uid="page.author || ''" />
        <cyan-spacer />
        <FlowTimeCaption :flow-time="page.flowTime || 0" />
      </cyan-toolbar>
      <cyan-toolbar>
        <cyan-spacer />
        <router-link :to="`/sites/${site.key}/pages/${page.key}/revisions`">
          <cyan-button
            text
            :label="$t('page.revisions.title')"
          />
        </router-link>
      </cyan-toolbar>
    </cyan-card>
  </article>
</template>