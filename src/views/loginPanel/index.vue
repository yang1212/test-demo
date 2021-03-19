<template>
  <div class="box-card">
    <div class="login-text"><span>Login</span></div>
    <el-form :model="formData" class="form-box">
      <el-form-item>
        <el-input v-model="formData.objName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formData.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item class="login-btn">
        <el-button  @click="onLogin" :loading="loading">登录</el-button>
      </el-form-item>
      <p class="text-btn">
        还未注册账号？<span @click="onRegister" class="common-text">立即注册</span>
      </p>
    </el-form>
  </div>
</template>

<script>
import { login } from '@server/index'

export default {
  name: 'login',
  data () {
    return {
      loading: false,
      formData: {
        objName: '',
        password: ''
      }
    }
  },
  methods: {
    onLogin () {
      if (!this.formData.objName || !this.formData.password) {
        this.$message.error('请输入用户名和密码进行登录')
        return true
      }
      this.loading = true
      login(this.formData).then(res => {
        this.loading = false
        if (res.data.length === 0) {
          this.$message.error('请输入正确的用户名和密码进行登录')
          return true
        } else {
          localStorage.setItem('userId', JSON.stringify(res.data[0]._id))
          this.$router.push({
            path: 'billManager'
          })
        }
      })
    },
    onRegister () {
      this.$router.push({
        path: 'register'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/index.scss';
.box-card {
  width: 75%;
  margin: 0 auto;
  position: relative;
  top: 100px;
  .login-text {
    width: 50px;
    border-bottom: 5px solid #fff;
    padding-bottom: 15px;
    span {
      font-size: 28px;
      font-weight: bold;
      color: #fff;
    }
  }
  .form-box {
    margin-top: 50px;
    /deep/ .el-input__inner {
      border: 1px solid transparent;
      border-bottom: 1px solid #929090;
      background: transparent;
      border-radius: 0;
      color: #fff;
    }
    .text-btn {
      font-size: 14px;
      color: #929090;
      float: right;
    }
    .login-btn {
      /deep/ .el-button {
        width: 100%;
        margin: 20px 0 30px 0;
        background: $primary-color;
        color: #fff;
        border: none;
      }
    }
  }
}
</style>
