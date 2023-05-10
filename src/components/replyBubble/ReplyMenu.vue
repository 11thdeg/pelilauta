<script lang="ts" setup>
import { useSession } from '../../composables/useSession'
import { EntryWithAuhtors, useFromMe } from '../../composables/useFromMe'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  reply: EntryWithAuhtors
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const { t } = useI18n()
const { fromMe } = useFromMe(props.reply)
const { admin } = useSession()

</script>
<template>
  <cyan-menu
    v-if="admin || fromMe"
    noun="kebab"
    small
    open-left
    style="z-index: 1000;"
  >
    <cyan-menu-item
      :secondary="!fromMe && admin"
      :noun="!fromMe && admin ? 'admin' : 'edit'"
      @click="emit('edit')"
    >
      {{ t('action.edit') }}
    </cyan-menu-item>
    <cyan-menu-item
      :secondary="!fromMe && admin"
      :noun="!fromMe && admin ? 'admin' : 'delete'"
      @click="emit('delete')"
    >
      {{ t('action.delete') }}
    </cyan-menu-item>
  </cyan-menu>
</template>