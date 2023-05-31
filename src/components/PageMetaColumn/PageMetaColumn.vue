<script lang="ts" setup>
import FlowTimeCaption from '../content/FlowTimeCaption.vue'
import ProfileLink from '../profileLink/ProfileLink.vue'
import PageTagsSection from './PageTagsSection.vue'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  page: {
    key: string
    name: string
    author: string
    flowTime: number,
    tags: string[]
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
    <cn-card elevation="0">
      <section
        class="flex"
        style="margin-top: -12px"
      >
        <cyan-icon
          noun="card"
        /> 
        <h4

          class="downscaled"
        >
          {{ page.name }}
        </h4>
      </section>
      <cyan-toolbar>
        <ProfileLink :uid="page.author || ''" />
        <cyan-spacer />
        <FlowTimeCaption :flow-time="page.flowTime || 0" />
      </cyan-toolbar>
      <cyan-toolbar style="margin-bottom: -24px">
        <cyan-spacer />
        <router-link :to="`/sites/${site.key}/pages/${page.key}/revisions`">
          <cyan-button
            text
            :label="$t('page.revisions.title')"
          />
        </router-link>
      </cyan-toolbar>
    </cn-card>

    <PageTagsSection :page="page" />
  </article>
</template>