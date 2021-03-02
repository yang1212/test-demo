<template>
  <div class="common-box">
    <div class="sort-panel">
      <el-tag v-for="(item, index) in tagList" :key="index" :type="item.type" class="tag-btn">{{item.name}}</el-tag>
    </div>
    <el-divider content-position="right">Tiboo</el-divider>
    <div class="image-panel">
      <div v-for="(item, index) in waterfallList"
           class="item-box"
           :key="index"
           :style="{top:item.top +'px',left:item.left+'px',width:imgWidth+'px',height:item.height}">
        <img :src="item.url"/>
        <div class="footer-remark">{{item.date}}</div>
      </div>
    </div>
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
        { type: 'danger', name: '标签一标签一' },
        { type: 'success', name: '标签二' },
        { type: 'success', name: '标签二' },
        { type: 'info', name: '标签一' },
        { type: 'success', name: '标签二' },
        { type: 'warning', name: '标签一标签一' },
        { type: 'success', name: '标签二' },
        { type: 'danger', name: '标签一' },
        { type: 'success', name: '标签二' }
      ],
      waterfallList: [],
      imgData: [],
      imgCols: 5,
      imgRight: 10,
      imgBottom: 10,
      imgFooterHeight: 40, // 用于底部文案的高度
      screenWidth: document.body.clientWidth,
      deviationHeight: []
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    beforeUpload (file) {
      let fd = new FormData()
      fd.append('file', file)
      fd.append('name', file.name)
      fd.append('uid', file.uid)
      fd.append('dateTime', new Date())
    },
    calculateImgWidth () {
      this.imgWidth = (this.screenWidth - this.imgRight * this.imgCols) / this.imgCols
      this.deviationHeight = new Array(this.imgCols)
      for (let i = 0; i < this.deviationHeight.length; i++) {
        this.deviationHeight[i] = 0
      }
      this.imgPreloading()
    },
    imgPreloading () {
      this.waterfallList = []
      this.imgData.forEach((item, index) => {
        let tempImg = new Image()
        tempImg.src = item.url
        tempImg.onload = () => {
          let imgData = {}
          imgData.url = item.url
          imgData.height = this.imgWidth / tempImg.width * tempImg.height
          imgData.date = item.date
          imgData.name = item.name
          this.waterfallList.push(imgData)
          this.rankImg(imgData)
          console.log(55, this.waterfallList)
        }
      })
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
  position: relative;
  .sort-panel {
    width: 80%;
    .tag-btn {
      margin: 10px 20px;
    }
  }
  .upload-btn {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .image-panel {
    margin: 0 10px;
    position: relative;
    .item-box {
      position: absolute;
      background: #eee;
      border-radius: 10px;
      img {
        max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .footer-remark {
        margin: 15px 0 10px 0;
        font-size: 10px;
      }
    }
  }
}
</style>
