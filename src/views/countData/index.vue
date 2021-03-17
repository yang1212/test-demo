<template>
  <div class="countData-box">
    <el-row>
      <el-form :model="formData">
        <el-col :span="10" :offset="1" class="col-input"><i class="el-icon-date"></i><el-input id="dateStart" v-model="formData.startDate"></el-input></el-col>
        <el-col :span="10" :offset="2" class="col-input"><i class="el-icon-date"></i><el-input id="dateEnd" v-model="formData.endDate"></el-input></el-col>
      </el-form>
    </el-row>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>柱状图</span>
      </div>
      <div class="text item">
        <canvas id="myChart" width="300" height="260"></canvas>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>饼图</span>
      </div>
      <div class="text item">
        <canvas id="pieChart" width="300" height="300"></canvas>
      </div>
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
import F2 from '@antv/f2/lib/index-all'
import Rolldate from 'rolldate'
import { forTimeCount, forYearCount } from '@server/index'
let chart = null
let pieChart = null

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
    initChart () {
      // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      // Step 1: 创建 Chart 对象
      chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      })

      // Step 2: 载入数据源
      chart.source(this.chartData)

      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.interval().position('label*value').color('label')

      // Step 4: 渲染图表
      chart.render()
    },
    initPieChart (value) {
      pieChart = new F2.Chart({
        id: 'pieChart',
        pixelRatio: window.devicePixelRatio
      })
      pieChart.source(value)
      pieChart.coord('polar', {
        transposed: true,
        radius: 0.9,
        innerRadius: 0.5
      })
      pieChart.axis(false)
      pieChart.legend(false)
      pieChart.tooltip(false)
      pieChart.guide()
        .html({
          position: [ '50%', '50%' ],
          html: '<div style="text-align: center;width:150px;height: 50px;">\n      <p style="font-size: 12px;color: #999;margin: 0" id="title"></p>\n      <p style="font-size: 18px;color: #343434;margin: 0;font-weight: bold;" id="money"></p>\n      </div>'
        })
      pieChart.interval()
        .position('const*value')
        .adjust('stack')
        .color('type', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14' ])
      pieChart.pieLabel({
        sidePadding: 30,
        activeShape: true,
        label1: function label1 (data) {
          return {
            text: '￥' + data.value,
            fill: '#343434',
            fontWeight: 'bold'
          }
        },
        label2: function label2 (data) {
          return {
            text: data.label,
            fill: '#999'
          }
        }
      })
      pieChart.render()
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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
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
      forYearCount({startDate: startDate, endDate: endDate}).then(res => {
        this.lineChartData = res.data
        this.initLineChart()
      })
    },
    getCountData (tag) {
      forTimeCount({ startDate: this.formData.startDate, endDate: this.formData.endDate }).then(res => {
        this.chartData = res.data
        if (tag) {
          this.initChart(this.chartData)
          this.initPieChart(this.filterData(this.chartData))
        } else {
          chart.changeData(this.chartData) // 更新图表数据
          pieChart.changeData(this.filterData(this.chartData)) // 更新图表数据
        }
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
