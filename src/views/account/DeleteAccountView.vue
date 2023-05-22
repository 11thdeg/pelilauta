<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSession, logout } from '../../composables/useSession'
import { useSnack } from '../../composables/useSnack'
import { deleteDoc, doc, getFirestore } from '@firebase/firestore'
import { Account, Profile } from '@11thdeg/skaldstore'
import { logEvent, logError } from '../../utils/logHelpers'
import DeleteConfirmForm from '../../components/DeleteConfirmForm/DeleteConfirmForm.vue'

const { pushSnack } = useSnack()
const router = useRouter()

const verifyToken = ref(false)

async function deleteAccountPermanently() {
  if (verifyToken.value) {
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
      pushSnack('settings.deleteAccount.error')
    }

    await logout()

    pushSnack('snacks.deleteAccount.success')
    router.push('/')
  }
}
</script>

<template>
  <cyan-top-app-bar
    modal
    back
    @back="router.back()"
  >
    <h3>{{ $t('settings.dangerousDeleteAccountAction') }}</h3>
  </cyan-top-app-bar>
  <main class="bookLayout">
    <article class="Column">
      <DeleteConfirmForm
        v-model="verifyToken"
        confirm-text="Poista Tunnukseni Pysyvästi"
        :title="$t('verifyAccountDeletion.title')"
        :message="$t('verifyAccountDeletion.info')"
      />
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          :label="$t('action.cancel')"
          text
          @click="router.back()"
        />
        <cyan-button
          :disabled="!verifyToken"
          :label="$t('action.delete')"
          @click="deleteAccountPermanently"
        />
      </cyan-toolbar>
    </article>
  </main>
</template>