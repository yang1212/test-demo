<template>
  <div class="login-box">
    <el-form :model="formData">
      <el-form-item>
        <el-input v-model="formData.objName" placeholder="objName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formData.password" placeholder="password"></el-input>
      </el-form-item>
      <el-form-item class="btn-group">
        <el-button type="primary" @click="onForgot" size="small">forgot</el-button>
        <el-button type="primary" @click="onRegister" size="small">register</el-button>
        <el-button type="primary" @click="onLogin" size="small">login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      formData: {
        objName: '',
        password: ''
      }
    }
  },
  methods: {
    onRegister () {
      console.log(1)
    },
    onLogin () {
      console.log(2)
    },
    onForgot () {
      console.log(3)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
