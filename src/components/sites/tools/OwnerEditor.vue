<script lang="ts" setup>
import { computed, Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSite } from '../../../composables/useSite'
import AccountSelect from '../../accountselect/AccountSelect.vue'

const { t } = useI18n()

const { site } = useSite()
const owners = computed(() => {
  const o = site.value?.owners || []
  if (typeof o === 'string') return [o]
  return o
})
const added:Ref<string[]> = ref([])
</script>

<template>
  <div class="card rise-a Column">
    <h3>{{ t('site.tools.owners.title') }}</h3>
    <AccountSelect
      :exclude="owners"
      @add-account="added.push($event)"
    />
    {{ owners }}
    <br>
    {{ added }}
  </div>
</template>