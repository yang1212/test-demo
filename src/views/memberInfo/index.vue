<template>
  <div class="member-box">
    <div class="member-info">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="info-logo"></el-avatar>
    </div>
    <div class="login-out" @click="loginOut">
      <i class="el-icon-s-promotion"></i>&nbsp;Login out
    </div>
    <div class="login-out">
      <i class="el-icon-s-cooperation"></i>&nbsp;temp Data
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  name: 'memberInfo',
  data () {
    return {
    }
  },
  methods: {
    loginOut () {
      localStorage.removeItem('userId')
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.member-box {
  .member-info {
    height: 260px;
    text-align: center;
    background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
    margin-top: -80px;
    .info-logo {
      margin-top: 130px;
    }
  }
  .login-out {
    height: 60px;
    line-height: 60px;
    background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
    color: gray;
    font-weight: bold;
    padding-left: 20px;
  }
}
</style>
