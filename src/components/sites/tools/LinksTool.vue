<script lang="ts" setup>
import { SiteLink } from '@11thdeg/skaldstore/dist/entries/Site'
import { ref, Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSite } from '../../../composables/useSite'

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

</script>
<template>
  <div
    v-if="site"
    class="Column"
  >
    <h3>{{ t('site.tools.links.title') }}</h3>
    <p>{{ t('site.tools.links.info') }}</p>

    {{ site.links }}

    <div
      v-for="link, index in site.links"
      :key="link.url"
      class="sortableTable"
    >
      <div class="linkInfo hoverable">
        <p>{{ linkText(link) }}</p>
        <p class="TypeCaption">
          {{ link.url }}
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
  </div>
</template>

<style lang="sass" scoped>
.sortableTable
  display: grid
  grid-template-columns: auto 32px 32px 32px
</style>