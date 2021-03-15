<template>
  <div class="container-box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <div class="text item">
        <el-form :model="formData">
          <el-form-item>
            <el-input v-model="formData.objName" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formData.password" placeholder="密码"></el-input>
          </el-form-item>
          <p class="text-btn">
            还未注册,<span @click="onRegister" class="common-text">立即注册</span>
            <span @click="onForgot" class="common-text">忘记密码</span>
          </p>
          <el-form-item class="login-btn">
            <el-button type="primary" @click="onLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
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
      login(this.formData).then(res => {
        this.$router.push({
          path: 'billManager'
        })
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
  padding-top: 100px;
  .box-card {
    width: 300px;
    margin: 0 auto;
    .text-btn {
      font-size: 14px;
      span:first-child {
        color: #409eff;
        font-weight: bold;
      }
      span:last-child {
        float: right;
      }
    }
    .login-btn {
      /deep/ .el-button {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
}
</style>
