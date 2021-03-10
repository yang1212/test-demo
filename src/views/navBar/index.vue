<template>
  <div class="nav-box">
    <div class="home-tag" @click="chooseLogo"><el-avatar size="small" src="https://d36jcksde1wxzq.cloudfront.net/saas-mega/whiteFingerprint.png"></el-avatar></div>
    <div class="nav-list">
      <i class="el-icon-pie-chart" @click="handleSelect"></i>
      <i class="el-icon-plus" @click="addBtn"></i>
    </div>
    <el-dialog title="新增" width="80%" v-if="showAddPanel"  :visible.sync="showAddPanel" append-to-body>
      <add-new @close="closePanel"></add-new>
    </el-dialog>
  </div>
</template>

<script>
import addNew from './addNew'

export default {
  components: {
    addNew
  },
  name: 'navBar',
  data () {
    return {
      showAddPanel: false
    }
  },
  methods: {
    chooseLogo () {
      this.$router.push({
        path: '/billManager'
      })
    },
    handleSelect () {
      this.$router.push({
        path: 'countData'
      })
    },
    addBtn () {
      this.showAddPanel = true
    },
    closePanel () {
      this.showAddPanel = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-box {
  position: fixed;
  top: 0;
  background: #409eff;
  box-shadow: 0px 5px 5px gray;
  width: 100%;
  height: 60px;
  line-height: 60px;
  z-index: 999;
  .home-tag {
    position: absolute;
    top: 13px;
    left: 20px;
    z-index: 2;
  }
  .nav-list {
    float: right;
    i {
      font-size: 25px;
      color: #fff;
      margin: 20px 10px;
    }
  }
}
</style>
