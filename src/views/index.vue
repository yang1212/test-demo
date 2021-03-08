<template>
  <div class="container-box">
    <!-- <nav-bar></nav-bar>
    <div class="content">
      <router-view></router-view>
      <div class="footer">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43062402000140" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
          <img src="../../static/beian.png"/>
          <span style="color:#939393;">湘公网安备 43062402000140号</span>
        </a>
        <span style="display: block;color:#939393">湘ICP备2021002848号-1</span>
      </div>
    </div> -->
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
          <p>
            还未注册,<span @click="onRegister">立即注册</span>
            <span  @click="onForgot">忘记密码</span>
          </p>
          <el-form-item class="login-btn">
            <el-button type="primary" @click="onLogin">login</el-button>
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
        console.log(2)
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
// .container-box {
//   height: 100%;
//   width: 100%;
//   .header {
//     position: fixed;
//     height: 60px;
//     z-index: 2;
//   }
//   .content {
//     padding-top: 60px;
//     width: 100%;
//     position: relative;
//     min-height: 100%;
//     box-sizing: border-box;
//     .footer {
//       width: 100%;
//       text-align: center;
//       position: absolute;
//       height: 45px;
//       bottom: 0px;
//       background: #eee;
//       padding: 5px 0;
//       p {
//         margin: 0;
//       }
//     }
//   }
// }
.container-box {
  height: 100%;
  width: 100%;
  .box-card {
    width: 80%;
    margin: 20% 10%;
  }
}
</style>
