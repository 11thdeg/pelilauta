<script lang="ts" setup>
import { SiteLink } from '@11thdeg/skaldstore/dist/entries/Site'
import { ref, Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSite } from '../../../composables/useSite'
import LinkEditor from './LinkEditor.vue'

const { t } = useI18n()
const { site, update } = useSite()

const activeLink:Ref<SiteLink|undefined> = ref(undefined)

async function moveUp(index: number) {
  const arr = site.value?.links ? Array.from(site.value.links) : []
  if (index === 0) return
  const temp = arr[index - 1]
  arr[index -1 ] = arr[index]
  arr[index] = temp
  await update({ links: arr })
}

async function drop(index: number) {
  const arr = site.value?.links ? Array.from(site.value.links) : []
  arr.splice(index, 1)
  await update({ links: arr })
}

function linkText(link: SiteLink) {
  return link.name || link.url || '-'
}

function addLink(l: SiteLink) {
  const arr = site.value?.links ? Array.from(site.value.links) : []
  if (!arr.find(a => a.url === l.url)) {
    arr.push(l)
  } else {
    arr.forEach((a, i) => {
      if (a.url === l.url) {
        arr[i] = l
      }
    })
  }
  update({ links: arr })
}

</script>
<template>
  <div
    v-if="site"
    class="Column"
  >
    <div class="card rise-a">
      <h3>{{ t('site.tools.links.title') }}</h3>
      <p class="TypeCaption lowEmphasis">
        {{ t('site.tools.links.info') }}
      </p>

      <div
        v-for="link, index in site.links"
        :key="link.url"
        class="sortableTable"
      >
        <div class="linkInfo hoverable">
          <p>{{ linkText(link) }}</p>
          <p class="TypeCaption link oneLiner">
            <a :href="link.url">[ {{ link.url.length < 17 ? link.url : link.url.substring(0, 16) + '...' }} ]</a>
          </p>
        </div>
        <cyan-button
          noun="chevron-up"
          text
          :disabled="index === 0"
          @click="moveUp(index)"
        />
        <cyan-button
          noun="edit"
          text
          @click="activeLink = link"
        />
        <cyan-button
          noun="delete"
          text
          @click="drop(index)"
        />
      </div>
      <LinkEditor
        :link="activeLink"
        @save="addLink($event)"
      />
    </div> 
  </div>
</template>

<style lang="sass" scoped>
.linkInfo
  p
    margin: 0
    padding: 0
.link
  overflow: hidden
.sortableTable
  display: grid
  grid-template-columns: auto 32px 32px 32px
</style>