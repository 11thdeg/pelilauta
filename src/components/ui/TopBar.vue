
<template>
  <nav id="TopBar">
    <cyan-icon
      noun="back"
      class="clickable hoverable inAppBar"
      @click="$router.back()"
    />
    <slot />
  </nav>
</template>

<style lang="sass" scoped>
#TopBar
  margin: 0
  paddin: 0
  display: flex
  justify-content: space-between
  align-items: top
  height: 56px
.inAppBar
  margin-top: 8px
</style>