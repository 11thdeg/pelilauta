<script lang="ts" setup>
import { computed } from 'vue'
import { useSubscriber } from '../../../composables/useSubscriber'
import { persistMessagingPermission } from '../../../utils/messaging'

const { subscriber, save } = useSubscriber()

const pushMessages = computed({
  get: () => subscriber.value?.pushMessages || undefined,
  set: (value) => {
    if (value) persistMessagingPermission()
    subscriber.value!.pushMessages = !!value
    if (!value) subscriber.value!.notifyOnThreads = false
    if (!value) subscriber.value!.notifyOnLikes = false
    save()
  },
})

const notifyOnThreads = computed({
  get: () => subscriber.value?.notifyOnThreads || undefined,
  set: (value) => {
    subscriber.value!.notifyOnThreads = !!value
    save()
  },
})

const notifyOnLikes = computed({
  get: () => subscriber.value?.notifyOnLikes || undefined,
  set: (value) => {
    subscriber.value!.notifyOnLikes = !!value
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
        :aria-pressed="pushMessages"
        @change="pushMessages = $event.target.pressed"
      />

      <!-- Enables additional messaging on new threads -->
      <cn-toggle-button
        :disabled="!pushMessages"
        :label="$t('account.messaging.notifyOnThreads')"
        :pressed="notifyOnThreads"
        :aria-pressed="pushMessages"
        @change="notifyOnThreads = $event.target.pressed"
      />

      <!-- Enables additional messaging on new likes -->
      <cn-toggle-button
        :disabled="!pushMessages"
        :label="$t('account.messaging.notifyOnLikes')"
        :pressed="notifyOnLikes"
        :aria-pressed="pushMessages"
        @change="notifyOnLikes = $event.target.pressed"
      />
    </fieldset>
    <p class="TypeBody2 lowEmphasis">
      {{ $t('account.messaging.description') }}
    </p>
  </section>
</template>