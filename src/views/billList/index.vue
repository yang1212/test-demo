<template>
  <div class="bill-box">
    <div class="detail-box">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in detailList" :key="index" :timestamp="item.objDate"  placement="top" v-show="detailList.length > 0">
          <el-card>
            <h4>{{item.objLabel}} ({{item.objType}})</h4>
            <p>{{item.objName}}支出: {{item.objPrice}}元</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item  placement="top" v-show="detailList.length === 0">
          <el-card>
            <p>暂无数据</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item  placement="top" v-show="detailList.length === 0">
          <el-card>
            <p>右上角可添加数据</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { billDetailList } from '@server/index'
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
    billDetailList().then(res => {
      this.updateDetailList(res.data)
    })
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
    goCountPage () {
      this.$router.push({
        path: 'countData'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bill-box {
  // padding-bottom: 80px;
  // box-sizing: border-box;
  .filter-box {
    /deep/ .el-form-item,  /deep/ .el-form-item__content,  /deep/ .el-select {
      width: 100%;
    }
  }
  .detail-box {
    padding: 0 20px;
  }
}
</style>
