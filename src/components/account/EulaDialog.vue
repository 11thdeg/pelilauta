<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSession, logout, register } from '../../composables/useSession'
import { useMetaPages } from '../../composables/useMeta'
import Dialog from '../ui/Dialog.vue'
import MarkdownSection from '../content/MarkdownSection.vue'
import { useI18n } from 'vue-i18n'
import { useSnack } from '../../composables/useSnack'
import { getAuth } from '@firebase/auth'

const { t } = useI18n()
const { eulaMissing } = useSession()
const { pushSnack } = useSnack()
const dismissed = ref(false)

const { pages } = useMetaPages()
const eula = computed(() => pages.value.get('eula'))

const showDialog = computed({
  get() {
    return eulaMissing.value && !dismissed.value
  },
  set(value) {
    dismissed.value = !value
  }
})

const user = computed(() => {
  return getAuth().currentUser
})

async function accept() {
  dismissed.value = true
  await register()
  pushSnack(t('account.registrationComplete'))
}

function decline() {
  logout()
  dismissed.value = true
}

</script>

<template>
  <Dialog
    v-model="showDialog"
    label="EULA!!"
  >
    <template v-if="eula">
      <MarkdownSection :content="eula.markdownContent" />
    </template>

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
  </Dialog>
</template>