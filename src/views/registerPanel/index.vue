<template>
  <div class="register-box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>注册</span>
      </div>
      <div class="text item">
        <el-form :model="formData">
          <el-form-item>
            <el-input v-model="formData.objName" placeholder="objName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formData.password" placeholder="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formData.confirmPassword" placeholder="confirmPassword"></el-input>
          </el-form-item>
          <el-form-item class="confirm-btn">
            <el-button type="primary" @click="confirmBtn" size="small">confirm</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
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
  padding-top: 20%;
  .box-card {
    width: 80%;
    margin: 0 10%;
    .confirm-btn {
      /deep/ .el-button {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
}
</style>
