<template>
  <div class="container-box">
    <nav-bar></nav-bar>
    <div class="content">
      <router-view></router-view>
      <div class="footer">
        <span style="display: block;color:#939393">湘ICP备2021002848号-1</span>
      </div>
    </div>
    <el-dialog title="温馨提示"
      :show-close="false"
      :close-on-click-modal="false"
      width="80%"
      :visible.sync="showGoLoginPanel">
      <span>请重新登录</span>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="goLoginPage">去登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import navBar from '../components/navBar/index'

export default {
  name: 'billManager',
  components: {
    navBar
  },
  data () {
    return {
      showGoLoginPanel: false
    }
  },
  created () {
    const userId = JSON.parse(localStorage.getItem('userId'))
    if (!userId) {
      this.showGoLoginPanel = true
    }
  },
  methods: {
    goLoginPage () {
      this.$router.push({
        path: '/login'
      })
      this.showGoLoginPanel = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container-box {
  height: 100%;
  width: 100%;
  .header {
    position: fixed;
    height: 60px;
    z-index: 2;
  }
  .content {
    padding: 80px 0;
    width: 100%;
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
    .footer {
      width: 100%;
      text-align: center;
      position: absolute;
      height: 45px;
      bottom: 0px;
      background: #eee;
      padding: 5px 0;
      p {
        margin: 0;
      }
    }
  }
}
</style>
