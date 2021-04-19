<template>
  <div class="add-new-box">
    <el-form :model="formData" class="form-data">
      <el-form-item>
        <el-input v-model="formData.objName" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item class="select-form-item">
        <el-select v-model="formData.objType" placeholder="类型">
          <el-option  v-for="(item, index) in obyTypeEnum"
                      :key="index"
                      :label="item.label"
                      :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formData.objPrice" placeholder="价格"></el-input>
      </el-form-item>
      <el-form-item class="date-form-item">
        <el-date-picker
          v-model="formData.objDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="objDate">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="btn-group">
        <el-button  @click="onCancel">取消</el-button>
        <el-button  @click="onSubmit" :loading="loading">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getTypeData, createBill, billDetailList } from '@server/index'
import { mapActions } from 'vuex'

export default {
  name: 'addNew',
  data () {
    return {
      formData: {
        objName: '',
        objType: '',
        objPrice: '',
        objDate: ''
      },
      obyTypeEnum: [],
      loading: false
    }
  },
  created () {
    this.formData.objDate = this.format(new Date())
    getTypeData().then(res => {
      this.obyTypeEnum = res.data
    })
  },
  methods: {
    ...mapActions('homeData', [
      'updateDetailList'
    ]),
    onSubmit () {
      if (!this.formData.objName || !this.formData.objType || !this.formData.objPrice || !this.formData.objDate) {
        this.$message.error('存在数据未填写')
      } else {
        this.loading = true
        const userId = JSON.parse(localStorage.getItem('userId'))
        this.formData.userId = userId
        createBill(this.formData).then(res => {
          billDetailList({userId: userId}).then(res => {
            this.loading = false
            this.$emit('close')
            this.updateDetailList(res.data)
            this.$router.push({
              path: '/billManager'
            })
          })
        })
      }
    },
    onCancel () {
      this.$emit('close')
    },
    format (value) {
      if (!value) { return }
      const year = value.getFullYear()
      const day = (value.getDate() > 9) ? value.getDate() : ('0' + value.getDate())
      let month = value.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      return `${year}-${month}-${day}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/index.scss';
.add-new-box {
  padding: 20px 40px;
  .form-data {
    /deep/ .el-form-item__content {
      width: 100%;
    }
    .select-form-item {
      /deep/ .el-select {
        width: 100%;
      }
    }
    .date-form-item {
      /deep/ .el-date-editor {
        width: 100%;
      }
    }
    .btn-group {
      text-align: right;
      /deep/ .el-button {
        background: $primary-color;
        color: #fff;
        border: none;
      }
    }
  }
}
</style>
