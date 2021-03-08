<template>
  <div class="register-box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
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
          <el-form-item class="btn-group">
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
      register({ objName: this.formData.objName, password: this.formData.password }).then(res => {
        console.log(res)
        this.$router.push({
          path: 'billManager'
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.register-box {
  height: 100%;
  width: 100%;
  .box-card {
    width: 80%;
    margin: 20% 10%;
  }
}
</style>
