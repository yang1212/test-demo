<template>
  <div>
    <header-tab/>
    <router-view/>
  </div>
</template>

<script>
import headerTab from '@/components/header'

export default {
  name: 'index',
  components: {
    headerTab
  }
}
</script>

<style>

</style>
