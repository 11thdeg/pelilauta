<script lang="ts" setup>
import { Asset } from '@11thdeg/skaldstore'
import { useSession } from '../../composables/useSession'
import AssetEntryForm from './AssetEntryForm.vue'
import { getFirestore, updateDoc, doc } from '@firebase/firestore'
import { useI18n } from 'vue-i18n'
import { logDebug } from '../../utils/logHelpers'
import ProfileTag from '../profiles/ProfileTag.vue'
import { useAsset } from '../../composables/useAsset'

const { t } = useI18n()
const { uid } = useSession()
const { asset } = useAsset()

function save () {
  logDebug('AssetEntryColumn', 'save', asset.value.docData)
  updateDoc(
    doc(
      getFirestore(),
      Asset.collectionName,
      asset.value.key || ''
    ),
    asset.value.docData
  )
}
</script>

<template>
  <div class="Column">
    <cyan-card v-if="asset.hasOwner(uid)">
      <h3 slot="title">
        {{ t('assetView.meta.title') }}
      </h3>
      <br>
      <AssetEntryForm
        v-model="asset"
      />
      <cyan-toolbar>
        <cyan-spacer />
        <cyan-button
          noun="save"
          :label="t('action.save')"
          @click="save"
        />
      </cyan-toolbar>
    </cyan-card>
    <template v-else>
      <h4>{{ asset.name }}</h4>
      <ProfileTag :uid="asset.owners[0]" />
    </template>
  </div>
</template>