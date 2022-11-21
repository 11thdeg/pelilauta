<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DeleteConfirmForm from '../../components/DeleteConfirmForm/DeleteConfirmForm.vue'
import TopBar from '../../components/navigation/TopBar.vue'
import WithLoader from '../../components/ui/WithLoader.vue'
import WithPermission from '../../components/ui/WithPermission.vue'
import { usePage } from '../../composables/usePage'

const props = defineProps<{
  sitekey: string;
  pagekey: string;
}>()

const { t } = useI18n()

const { loading, canEdit, page } = usePage(props.pagekey, props.sitekey)

const verified = ref(false)
</script>
<template>
  <TopBar :title="page.name" />
  <main class="bookLayout">
    <WithLoader :suspended="loading">
      <WithPermission :forbidden="!canEdit">
        <article class="Column">
          <DeleteConfirmForm
            v-model="verified"
            :title="t('page.deleteConfirm.title')"
            :message="t('page.deleteConfirm.message')"
          />
          <cyan-toolbar>
            <cyan-spacer />
            <cyan-button
              text
              :label="t('action.cancel')"
              @click="$router.back()"
            />
            <cyan-button
              :disabled="!verified"
              :label="t('action.remove')"
            />
          </cyan-toolbar>
        </article>
      </WithPermission>
    </WithLoader>
  </main>  
</template>