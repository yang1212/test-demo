<template>
  <div class="member-box">
    <div class="member-info">
      <el-avatar size="small" src="https://d36jcksde1wxzq.cloudfront.net/saas-mega/whiteFingerprint.png"></el-avatar>
    </div>
    <div class="login-out" @click="loginOut">
      Login out
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
    height: 200px;
    line-height: 200px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
  .login-out {
    height: 100px;
    border-bottom: 1px solid #eee;
  }
}
</style>
