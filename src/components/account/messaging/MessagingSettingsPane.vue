<script lang="ts" setup>
import { computed } from 'vue'
import { useSubscriber } from '../../../composables/useSubscriber'
import { toggleMessagingPermission } from '../../../utils/messaging'

const { subscriber } = useSubscriber()

const notificationsEnabled = computed({
  get: () => subscriber.value?.messagingTokens.length > 0,
  set: (value) => {
    if (value) {
      toggleMessagingPermission(true)
    } else {
      toggleMessagingPermission(false)
    }
  },
})

</script>

<template>
  <section class="messaging-settings-pane">
    <h2>Messaging Settings</h2>
    <p>Here you can configure your messaging settings.</p>

    <fieldset>
      <div class="flex">
        <cyan-spacer />
        <cyan-toggle
          :label="$t('messaging.toggle')"
          :checked="notificationsEnabled"
        />
        <cyan-button
          :label="$t('messaging.toggle')"
          @click="notificationsEnabled = true"
        />
      </div>
    </fieldset>
  </section>
</template>