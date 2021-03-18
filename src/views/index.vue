<template>
  <div class="container-box">
    <div class="masklayer"></div>
    <div class="box-card">
      <div class="login-text"><span>Login</span></div>
      <el-form :model="formData" class="form-box">
        <el-form-item>
          <el-input v-model="formData.objName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button  @click="onLogin">登录</el-button>
        </el-form-item>
        <p class="text-btn">
          <span @click="onRegister" class="common-text">立即注册</span>
          <span @click="onForgot" class="common-text">忘记密码</span>
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@server/index'

export default {
  name: 'index',
  components: {
  },
  data () {
    return {
      msg: '',
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
      login(this.formData).then(res => {
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
    },
    onForgot () {
      console.log(2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container-box {
  width: 100%;
  height: 100%;
  background: url("../../static/loginBg.png");
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
        span:first-child {
        }
        span:last-child {
          float: right;
        }
      }
      .login-btn {
        /deep/ .el-button {
          width: 100%;
          margin: 20px 0 30px 0;
          background: #f56c6c;
          color: #fff;
          border: none;
        }
      }
    }
  }
}
.masklayer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .8);
}
</style>
