<template>
  <div class="container-box">
    <div class="masklayer"></div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'index',
  data () {
    return {
    }
  },
  created () {
    const userId = JSON.parse(localStorage.getItem('userId'))
    if (userId) {
      this.$router.push({
        path: '/billManager'
      })
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container-box {
  width: 100%;
  height: 100%;
  background: url("../../static/loginBg.png");
}
.masklayer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .7);
}
</style>
