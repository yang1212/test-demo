<template>
  <div class="member-box">
    <div>useName</div>
    <el-button @click="loginOut">login out</el-button>
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
</style>
