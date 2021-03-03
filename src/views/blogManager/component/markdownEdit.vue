<template>
  <div class="common-box">
    <div id="editorSection"></div>
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css' // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import Editor from '@toast-ui/editor' /* ES6 */
import defaultOptions from './defaultOptions'
import { sumbitImgData } from '../server'

export default {
  name: 'markdownEdit',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null
    }
  },
  computed: {
    editorOptions () {
      const options = Object.assign({}, defaultOptions)
      // options.hooks.addImageBlobHook = this.handleUpload
      return options
    }
  },
  created () {
  },
  mounted () {
    this.initEdit()
  },
  methods: {
    initEdit () {
      this.editor = new Editor({
        el: document.querySelector('#editorSection'),
        initialValue: this.content,
        height: '500px',
        initialEditType: 'markdown',
        language: 'zh-CN',
        previewStyle: 'vertical',
        ...this.editorOptions
      })
      // 删除默认监听事件
      this.editor.eventManager.removeEventHandler('addImageBlobHook')
      // 添加自定义监听事件
      this.editor.eventManager.listen('addImageBlobHook', (blob, callback) => {
        // 此处填写自己的上传逻辑，url为上传后的图片地址
        this.handleUpload(blob, url => {
          callback(url)
        })
      })
    },
    handleUpload (file) {
      let fd = new FormData()
      fd.append('file', file)
      fd.append('name', file.name)
      fd.append('uid', file.lastModified)
      return sumbitImgData(fd).then(res => {
        const editor = this.editor.getCodeMirror()
        editor.replaceSelection(`![img](../../../../static/${res.data.path})`)
      })
    },
    getMarkdown () {
      return this.editor.getMarkdown()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common-box {
}
</style>
