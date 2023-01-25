<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useSession, logout, register } from '../../composables/useSession'
import { useMetaPages } from '../../composables/useMeta'
import MarkdownSection from '../content/MarkdownSection.vue'
import { useI18n } from 'vue-i18n'
import { useSnack } from '../../composables/useSnack'
import { getAuth } from '@firebase/auth'
import { CyanDialog } from '@11thdeg/cyan'


const { t } = useI18n()
const { eulaMissing } = useSession()
const { pushSnack } = useSnack()
const dismissed = ref(false)

const dialog = ref<CyanDialog>()

const { pages } = useMetaPages()
const eula = computed(() => pages.value.get('eula'))

watch(eulaMissing, (value) => {
  if (value && !dismissed.value) {
    dialog.value?.showModal()
  }
}, { immediate: true })

const user = computed(() => {
  return getAuth().currentUser
})

async function accept() {
  dismissed.value = true
  dialog.value?.close()
  await register()
  pushSnack(t('account.registrationComplete'))
}

function decline() {
  dialog.value?.close()
  logout()
  dismissed.value = true
}

</script>

<template>
  <cn-dialog
    v-if="eula"
    ref="dialog"
    :title="eula.name"
  >
    <MarkdownSection :content="eula.markdownContent" />

    <template v-if="user">
      <img
        v-if="user.photoURL"
        class="avatarPreview"
        :src="user.photoURL"
        :alt="user.photoURL"
      >
      <p>{{ user.displayName }}</p>
    </template>

    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        text
        noun="logout"
        :label="t('action.logout')"
        @click="decline"
      />
      <cyan-button
        :label="t('action.accept')"
        @click="accept"
      />
    </cyan-toolbar>
  </cn-dialog>
</template>