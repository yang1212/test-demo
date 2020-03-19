<template>
  <div>
    <header-tab/>
    <router-link :to="{ name: 'user', params: { userId: 1 }}">User1</router-link>
    <router-link :to="{ name: 'user', params: { userId: 2 }}">User2</router-link>
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
