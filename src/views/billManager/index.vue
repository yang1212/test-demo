<template>
  <div class="bill-box">
    <div class="filter-box">
      <el-form :inline="true" :model="formData">
        <el-form-item>
          <el-select v-model="formData.objType" placeholder="objType">
            <el-option v-for="(item, index) in obyTypeEnum"
                       :key="index"
                       :label="item.label"
                       :value="item.code">
            </el-option>
          </el-select>
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
import { getTypeData } from './server'

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
        objType: '',
        objDate: ''
      },
      showAddPanel: false,
      obyTypeEnum: []
    }
  },
  created () {
    getTypeData().then(res => {
      this.obyTypeEnum = res.data
    })
  },
  methods: {
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
.bill-box {
  padding-bottom: 60px;
  box-sizing: border-box;
  .filter-box {
    height: 140px;
    .tag-btn {
      margin: 10px 20px;
    };
    .add-btn {
    }
  }
  .detail-box {
    padding: 0 20px;
  }
}
</style>
