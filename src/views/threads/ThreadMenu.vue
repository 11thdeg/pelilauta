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
const showForAdmin = computed(() => !fromMe.value && admin.value)
</script>

<template>
  <cyan-menu
    v-if="admin || fromMe"
    noun="kebab"
  >
    <cyan-menu-item
      v-if="fromMe || admin"
      :secondary="showForAdmin"
      :noun="showForAdmin ? 'admin' : 'edit'"
      @click="$router.push('/threads/' + thread.key + '/edit')"
    >
      {{ t('action.edit') }}
    </cyan-menu-item>
    <cyan-menu-item
      v-if="fromMe || admin"
      :secondary="showForAdmin"
      :noun="showForAdmin ? 'admin' : 'edit'"
      :title="t('action.delete')"
      @click="$router.push('/threads/' + thread.key + '/delete')"
    >
      {{ t('action.delete') }}
    </cyan-menu-item>
  </cyan-menu>
</template>