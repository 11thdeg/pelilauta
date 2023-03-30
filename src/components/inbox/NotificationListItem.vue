<script lang="ts" setup>
import { Notification } from '@11thdeg/skaldstore'
import { deleteDoc, doc, getFirestore, updateDoc } from '@firebase/firestore'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchSite } from '../../composables/useSites'
import { fetchThread } from '../../composables/useThreads'
import ProfileLink from '../profileLink/ProfileLink.vue'

const props = defineProps<{
  notification: Notification
}>()

const { t } = useI18n()
const typeNoun = ref('discussion')

const noun = computed(() => {
  return typeNoun.value
  // return props.notification.read ? 'dot' : typeNoun.value
})

const targetTitle = ref('')
const targerRoute = ref('')

onMounted(async () => {
  if (props.notification.targetType.startsWith('thread')) {
    const thread = await fetchThread(props.notification.targetKey)
    targetTitle.value = thread? thread.title : t('thread.deleted')
    targerRoute.value = `/threads/${props.notification.targetKey}`
  }
  if (props.notification.targetType.startsWith('site')) {
    const site = await fetchSite(props.notification.targetKey)
    targetTitle.value = site? site.name : t('site.deleted')
    targerRoute.value = `/sites/${props.notification.targetKey}`
  }
  if (props.notification.targetType.endsWith('loved')) {
    typeNoun.value = 'love'
  }
  if (props.notification.targetType.startsWith('reply')) {
    const keys = props.notification.targetKey.split('/')
    const thread = await fetchThread(keys[0])
    targetTitle.value = thread? thread.title : t('thread.deleted')
    targerRoute.value = `/threads/${keys[0]}/replies/${keys[1]}`
  }
})

function markRed() {
  updateDoc(
    doc(
      getFirestore(),
      Notification.collectionName,
      props.notification.key
    ),
    { read: true }
  )
}

function removeNotification() {
  deleteDoc(
    doc(
      getFirestore(),
      Notification.collectionName,
      props.notification.key
    )
  )
}
</script>

<template>
  <div
    class="NotificationListItem flex flex-no-wrap"
    :class="{
      unread: !notification.read,
      hoverable: !notification.read,
      clickable: !notification.read
    }"
    @click="markRed"
  >
    <cyan-icon
      class="NotificationIcon"
      :class="{red: notification.read}"
      small
      :noun="noun"
    />
    <div>
      <h4 class="TypeCaption">
        <router-link :to="targerRoute">
          {{ targetTitle }}
        </router-link>
      </h4>
      <p class="TypeBody2 oneLiner">
        <ProfileLink
          class="elevated"
          :uid="notification.from"
        />
        {{ t(notification.message) }}
      </p>
    </div>
    <cyan-spacer />
    <cyan-button
      text
      noun="delete"
      @click.stop="removeNotification"
    />
  </div>
</template>

<style lang="sass">
.NotificationListItem
  border-radius: 6px
  padding: 0 12px
  &.unread
    border-left: 4px solid var(--cyan-divider-color)
    padding-left: 8px
    background: hsla(var(--chroma-secondary-f-hsl), 0.11)
  p
    margin: 0
  .red
    opacity: 0.2
  span.elevated
    font-weight: 600
    background-color: hsla(var(--chroma-secondary-f-hsl), 0.22)
    padding: 0 6px
    border-radius: 8px
    a
      color: var(--chroma-surface-complement) !important
      text-decoration: none
    &:hover
      background-color: hsla(var(--chroma-secondary-f-hsl), 0.44)
</style>