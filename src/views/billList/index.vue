<template>
  <div class="bill-box">
    <div class="detail-box">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in detailList" :key="index" :timestamp="item.objDate"  placement="top"  v-show="detailList.length > 0">
          <el-card>
            <h4>{{item.objLabel}} ({{item.objType}})</h4>
            <p>{{item.objName}}支出: {{item.objPrice}}元</p>
            <el-popover
              placement="top"
              width="160"
              v-model="visible">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button size="mini" type="text" @click="handleDelete(item)" >确定</el-button>
              </div>
              <span class="delete-btn" slot="reference"><i class="el-icon-delete"></i></span>
            </el-popover>
          </el-card>
        </el-timeline-item>
        <el-timeline-item  placement="top" v-show="detailList.length === 0">
          <el-card>
            <p>暂无数据</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { billDetailList, delListData } from '@server/index'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      visible: false,
      curDate: new Date()
    }
  },
  created () {
    this.getDetailList()
  },
  computed: {
    ...mapGetters('homeData', [
      'detailList'
    ])
  },
  methods: {
    ...mapActions('homeData', [
      'updateDetailList'
    ]),
    getDetailList () {
      billDetailList({userId: JSON.parse(localStorage.getItem('userId'))}).then(res => {
        this.updateDetailList(res.data)
      })
    },
    goCountPage () {
      this.$router.push({
        path: 'countData'
      })
    },
    handleDelete (data) {
      delListData({id: data._id}).then(res => {
        this.visible = false
        this.$message.success('删除成功')
        this.getDetailList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/index.scss';
.bill-box {
  .filter-box {
    /deep/ .el-form-item,  /deep/ .el-form-item__content,  /deep/ .el-select {
      width: 100%;
    }
  }
  .detail-box {
    padding: 0 20px;
    .delete-btn {
      position: absolute;
      right: 10px;
      bottom: 10px;
      cursor: pointer;
      i {
        font-weight: bold;
        color: $primary-color;
      }
    }
  }
}
</style>
