<template>
  <div class="bill-box">
    <div class="detail-box">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in detailList" :key="index" :timestamp="item.objDate"  placement="top"  v-show="detailList.length > 0">
          <el-card>
            <h4>{{item.objLabel}} ({{item.objType}})</h4>
            <p>{{item.objName}}支出: {{item.objPrice}}元</p>
            <span class="delete-btn" @click="handleDelete(index)"><i class="el-icon-delete"></i></span>
          </el-card>
        </el-timeline-item>
        <el-timeline-item  placement="top" v-show="detailList.length === 0">
          <el-card>
            <p>暂无数据</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-dialog title="温馨提示" width="230px" :visible.sync="visible" class="delete-modal">
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="sureDetele" size="mini">确 定</el-button>
      </span>
    </el-dialog>
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
      curDate: new Date(),
      curIndex: 0
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
    handleDelete (index) {
      this.visible = true
      this.curIndex = index
    },
    sureDetele () {
      const curItem = this.detailList.find((item, index) => index === this.curIndex)
      delListData({id: curItem._id}).then(res => {
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
  .delete-modal {
    /deep/ .el-dialog__body {
      padding: 15px 20px;
    }
  }
}
</style>
