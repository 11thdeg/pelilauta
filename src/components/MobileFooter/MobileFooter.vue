<script setup lang="ts">
import { useScreenSize } from '../../composables/useScreenSize'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'

/**
 * Some rarely used functionality and links are not visible on mobile navigation, these
 * can be accessed via the mobile footer.
 */

const { isSmall } = useScreenSize()
const route = useRoute()
const { t } = useI18n()
const { admin } = useSession()
</script>

<template>
  <div
    v-if="isSmall"
    class="flex flex-column border-top"
  >
    <router-link
      to="/forum" 
      class="button tray-button"
    >
      <cyan-icon
        noun="discussion"
        :active="route.path.startsWith('/forum')"
      />
      {{ t('forum.title') }}
    </router-link>

    <router-link
      to="/admin"
      class="button tray-button"
    >
      <cyan-icon
        v-if="admin"
        noun="admin"
        :active="route.path.startsWith('/admin/settings')"
      />
      {{ t('admin.title') }}
    </router-link>
  </div>
</template>