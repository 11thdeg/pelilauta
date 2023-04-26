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

const players = computed(() => {
  const o = site.value?.players || []
  if (typeof o === 'string') return [o]
  return o
})

const excluded = computed(() => {
  const p = players.value
  let o = site.value?.owners || []
  if (typeof o === 'string') o = [o]
  return [...o, ...p]
})

function removePlayer (e: string) {
  const o = players.value.filter((i) => i !== e)
  updateDoc(
    doc(
      getFirestore(),
      Site.collectionName,
      site.value?.key || ''
    ),
    {
      players: o
    }
  )
}

function addPlayer (e: string) {
  const o = players.value
  if (o.includes(e)) return
  o.push(e)
  updateDoc(
    doc(
      getFirestore(),
      Site.collectionName,
      site.value?.key || ''
    ),
    {
      players: o
    }
  )
}

</script>

<template>
  <article class="Column">
    <h3>{{ t('site.tools.players.title') }}</h3>

    <p class="TypeBody2 lowEmphasis">
      {{ t('site.tools.players.info') }}
    </p>

    <section class="currentPlayers">
      <ProfileListItem
        v-for="player in players"
        :key="player"
        :class="{'me': uid === player}"
        :uid="player"
      >
        <cyan-button
          text
          noun="trashcan"
          @click="removePlayer(player)"
        />
      </ProfileListItem>
    </section>

    <hr>

    <AccountSelect
      :exclude="excluded"
      @add-account="addPlayer($event)"
    />
  </article>
</template>

<style lang="sass">
.me
  background: var(--cyan-background-overlay-dark)
</style>