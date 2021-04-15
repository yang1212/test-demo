<template>
  <div class="countData-box">
    <el-row>
      <el-form :model="formData">
        <el-col :span="10" :offset="1" class="col-input"><i class="el-icon-date"></i><el-input id="dateStart" v-model="formData.startDate"></el-input></el-col>
        <el-col :span="10" :offset="2" class="col-input"><i class="el-icon-date"></i><el-input id="dateEnd" v-model="formData.endDate"></el-input></el-col>
      </el-form>
    </el-row>
    <el-card class="box-card">
      <div id="myChart" style="width:100%; height:300px"></div>
    </el-card>
    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">
        <span>饼图</span>
      </div>
      <div class="text item">
        <canvas id="pieChart" width="300" height="300"></canvas>
      </div> -->
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="block">
          <el-date-picker
            v-model="yearData"
            type="year"
            placeholder="选择年"
            @change="handleYearChange">
          </el-date-picker>
        </div>
      </div>
      <div class="text item">
        <div id="lineChart" style="width:100%; height:300px"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Rolldate from 'rolldate'
import { forTimeCount, forYearCount } from '@server/index'

export default {
  name: 'countData',
  data () {
    return {
      formData: {
        startDate: '',
        endDate: ''
      },
      chartData: [],
      lineChartData: [],
      yearData: ''
    }
  },
  created () {
    // 处理默认时间
    this.yearData = new Date().getFullYear() + '-01-01'
    this.formData.endDate = this.format(new Date())
    this.formData.startDate = this.format(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7))
  },
  mounted () {
    // 将初始化时间放置于mounted原因：解决数据接口返回过快，此时DOM未渲染完，图表初始化报错
    this.initDate('init')
  },
  methods: {
    initChart (data) {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let option
      option = {
        color: ['#003366'],
        xAxis: {
          type: 'category',
          data: data.map((item) => item.label)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            barWidth: '25%',
            data: data.map((item) => item.value)
          }
        ]
      }
      option && myChart.setOption(option)
    },
    initPieChart () {
      // #1890FF', '#13C2C2', '#2FC25B', '#FACC14'
    },
    initLineChart () {
      let myChart = this.$echarts.init(document.getElementById('lineChart'))
      let option
      option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['综合', '生活', '饮食', '服饰']
        },
        dataZoom: [
          {
            type: 'inside', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0, // 左边在 10% 的位置。
            end: 40
          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          boundaryGap: false,
          max: 11
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '综合',
            type: 'line',
            data: this.lineChartData.total
          },
          {
            name: '生活',
            type: 'line',
            data: this.lineChartData.life
          },
          {
            name: '饮食',
            type: 'line',
            data: this.lineChartData.food
          },
          {
            name: '服饰',
            type: 'line',
            data: this.lineChartData.clothes
          }
        ]
      }
      option && myChart.setOption(option)
    },
    initDate (tag) {
      let self = this
      // eslint-disable-next-line no-new
      new Rolldate({
        el: '#dateStart',
        format: 'YYYY-MM-DD',
        confirm: function (date) {
          self.formData.startDate = date
          self.getCountData()
        }
      })
      // eslint-disable-next-line no-new
      new Rolldate({
        el: '#dateEnd',
        format: 'YYYY-MM-DD',
        confirm: function (date) {
          self.formData.endDate = date
          self.getCountData()
        }
      })
      // 根据日期选择初始化请求数据
      this.getCountData('init')
      this.handleYearChange(this.yearData)
    },
    handleYearChange (year) {
      const startDate = this.format(new Date(year))
      const endDate = startDate.slice(0, 4) + '-12-31'
      forYearCount({startDate: startDate, endDate: endDate, userId: JSON.parse(localStorage.getItem('userId'))}).then(res => {
        this.lineChartData = res.data
        this.initLineChart()
      })
    },
    getCountData (tag) {
      forTimeCount({ startDate: this.formData.startDate, endDate: this.formData.endDate, userId: JSON.parse(localStorage.getItem('userId')) }).then(res => {
        this.chartData = res.data
        this.initChart(this.chartData) // 更新柱状图表数据
        // if (tag) {
        //   this.initPieChart(this.filterData(this.chartData))
        // } else {
        //   pieChart.changeData(this.filterData(this.chartData)) // 更新图表数据
        // }
      })
    },
    filterData (value) {
      const tempData = value.filter((item, index) => {
        item.const = 'const'
        return item.value > 0
      })
      return tempData
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.countData-box {
  margin: 0 auto;
  .col-input {
    position: relative;
    i {
      position: absolute;
      top: 9px;
      left: 7px;
      z-index: 1;
    }
    /deep/ .el-input {
      input {
        padding-left: 30px;
      }
    }
  }
  .box-card {
    margin: 15px 15px;
  }
}
</style>
