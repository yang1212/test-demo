<template>
  <div class="container">
    <nav-bar></nav-bar>
    <div class="content">
      <router-view></router-view>
      <div class="footer">湘ICP备2021002848号-1</div>
    </div>
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
  width: 100%;
  .header {
    position: fixed;
    height: 60px;
    z-index: 2;
  }
  .content {
    padding-top: 60px;
    width: 100%;
    min-height: 100%;
    position: relative;
    .footer {
      position: absolute;
      height: 50px;
      bottom: 50px;
      right: 50px;
      height: 0;
      background: gray;
    }
  }
}
</style>
