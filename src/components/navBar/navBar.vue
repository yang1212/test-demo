<template>
  <div class="nav-box">
    <div class="home-tag" @click="chooseLogo"><el-avatar size="small" src="https://d36jcksde1wxzq.cloudfront.net/saas-mega/whiteFingerprint.png"></el-avatar></div>
    <el-menu :default-active="this.$route.path" router mode="horizontal" active-text-color="#178fff" class="nav-list">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'navBar',
  data () {
    return {
      navList: [
        { navItem: 'nav1', name: '/homePage1' },
        { navItem: 'nav2', name: '/homePage2' },
        { navItem: 'nav3', name: '/homePage1' },
        { navItem: 'nav4', name: '/homePage2' }
      ]
    }
  },
  methods: {
    ...mapActions([
      'updatePage'
    ]),
    chooseLogo () {
      this.updatePage('home')
      this.$router.push({
        path: '/pushContent/home'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-box {
  border-bottom: 1px solid #e5e5e5;
  position: relative;
  display: flex;
  justify-content: flex-end;
  .home-tag {
    position: absolute;
    top: 18px;
    left: 20px;
    z-index: 2;
  }
  .nav-list {
    margin-right: 20px;
    border-bottom: none;
  }
}
</style>
