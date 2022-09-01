<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '../../composables/useSession'
import { toDisplayString } from '../../utils/toDisplayString'
import WithLoader from '../ui/WithLoader.vue'

const { t } = useI18n()
const { active, profile, account} = useSession()

const updatedAt = computed(() => {
  if (!account.value) return '-'
  if (!account.value.updatedAt) return '-'
  return account.value.updatedAt.seconds +''+ account.value.updatedAt.nanoseconds
})

</script>

<template>
  <WithLoader :suspended="!active">
    <section class="AccountDataSection">
      <h3>{{ t('settings.accountDataSection.title') }}</h3>
      <p class="lowEmphasis TypeBody2">
        {{ t('settings.accountDataSection.description') }}
      </p>
      <div class="dataTable">
        <!-- nickname -->
        <p class="tableHead">
          {{ t('fields.profile.nick') }}
        </p>
        <p>{{ profile.nick }}</p>
        <!-- photoURL -->
        <p class="tableHead">
          {{ t('fields.profile.avatarURL') }}
        </p>
        <p class="dontBreakOut TypeBody2">
          <a href="profile.avatarURL">{{ profile.avatarURL }}</a>
        </p>
        <!-- last login -->
        <p class="tableHead">
          {{ t('fields.account.lastLogin') }}
        </p>
        <p>{{ toDisplayString(account.updatedAt) }} <span class="TypeBody2 lowEmphasis">( {{ updatedAt }})</span></p>
        <!-- lightmode -->
        <p class="tableHead">
          {{ t('fields.account.lightMode') }}
        </p>
        <p>{{ account.lightMode }}</p>
        <!-- locale -->
        <p class="tableHead">
          {{ t('fields.account.locale') }}
        </p>
        <p>{{ account.locale }}</p>
      </div>
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          :label="t('settings.dangerousDeleteAccountAction')"
          text
          noun="delete"
        />
      </cyan-toolbar>
    </section>
  </WithLoader>
</template>