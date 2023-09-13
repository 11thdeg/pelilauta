<!-- eslint-disable vue/max-attributes-per-line -->
<script lang="ts" setup>
import { computed } from 'vue'
import { useSite } from '../../composables/useSite'
import ProfileTag from '../profiles/ProfileTag.vue'

const { site } = useSite()

const owners = computed(() => Array.isArray(site.value?.owners) ? site.value?.owners : [site.value?.owners || ''])
</script>

<template>
  <section class="my-2">
    <h4
      class="downscaled underscore"
    >
      {{ $t('site.tools.owners.title') }}
    </h4>
    <p>
      <ProfileTag
        v-for="admin in owners"
        :key="admin"
        :uid="admin"
      />
    </p>
  </section>
</template>
