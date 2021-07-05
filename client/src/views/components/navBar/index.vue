<template>
  <div class="nav-box">
    <span class="home-tag" @click="chooseLogo">B</span>
    <div class="nav-list response-list">
      <span @click.native="addData"><i class="el-icon-edit-outline"></i>&nbsp;新增</span>
      <span @click.native="goChartPage"><i class="el-icon-pie-chart"></i>&nbsp;图表</span>
      <span @click.native="goMemberPage"><i class="el-icon-s-home"></i>&nbsp;个人</span>
    </div>
    <span class="el-icon-more more-icon response-icon" @click="openMore"></span>
    <el-drawer
      size="50%"
      direction="ltr"
      custom-class="nav-drawer"
      ref="drawer"
      destroy-on-close
      :withHeader="false"
      :modal="false"
      :visible.sync="showNavPanel">
      <div @click.native="addData" class="item-list"><i class="el-icon-edit-outline"></i>&nbsp;新增</div>
      <div @click.native="goChartPage" class="item-list"><i class="el-icon-pie-chart"></i>&nbsp;图表</div>
      <div @click.native="goMemberPage" class="item-list"><i class="el-icon-s-home"></i>&nbsp;个人</div>
    </el-drawer>
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
import addNew from '../addNew/index'

export default {
  components: {
    addNew
  },
  name: 'navBar',
  data () {
    return {
      showAddPanel: false,
      showNavPanel: false
    }
  },
  methods: {
    chooseLogo () {
      this.$router.push({
        path: '/billManager'
      })
    },
    addData () {
      this.showAddPanel = true
    },
    goChartPage () {
      this.$router.push({
        path: 'chartData'
      })
    },
    goMemberPage () {
      this.$router.push({
        path: 'memberInfo'
      })
    },
    closePanel () {
      this.showAddPanel = false
    },
    openMore () {
      this.showNavPanel = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../../assets/index.scss';
.nav-box {
  position: fixed;
  top: 0;
  background: $primary-color;
  width: 100%;
  height: 60px;
  line-height: 60px;
  z-index: 999;
  .home-logo {
    position: absolute;
    top: 3px;
    left: 20px;
    z-index: 2;
    color: #fff;
    font-weight: bold;
  }
  .nav-list {
    float: right;
    padding-right: 20px;
    color: #fff;
    font-size: 15px;
    text-align: right;
    span {
      display: inline-block;
      width: 80px;
    }
  }
  .more-icon {
    position: absolute;
    right: 20px;
    top: 3px;
    color: #fff;
  }
  /deep/ .nav-drawer {
    .item-list {
      padding-left: 15px;
    }
    .item-list:hover {
      cursor: pointer;
      background: #eee;
    }
  }
}
.response-icon {
  display: none;
}
@media only screen and (max-width: 500px) {
  .response-list {
    display: none;
  }
  .response-icon {
    display: block;
  }
}
</style>
