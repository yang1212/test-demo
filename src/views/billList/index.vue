<template>
  <div class="bill-box">
    <!-- <div class="filter-box">
      <el-form :inline="true" :model="formData">
        <el-form-item>
          <el-select v-model="formData.objType" placeholder="请选择" @change="changeType">
            <el-option v-for="(item, index) in obyTypeEnum"
                       :key="index"
                       :label="item.label"
                       :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div> -->
    <!-- <el-divider content-position="right"><span class="add-btn" @click="goCountPage">图表</span></el-divider>
    <el-divider content-position="right"><span class="add-btn" @click="addBtn">+</span></el-divider> -->
    <div class="detail-box">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in detailList" :key="index" :timestamp="item.objDate"  placement="top">
          <el-card>
            <h4>{{item.objType}}</h4>
            <p>{{item.objName}}支出: {{item.objPrice}}元</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { getTypeData, billDetailList } from '@server/index'

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      formData: {
        objType: ''
      },
      obyTypeEnum: [],
      detailList: []
    }
  },
  created () {
    getTypeData().then(res => {
      this.obyTypeEnum = res.data
    })
    billDetailList().then(res => {
      this.detailList = res.data
    })
  },
  methods: {
    goCountPage () {
      this.$router.push({
        path: 'countData'
      })
    },
    changeType (value) {
      console.log(value)
      billDetailList({ objType: value }).then(res => {
        this.detailList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bill-box {
  padding-bottom: 60px;
  box-sizing: border-box;
  .filter-box {
    /deep/ .el-form-item,  /deep/ .el-form-item__content,  /deep/ .el-select {
      width: 100%;
    }
  }
  .detail-box {
    padding: 80px 20px 0 20px;
  }
}
</style>
