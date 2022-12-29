<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import TopBar from '../../components/navigation/TopBar.vue'
import { useAsset } from '../../composables/useAsset';

const props = defineProps<{
  assetkey: string
}>()

const { t } = useI18n()
const { asset, loading, canEdit, notFound } = useAsset(props.assetkey)
</script>

<template>
  <TopBar :title="t('action.delete')" />
</template>