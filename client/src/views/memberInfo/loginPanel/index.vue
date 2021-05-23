<template>
  <div class="login-box">
    <!-- <div class="login-text">
      <span v-show="showDefaultImg" class="el-icon-s-promotion" :class="{'img-rotate': showRotate}"></span>
      <span v-show="!showDefaultImg" class="el-icon-s-opportunity"></span>
    </div> -->
    <div class="login-img-info">
      <img src="../../../assets/images/loginTag.png" class="login-img"/>
    </div>
    <el-card class="box-card">
      <el-form :model="formData" class="form-box">
        <el-form-item>
          <el-input v-model="formData.objName" placeholder="用户名" @input="changeObjName" @blur="blurObjName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.password" placeholder="密码" type="password" @focus="focusPassword" @blur="blurPassword"></el-input>
        </el-form-item>
        <p class="text-btn">
          还未注册账号？<span @click="onRegister" class="common-text">立即注册</span>
        </p>
        <el-form-item class="login-btn">
          <el-button  @click="onLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
      },
      showDefaultImg: true,
      showRotate: false
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
    },
    focusPassword () {
      this.showDefaultImg = false
    },
    blurPassword () {
      this.showDefaultImg = true
    },
    changeObjName () {
      this.showRotate = true
    },
    blurObjName () {
      this.showRotate = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../../assets/index.scss';

.login-box {
  .login-img-info {
    width: 100%;
    height: 360px;
    background: #f5f5f5;
    padding-top: 15px;
    text-align: center;
    .login-img {
      width: 240px;
    }

  }
  .box-card {
    width: 80%;
    margin-left: 10%;
    position: relative;
    top: -120px;
    border-radius: 10px;
    .form-box {
      margin-top: 50px;
      /deep/ .el-input__inner {
        border: 1px solid transparent;
        border-bottom: 1px solid #dcdfe6;
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
        text-align: center;
        /deep/ .el-button {
          width: 180px;
          padding: 20px 0;
          margin-top: 20px;
          background: $primary-color;
          color: #fff;
          border: none;
          border-radius: 25px;
        }
      }
    }
  }
}
</style>
