<template>
  <div class="countData-box">
    <el-form :inline="true" :model="formData" class="form-box">
      <el-form-item>
        <el-date-picker
          v-model="formData.objDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="handleSearcDateChange">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>柱状图</span>
      </div>
      <div class="text item">
        <canvas id="myChart" width="400" height="260"></canvas>
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
        <canvas id="lineChart" width="400" height="300"></canvas>
      </div>
    </el-card>
  </div>
</template>

<script>
// import F2 from '@antv/f2'
import F2 from '@antv/f2/lib/index-all'
import { forTimeCount, forYearCount } from '@server/index'
let chart = null
let pieChart = null
let lineChart = null

export default {
  name: 'countData',
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
        objDate: '',
        startDate: '',
        endDate: ''
      },
      chartData: [],
      lineChartData: [],
      yearData: ''
    }
  },
  created () {
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
      chart.interval().position('type*value').color('type')

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
            text: data.type,
            fill: '#999'
          }
        }
      })
      pieChart.render()
    },
    initLineChart () {
      lineChart = new F2.Chart({
        id: 'lineChart',
        pixelRatio: window.devicePixelRatio
      })
      lineChart.source(this.lineChartData, {
        value: {
          tickCount: 5,
          min: 0
        },
        month: {
          range: [ 0, 1 ]
        }
      })
      lineChart.tooltip({
        showCrosshairs: true,
        showItemMarker: false,
        onShow: function onShow (ev) {
          const items = ev.items
          items[0].name = null
          items[0].value = '$ ' + items[0].value
        }
      })
      lineChart.axis('month', {
        label: function label (text, index, total) {
          const textCfg = {}
          if (index === 0) {
            textCfg.textAlign = 'left'
          } else if (index === total - 1) {
            textCfg.textAlign = 'right'
          }
          return textCfg
        }
      })
      lineChart.line().position('month*value')
      lineChart.point().position('month*value').style({
        stroke: '#fff',
        lineWidth: 1
      })
      lineChart.render()
    },
    initDate (tag) {
      // 处理默认时间
      const endDate = new Date()
      const startDate = new Date()
      const value = [startDate.getTime() - 3600 * 1000 * 24 * 7, endDate]
      this.formData.objDate = value
      this.handleSearcDateChange(value, tag)
      this.handleYearChange()
    },
    handleSearcDateChange (date, tag) {
      const searchDate = ['startDate', 'endDate']
      for (let i = 0; i < searchDate.length; i++) {
        this.formData[searchDate[i]] = this.format(new Date(date[i]))
      }
      // 根据日期选择请求数据
      this.getCountData(tag)
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
  // padding-bottom: 80px;
  // box-sizing: border-box;
  .form-box {
    text-align: center;
    /deep/ .el-form-item {
      margin-bottom: 15px;
    }
    /deep/ .el-form-item,  /deep/ .el-form-item__content {
      width: 100%;
      .el-date-editor {
        width: 90%;
      }
    }
  }
  .box-card {
    width: 90%;
    margin: 15px 5%;
  }
}
</style>
