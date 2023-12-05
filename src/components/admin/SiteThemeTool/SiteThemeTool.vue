<script lang="ts" setup>
import { Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { SiteFamily, useMeta } from '../../../composables/useMeta'
import { useSession } from '../../../composables/useSession'
import SiteThemeEditor from './SiteThemeEditor.vue'

const { t } = useI18n()
const { admin } = useSession()
const { siteThemes, update } = useMeta()
const activeTheme:Ref<SiteFamily|undefined> = ref(undefined)

function moveUp(index: number) { 
  const arr = [...siteThemes.value]
  const item = arr[index]
  arr[index] = arr[index - 1]
  arr[index - 1] = item
  update('sitethemes', arr)
}

function deleteTheme (index: number) {
  const arr = Array.from(siteThemes.value)
  arr.splice(index, 1)
  update('sitethemes', arr)
}
</script>
<template>
  <article
    v-if="admin"
    class="GameSystenTool Column"
  >
    <cyan-card elevation="1">
      <h3>{{ t('admin.gamesystemtool.title') }}</h3>
      <p class="TypeBody2">
        {{ t('admin.gamesystemtool.info') }}
      </p>
      <div class="systemTable">
        <template
          v-for="theme, index in siteThemes"
          :key="theme.id"
        >
          <cyan-icon
            small
            :noun="theme.icon"
          />
          <p class="TypeBody2">
            {{ theme.name }}
          </p>
          <button
            class="text"
            :disabled="index === 0"
            @click="moveUp(index)"
          >
            <cyan-icon
              small
              noun="chevron-up"
            />
          </button>
          <button
            class="text"
            @click="activeTheme = theme"
          >
            <cyan-icon
              small
              noun="edit"
            />
          </button>            
          <button
            class="text"
            @click="deleteTheme(index)"
          >
            <cyan-icon
              small
              noun="delete"
            />
          </button>
        </template>
      </div>
      <SiteThemeEditor
        :theme="activeTheme"
      />
    </cyan-card>
  </article>
</template>

<style lang="sass" scoped>
.systemTable
  display: grid
  grid-template-columns: 32px auto 32px 32px 32px
  row-gap: 4px
  align-items: center
</style>