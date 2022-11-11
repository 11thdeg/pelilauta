<script lang="ts" setup>
import { Account, Profile } from '@11thdeg/skaldstore'
import { deleteDoc, doc, getFirestore } from '@firebase/firestore'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSession, logout } from '../../composables/useSession'
import { useSnack } from '../../composables/useSnack'
import { logError, logEvent } from '../../utils/logHelpers'
import Dialog from '../ui/Dialog.vue'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { t } = useI18n()
const { pushSnack } = useSnack()
const router = useRouter()

const open = computed({
  get: () => props.modelValue,
  set: (value:boolean) => emit('update:modelValue', value)
})

const verifyToken = ref('')

async function deleteAccountPermanently() {
  if (verifyToken.value === 'DELETE') {
    const uid = useSession().uid.value
    try {
      await deleteDoc(
        doc(
          getFirestore(),
          Profile.collectionName,
          uid
        )
      )
      logEvent('delete_profile', { uid: uid })

      await deleteDoc(
        doc(
          getFirestore(),
          Account.collectionName,
          uid
        )
      )
      logEvent('delete_account', { uid: uid })
    } catch (error) {
      logError('delete_account', error)
      pushSnack(t('settings.deleteAccount.error'))
      open.value = false
    }

    await logout()

    open.value = false
    pushSnack(t('settings.deleteAccount.success'))
    router.push('/')
  }
}
</script>

<template>
  <Dialog
    v-model="open"
    :label="t('verifyAccountDeletion.title')"
  >
    <p class="TypeBody2">
      {{ t('verifyAccountDeletion.info') }}
    </p>
    <cyan-textfield
      :label="t('verifyAccountDeletion.verifyToken')"
      @change="verifyToken = $event.target.value"
    />
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        :label="t('action.cancel')"
        text
        @click="open = false"
      />
      <cyan-button
        :disabled="verifyToken !== 'DELETE'"
        :label="t('action.delete')"
        @click="deleteAccountPermanently"
      />
    </cyan-toolbar>
  </Dialog>
</template>