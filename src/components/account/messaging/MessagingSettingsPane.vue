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
    <h3>{{ $t('settings.messaging.title') }}</h3>

    <fieldset>
      <!-- Toggles messaging on and off -->
      <div class="flex">
        <cyan-spacer />
        <cyan-toggle
          :label="$t('settings.messaging.pushMessages')"
          :checked="pushMessages"
          @change="pushMessages = $event.target.checked"
        />
      </div>

      <!-- Enables additional messaging on new threads -->
      <div class="flex">
        <cyan-spacer />
        <cyan-toggle
          :disabled="!pushMessages"
          :label="$t('settings.smessaging.notifyOnThreads')"
          :checked="notifyOnThreads"
          @change="notifyOnThreads = $event.target.checked"
        />
      </div>

      <!-- Just testing purposes, remove before release -->
      <cyan-button
        label="Force enable messaging"
        @click="toggleMessagingPermission(true)"
      />
    </fieldset>
  </section>
</template>