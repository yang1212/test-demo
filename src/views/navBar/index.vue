<template>
  <div class="nav-box">
    <div class="home-tag" @click="chooseLogo"><el-avatar size="small" src="https://d36jcksde1wxzq.cloudfront.net/saas-mega/whiteFingerprint.png"></el-avatar></div>
    <div class="nav-list">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  @click.native="handeAdd"><i class="el-icon-circle-plus-outline"></i>&nbsp;新增数据</el-dropdown-item>
          <el-dropdown-item  @click.native="handleChart"><i class="el-icon-pie-chart"></i>&nbsp;图表分析</el-dropdown-item>
          <el-dropdown-item  @click.native="handleMember"><i class="el-icon-s-home"></i>&nbsp;个人信息</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-drawer
      title="新增"
      append-to-body
      size="100%"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
      destroy-on-close
      :visible.sync="showAddPanel">
      <add-new @close="closePanel"></add-new>
    </el-drawer>
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
    handeAdd () {
      this.showAddPanel = true
    },
    handleChart () {
      this.$router.push({
        path: 'countData'
      })
    },
    handleMember () {
      this.$router.push({
        path: 'memberInfo'
      })
    },
    closePanel () {
      this.showAddPanel = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/index.scss';
.nav-box {
  position: fixed;
  top: 0;
  background: $primary-color;
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
