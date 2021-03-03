<template>
  <div class="container">
    <nav-bar></nav-bar>
    <div class="content">
      <router-view></router-view>
      <div class="footer">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43062402000140" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
          <img src="../../static/beian.png"/>
          <span style="color:#939393;">湘公网安备 43062402000140号</span>
        </a>
        <span>湘ICP备2021002848号-1</span>
      </div>
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
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
    .footer {
      width: 100%;
      text-align: center;
      position: absolute;
      height: 50px;
      line-height: 50px;
      bottom: 0px;
      background: #eee;
    }
  }
}
</style>
