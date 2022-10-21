<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSession } from '../../composables/useSession'
import { useMetaPages } from '../../composables/useMeta'
import Dialog from '../ui/Dialog.vue'
import MarkdownSection from '../content/MarkdownSection.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { eulaMissing } = useSession()
const dismissed = ref(false)

const { pages } = useMetaPages()
const eula = computed(() => pages.value.get('eula'))

const showDialog = computed({
  get() {
    return eulaMissing.value && !dismissed.value
  },
  set(value) {
    dismissed.value = !value
  }
})

function accept() {
  dismissed.value = true
}

</script>

<template>
  <Dialog
    v-model="showDialog"
    label="EULA!!"
  >
    <template v-if="eula">
      {{ eula }}
      <MarkdownSection :content="eula.markdownContent" />
    </template>
    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        :label="t('actions.logout')"
        @click="showDialog = false"
      />
      <cyan-button
        :label="t('actions.accept')"
        @click="accept"
      />
    </cyan-toolbar>
  </Dialog>
</template>