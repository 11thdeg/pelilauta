<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'

const props = defineProps<{
  thread: {
    key?: string,
    hasOwner: (uid: string) => boolean
  }
}>()

const { t } = useI18n()
const { uid, admin } = useSession()
const fromMe = computed(() => props.thread.hasOwner(uid.value || ''))
</script>

<template>
  <cyan-menu noun="kebab">
    <cyan-menu-item
      v-if="fromMe"
      noun="edit"
      @click="$router.push('/threads/' + thread.key + '/edit')"
    >
      {{ t('thread.edit') }}
    </cyan-menu-item>
    <cyan-menu-item
      v-if="fromMe"
      noun="delete"
      :title="t('thread.delete')"
      @click="$router.push('/threads/' + thread.key + '/delete')"
    >
      {{ t('thread.delete') }}
    </cyan-menu-item>
    <cyan-menu-item
      v-if="admin"
      secondary
      noun="admin"
      @click="$router.push('/admin/threads/' + thread.key)"
    >
      {{ t('action.delete') }}
    </cyan-menu-item>
  </cyan-menu>
</template>