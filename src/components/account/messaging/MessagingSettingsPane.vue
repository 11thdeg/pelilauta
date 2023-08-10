<script lang="ts" setup>
import { computed } from 'vue'
import { useSubscriber } from '../../../composables/useSubscriber'
import { toggleMessagingPermission } from '../../../utils/messaging'

const { subscriber, save } = useSubscriber()

const pushMessages = computed({
  get: () => subscriber.value?.pushMessages,
  set: (value) => {
    toggleMessagingPermission(value)
    subscriber.value!.pushMessages = value
    save()
  },
})

const notifyOnThreads = computed({
  get: () => subscriber.value?.notifyOnThreads,
  set: (value) => {
    subscriber.value!.notifyOnThreads = value
    save()
  },
})

</script>

<template>
  <section class="messaging-settings-pane">
    <fieldset>
      <legend>{{ $t('account.messaging.title') }}</legend>

      <!-- Toggles messaging on and off -->
      <cn-toggle-button
        :label="$t('account.messaging.pushMessages')"
        :pressed="pushMessages"
        @change="pushMessages = $event.target.pressed"
      />


      <!-- Enables additional messaging on new threads -->
      <cn-toggle-button
        :disabled="!pushMessages"
        :label="$t('account.messaging.notifyOnThreads')"
        :pressed="notifyOnThreads"
        @change="notifyOnThreads = $event.target.pressed"
      />


      <!-- Just testing purposes, remove before release -->
      <cyan-button
        label="Force enable messaging"
        @click="toggleMessagingPermission(true)"
      />
    </fieldset>
  </section>
</template>