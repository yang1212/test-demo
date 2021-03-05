<template>
  <div>
    <div class="filter-box">
      <el-form :model="formData">
        <el-form-item label="objName">
          <el-input v-model="formData.objName" placeholder="objName"></el-input>
        </el-form-item>
        <el-form-item label="objType">
          <el-select v-model="formData.objType" placeholder="objType">
            <el-option v-for="(item, index) in obyTypeEnum"
                       :key="index"
                       :label="item.label"
                       :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="objPrice">
          <el-input v-model="formData.objPrice" placeholder="objPrice"></el-input>
        </el-form-item>
        <el-form-item label="objDate">
          <el-date-picker
            v-model="formData.objDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="small">确认</el-button>
          <el-button type="primary" @click="onCancel" size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'billManager',
  data () {
    return {
      formData: {
        objName: '',
        objType: '',
        objDate: ''
      },
      obyTypeEnum: []
    }
  },
  methods: {
    onSubmit () {
      console.log(1)
    },
    onCancel () {
      console.log(2)
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
