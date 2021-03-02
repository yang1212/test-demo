<template>
  <div class="container">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <div style="position:fixed;bottom:0px;right:300px">湘ICP备2021002848号-1</div>
  </div>
</template>

<script>
import navBar from '@components/navBar/navBar'

export default {
  name: 'HelloWorld',
  components: {
    navBar
  },
  data () {
    return {
      msg: ''
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  height: 100%;
}
</style>
