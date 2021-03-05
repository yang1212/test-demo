<template>
  <div class="container">
    <div class="filter-box">
      <el-form :inline="true" :model="formData">
        <el-form-item>
          <el-input v-model="formData.objName" placeholder="objName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.objName" placeholder="objType"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="formData.objDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-divider content-position="right"><span class="add-btn" @click="addBtn">+</span></el-divider>
    <div class="detail-box">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>xx 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-dialog title="新增" width="80%" v-if="showAddPanel"  :visible.sync="showAddPanel" append-to-body>
      <add-new @cancel="closePanel"></add-new>
    </el-dialog>
  </div>
</template>

<script>
import addNew from './component/addNew'
import { billTypeData } from './server'

export default {
  name: 'billManager',
  components: {
    addNew
  },
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      formData: {
        objName: '',
        objType: '',
        objDate: ''
      },
      showAddPanel: false,
      dataType: []
    }
  },
  created () {
    billTypeData().then(res => {
      console.log(1, res)
    })
  },
  methods: {
    search () {
      console.log(1)
    },
    addBtn () {
      console.log(23)
      this.showAddPanel = true
    },
    closePanel () {
      this.showAddPanel = false
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-box {
  height: 200px;
  .tag-btn {
    margin: 10px 20px;
  };
  .add-btn {
  }
}
</style>
