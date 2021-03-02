<template>
  <div class="common-box">
    <el-steps :active="1">
      <el-step title="步骤 1" icon="el-icon-edit"></el-step>
      <el-step title="步骤 2" icon="el-icon-upload"></el-step>
      <el-step title="步骤 3" icon="el-icon-picture"></el-step>
      <el-step title="步骤 4" icon="el-icon-upload"></el-step>
    </el-steps>
  </div>
</template>

<script>

export default {
  name: 'imageManager',
  data () {
    return {
      uploadUrl: '',
      tagList: [
        { type: 'success', name: '标签一标签一' },
        { type: 'success', name: '标签二标签一' },
        { type: 'info', name: '标签一标签一' },
        { type: 'success', name: '标签二' },
        { type: 'warning', name: '标签一' },
        { type: 'success', name: '标签二' },
        { type: 'danger', name: '标签一标签一' }
      ],
      waterfallList: [],
      imgData: [],
      imgCols: 5,
      imgRight: 10,
      imgBottom: 10,
      imgFooterHeight: 40, // 用于底部文案的高度
      screenWidth: document.body.clientWidth,
      deviationHeight: [],
      value1: 0,
      value2: 50,
      value3: 36,
      value4: 48,
      value5: 42
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    formatTooltip (val) {
      return val / 100
    },
    calculateImgWidth () {
      this.imgWidth = (this.screenWidth - this.imgRight * this.imgCols) / this.imgCols
      this.deviationHeight = new Array(this.imgCols)
      for (let i = 0; i < this.deviationHeight.length; i++) {
        this.deviationHeight[i] = 0
      }
      this.imgPreloading()
    },
    // 瀑布流布局
    rankImg (imgData) {
      let minIndex = this.filterMin()
      imgData.top = this.deviationHeight[minIndex]
      imgData.left = minIndex * (this.imgRight + this.imgWidth)
      console.log(88, imgData.top, imgData.left)
      this.deviationHeight[minIndex] += (imgData.height + this.imgBottom + this.imgFooterHeight)
    },
    // 找到最短的列并返回下标
    filterMin () {
      const min = Math.min.apply(null, this.deviationHeight)
      return this.deviationHeight.indexOf(min)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common-box {
  margin: 30px 0 0 30px;
}
</style>
