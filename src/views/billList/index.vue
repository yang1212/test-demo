<template>
  <div class="bill-box">
    <div class="detail-box">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in detailList" :key="index" :timestamp="item.objDate"  placement="top"  v-show="detailList.length > 0">
          <el-card>
            <h4>{{item.objLabel}} ({{item.objType}})</h4>
            <p>{{item.objName}}支出: {{item.objPrice}}元</p>
            <span class="delete-btn" @click="handleDelete(item)"><i class="el-icon-delete"></i></span>
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
      delListData({id: data.id}).then(res => {
        this.$message.success('删除成功')
        this.getDetailList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
        color: #f56c6c;
      }
    }
  }
}
</style>
