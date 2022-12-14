<script lang="ts" setup>
import { doc, getFirestore, updateDoc } from '@firebase/firestore'
import { Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { SiteFamily, useMeta } from '../../composables/useMeta'
import { useSession } from '../../composables/useSession'
import { logDebug } from '../../utils/logHelpers'
import SiteThemeEditor from './SiteThemeEditor.vue'

const { t } = useI18n()
const { admin } = useSession()

const { siteThemes } = useMeta()

const activeTheme:Ref<SiteFamily|undefined> = ref(undefined)

function update(themes: SiteFamily[]) {
  logDebug('updating', themes)
  updateDoc(doc(getFirestore(), 'meta', 'pelilauta'), {
    sitethemes: themes
  })
}

function moveUp(index: number) {
  if(index > 0) {
    const arr = Array.from(siteThemes.value)
    const temp = arr[index]
    arr[index] = arr[index - 1]
    arr[index - 1] = temp
    update(arr)
  }
}

function save(theme:SiteFamily) {
  logDebug('save', theme)
  if (admin.value) {
    const arr = Array.from(siteThemes.value)
    if(!arr.find(a => a.id === theme.id)) {
      const th:SiteFamily = {
        name: theme.name || '-',
        id: theme.id || '-',
        icon: theme.icon || 'fox'
      }
      arr.push(th)
    }
    update(arr)
  }
}

function deleteTheme (index: number) {
  const arr = Array.from(siteThemes.value)
  arr.splice(index, 1)
  update(arr)
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
          <cyan-button
            noun="chevron-up"
            text
            :disabled="index === 0"
            @click="moveUp(index)"
          />
          <cyan-button
            noun="edit"
            text
            @click="activeTheme = theme"
          />
          <cyan-button
            noun="delete"
            text
            @click="deleteTheme(index)"
          />
        </template>
      </div>
      <SiteThemeEditor
        :theme="activeTheme"
        @save="save($event)"
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
  .cyan-icon
    width: 48px
    height: 48px
    display: block
</style>