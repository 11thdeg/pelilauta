
<script lang="ts" setup>
import { Account, Profile } from '@11thdeg/skaldstore'
import { collection, getFirestore, onSnapshot } from '@firebase/firestore'
import { computed } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useMeta } from '../../../composables/useMeta'
import { logDebug } from '../../../utils/logHelpers'
import { toDisplayString } from '../../../utils/toDisplayString'

const accounts = ref(new Map<string, Account>())
const profiles = ref(new Map<string, Profile>())

let _unsubscribeAccounts:CallableFunction|undefined
let _unsubscribeProfiles:CallableFunction|undefined

onMounted(() => {
  // init composable
  subscibeAccounts()
  subscribeProfiles()
})

onUnmounted(() => {
  // init composable
  _unsubscribeAccounts && _unsubscribeAccounts()
  _unsubscribeProfiles && _unsubscribeProfiles()
})

async function subscibeAccounts() {
  _unsubscribeAccounts = onSnapshot(
    collection(
      getFirestore(),
      Account.collectionName
    ),
    (snap) => {
      snap.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          accounts.value.delete(change.doc.id)
        }
        else {
          const a = new Account(change.doc.data())
          a.docData = change.doc.data()
          accounts.value.set(change.doc.id, a)  
          logDebug('Account added', change.doc.id, change.doc.data().lastLogin) 
        }
      })
    }
  )
}

interface UserData {
  uid: string
  account?: Account
  profile?: Profile
}

const users = computed(():UserData[] => {
  const keys = new Set([...accounts.value.keys(), ...profiles.value.keys()])
  const ua = Array.from(keys).map((key) => {
    const account = accounts.value.get(key)
    const profile = profiles.value.get(key)
    return {
      uid: key,
      account,
      profile
    }
  })
  ua.sort((a, b) => {
    if (a.account && b.account) {
      return (a.account?.lastLogin?.seconds || 0) > (b.account?.lastLogin?.seconds || 0) ? -1 : 1
    }
    return 0
  })
  return ua
})

async function subscribeProfiles() {
  _unsubscribeAccounts = onSnapshot(
    collection(
      getFirestore(),
      Profile.collectionName
    ),
    (snap) => {
      snap.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          profiles.value.delete(change.doc.id)
        }
        else {
          profiles.value.set(change.doc.id, new Profile(change.doc.data(), change.doc.id))  
        }
      })
    }
  )
}

const { admins, frozen } = useMeta()

function isAdmin(uid:string) {
  return admins.value.includes(uid)
}

function isFrozen(uid:string) {
  return frozen.value.includes(uid)
}

</script>


<template>
  <article class="column large">
    <h3>User Tool</h3>
    <div
      v-for="user in users"
      :key="user.uid"
      class="userLine"
    >
      <div
        class="userPhoto"
      >
        <img
          :src="user.profile?.avatarURL"
          class="userPhoto"
          onerror="this.style.display='none'"
        >
      </div>
      <p>{{ user.profile?.nick || 'anonymous' }}</p>
      <div class="useInfo">
        <p class="TypeCaption">
          {{ toDisplayString(user.account?.lastLogin) }}
        </p>
        <p class="TypeCaption">
          {{ user.uid }}
        </p>
      </div>
      <cyan-button
        :text="!isFrozen(user.uid)"
        noun="delete"
      />
      <cyan-button
        :text="!isAdmin(user.uid)"
        noun="admin"
      />
      <cyan-button
        :disabled="isAdmin(user.uid)"
        text
        noun="trashcan"
      />
    </div>
  </article>
</template>

<style lang="sass">
.userLine
  display: flex
  align-items: center
  margin-bottom: 1rem
  gap: 8px
  .userPhoto, .userPhoto img
    width: 2rem
    height: 2rem
    border-radius: 50%
    background-color: var(--chroma-primary-e)
  .useInfo
    margin-left: auto
    text-align: right
</style>