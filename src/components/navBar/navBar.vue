<template>
  <div class="nav-box">
    <div class="home-tag" @click="chooseLogo"><el-avatar icon="el-icon-user-solid"></el-avatar></div>
    <el-menu :default-active="this.$route.path" router mode="horizontal" active-text-color="#178fff" class="nav-list">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      <el-menu-item @click="handleCreate">create</el-menu-item>
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
        { navItem: 'nav2', name: '/homePage2' }
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
    },
    handleCreate () {
      const parentId = this.$route.params.id
      this.$router.push({
        path: '/addDoc/' + parentId
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
  .home-tag {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
  }
  .nav-list {
    margin-left: 80px;
    border-bottom: none;
  }
}
</style>
