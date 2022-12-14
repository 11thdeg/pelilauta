<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { doc, getFirestore, updateDoc } from '@firebase/firestore'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../../composables/useSession'
import { useSite } from '../../../composables/useSite'
import AccountSelect from '../../accountselect/AccountSelect.vue'
import ProfileListItem from '../../profilelistitem/ProfileListItem.vue'

const { t } = useI18n()
const { uid } = useSession()

const { site } = useSite()
const owners = computed(() => {
  const o = site.value?.owners || []
  if (typeof o === 'string') return [o]
  return o
})

function removeOwner (e: string) {
  const o = owners.value.filter((i) => i !== e)
  updateDoc(
    doc(
      getFirestore(),
      Site.collectionName,
      site.value?.key || ''
    ),
    {
      owners: o
    }
  )
}

function addOwner (e: string) {
  const o = owners.value
  if (o.includes(e)) return
  o.push(e)
  updateDoc(
    doc(
      getFirestore(),
      Site.collectionName,
      site.value?.key || ''
    ),
    {
      owners: o
    }
  )
}

</script>

<template>
  <article class="Column">
    <cyan-card elevation="1">
      <h3>{{ t('site.tools.owners.title') }}</h3>

      <p class="TypeBody2 lowEmphasis">
        {{ t('site.tools.owners.info') }}
      </p>

      <section class="currentOwners">
        <ProfileListItem
          v-for="owner in owners"
          :key="owner"
          :class="{'me': uid === owner}"
          :uid="owner"
        >
          <cyan-button
            :disabled="uid === owner"
            text
            noun="trashcan"
            @click="removeOwner(owner)"
          />
        </ProfileListItem>
      </section>

      <hr>

      <AccountSelect
        noun="admin"
        :exclude="owners"
        @add-account="addOwner($event)"
      />
    </cyan-card>
  </article>
</template>

<style lang="sass">
.me
  background: var(--cyan-background-overlay-dark)
</style>