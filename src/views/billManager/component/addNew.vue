<template>
  <div>
    <div class="filter-box">
      <el-form :model="formData" class="form-data">
        <el-form-item>
          <el-input v-model="formData.objName" placeholder="objName"></el-input>
        </el-form-item>
        <el-form-item class="select-form-item">
          <el-select v-model="formData.objType" placeholder="objType">
            <el-option v-for="(item, index) in obyTypeEnum"
                       :key="index"
                       :label="item.label"
                       :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.objPrice" placeholder="objPrice"></el-input>
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
          <el-button type="primary" @click="onCancel" size="small">取消</el-button>
          <el-button type="primary" @click="onSubmit" size="small">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getTypeData, createBill } from '../server'

export default {
  name: 'billManager',
  data () {
    return {
      formData: {
        objName: '',
        objType: '',
        objPrice: '',
        objDate: ''
      },
      obyTypeEnum: []
    }
  },
  created () {
    this.formData.objDate = this.format(new Date())
    getTypeData().then(res => {
      this.obyTypeEnum = res.data
    })
  },
  methods: {
    onSubmit () {
      createBill(this.formData).then(res => {
        console.log(1, res)
      })
    },
    onCancel () {
      console.log(2)
      this.$emit('cancel')
    },
    format (value) {
      if (!value) { return }
      const year = value.getFullYear()
      const day = (value.getDay() > 9) ? value.getDay() : ('0' + value.getDay())
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
  }
}
</style>
