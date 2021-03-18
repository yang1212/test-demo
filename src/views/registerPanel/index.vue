<template>
  <div class="register-box">
    <div class="masklayer"></div>
    <div class="box-card">
      <div class="login-text"><span>Register</span></div>
      <el-form :model="formData" class="form-box">
        <el-form-item>
          <el-input v-model="formData.objName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.confirmPassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item class="confirm-btn">
          <el-button @click="confirmBtn" size="small">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register } from '@server/index'

export default {
  name: 'register',
  data () {
    return {
      formData: {
        objName: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    confirmBtn () {
      if (!this.formData.objName) {
        this.$message.error('用户名不能为空')
        return
      }
      if (!this.formData.password) {
        this.$message.error('请设置密码')
        return
      }
      if (this.formData.password !== this.formData.confirmPassword) {
        this.$message.error('密码确认不一致')
        return
      }
      register({ objName: this.formData.objName, password: this.formData.password }).then(res => {
        if (res.resultCode === 403) {
          this.$message.error(res.message)
        } else {
          this.$router.push({
            path: 'billManager'
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.register-box {
  width: 100%;
  height: 100%;
  background: url("../../../static/loginBg.png");
  .box-card {
    position: relative;
    top: 100px;
    width: 75%;
    margin: 0 auto;
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
      .confirm-btn {
        /deep/ .el-button {
          width: 100%;
          margin-top: 20px;
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
  background-color: rgba(0, 0, 0, .7);
}
</style>
