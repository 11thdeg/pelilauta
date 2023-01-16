<!-- eslint-disable vue/max-attributes-per-line -->
<script lang="ts" setup>
import { useSite } from '../../composables/useSite'
import ProfileTag from '../profiles/ProfileTag.vue'
import WithLoader from '../ui/WithLoader.vue'

const { site, loading } = useSite()
</script>

<template>
  <section style="align-self: flex-start;">
    <WithLoader
      small
      :suspended="loading"
    >
      <h4
        class="downscaled"
        style="margin: 0"
      >
        {{ $t('site.tools.owners.title') }}
      </h4>
      <ProfileTag
        v-for="admin in site?.owners"
        :key="admin"
        :uid="admin"
      />
    </WithLoader>
  </section>
</template>
