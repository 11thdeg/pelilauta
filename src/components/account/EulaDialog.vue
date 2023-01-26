<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useSession, logout, register } from '../../composables/useSession'
import { useMetaPages } from '../../composables/useMeta'
import MarkdownSection from '../content/MarkdownSection.vue'
import { useI18n } from 'vue-i18n'
import { useSnack } from '../../composables/useSnack'
import { CyanDialog } from '@11thdeg/cyan'


const { t } = useI18n()
const { eulaMissing } = useSession()
const { pushSnack } = useSnack()
const dismissed = ref(false)

const dialog = ref<CyanDialog>()

const { pages } = useMetaPages()
const eula = computed(() => pages.value.get('eula'))
const { account } = useSession()

watch(eulaMissing, (value) => {
  if (value && !dismissed.value) {
    dialog.value?.showModal()
  }
}, { immediate: true })

async function accept() {
  dismissed.value = true
  dialog.value?.close()
  await register()
  pushSnack(t('snacks.registrationComplete'))
}

function decline() {
  dialog.value?.close()
  logout()
  dismissed.value = true
}

</script>

<template>
  <cn-dialog
    v-if="eula"
    ref="dialog"
    :title="eula.name"
  >
    <MarkdownSection :content="eula.markdownContent" />

    <cyan-card v-if="account">
      <h4 class="downscaled">
        {{ $t('settings.profileData.title') }}
      </h4>
      <section class="flex">
        <img
          v-if="account.photoURL"
          class="avatarPreview"
          :src="account.photoURL"
          :alt="account.photoURL"
        >
        <p><strong>{{ $t('fields.profile.nick') }}</strong><br>{{ account.displayName }}</p>
      </section>
    </cyan-card>

    <cyan-toolbar>
      <cyan-spacer />
      <cyan-button
        text
        noun="logout"
        :label="t('action.logout')"
        @click="decline"
      />
      <cyan-button
        :label="t('action.accept')"
        @click="accept"
      />
    </cyan-toolbar>
  </cn-dialog>
</template>

<style lang="sass" scoped>
.avatarPreview
  width: 72px
  height: 72px
  border-radius: 50%
  margin-right: 1rem
</style>