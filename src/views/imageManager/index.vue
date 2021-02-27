<template>
  <div class="common-box">
    <p>图像测试</p>
    <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :before-upload="beforeUpload"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import { sumbitImgData } from './server'

export default {
  name: 'imageManager',
  data () {
    return {
      uploadUrl: ''
    }
  },
  created () {
  },
  methods: {
    beforeUpload (file) {
      let fd = new FormData()
      fd.append('file', file)
      fd.append('name', file.name)
      fd.append('uid', file.uid)
      fd.append('dateTime', new Date())
      sumbitImgData(fd).then(res => {
        console.log(1, res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common-box {
}
</style>
