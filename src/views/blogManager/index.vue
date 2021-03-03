<template>
  <div class="common-box">
    <el-row>
      <el-col :span="4">
        <div class="tree-list-box">
          <div class="create-box">
            <span>Article</span>
            <el-button size="small" class="create-btn" @click="handleCreate">Create</el-button>
          </div>
          <el-input
            class="search-box"
            prefix-icon="el-icon-search"
            placeholder="Find a article"
            v-model="filterText"
            size="small"
            clearable>
          </el-input>
          <el-tree
            ref="tree"
            node-key="_id"
            :data="treeData"
            :props="defaultProps"
            :load="loadNode"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            lazy
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content-box">
          <div class="flex_btns" v-if="treeData.length > 0 && selectId !== 'home'">
            <el-button icon="el-icon-edit" @click="updateDoc" size="small">编辑</el-button>
            <el-button icon="el-icon-delete" size="small" @click="handleDelete">删除</el-button>
          </div>
          <div class="content-container">
            <div v-show="pageType === 'home'">默认首页</div>
            <div v-show="pageType !== 'home'">
              <h3>{{title}}</h3>
              <div id="viewer"></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import hljs from 'highlight.js'
import { mapGetters, mapActions } from 'vuex'
import { getLifeData, getList, delData } from './server'

export default {
  name: 'HelloWorld',
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'title',
        isLeaf: 'isLeaf'
      },
      treeData: [],
      content: '',
      selectId: '',
      viewer: null,
      title: '',
      filterText: ''
    }
  },
  created () {
    this.selectId = this.$route.params.id
    this.selectId === 'home' ? this.updatePage('home') : this.updatePage('singleList')
  },
  mounted () {
    this.initData(this.selectId)
  },
  computed: {
    ...mapGetters([
      'pageType'
    ])
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    ...mapActions([
      'updatePage'
    ]),
    initData (id) {
      this.getListData()
      if (id !== 'home') { this.getContent(id) }
    },
    getListData () {
      getList({ parentId: -1 }).then(res => {
        if (res.resultCode === 200) {
          this.treeData = res.data
        }
      })
    },
    handleCreate () {
      const parentId = this.$route.params.id
      this.$router.push({
        path: '/addDoc/' + parentId
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    loadNode (node, resolve) {
      if (node.level > 0) {
        getList({ parentId: node.data._id }).then(res => {
          resolve(res.data)
          this.$nextTick(function () {
            this.$refs.tree.setCurrentKey(this.selectId)
          })
        })
      }
    },
    handleNodeClick (data) {
      if (this.pageType === 'home') { this.updatePage('singleList') }
      this.$router.push(
        { name: 'blogManager', params: { 'id': data._id } }
      )
      this.selectId = data._id
      this.getContent(this.selectId)
    },
    updateDoc () {
      this.$router.push({
        path: '/editDoc/' + this.selectId
      })
    },
    getContent (id) {
      this.renderView()
      getLifeData({_id: id}).then(res => {
        res = res.data
        if (res.length > 0) {
          this.content = res[0].content
          this.title = res[0].title
          this.viewer.setMarkdown(this.content)
        }
      })
    },
    renderView  () {
      this.viewer = new Viewer({
        el: document.querySelector('#viewer'),
        initialValue: this.content,
        plugins: [colorSyntax, [codeSyntaxHighlight, { hljs }]],
        language: 'zh-CN'
      })
    },
    handleDelete () {
      delData({id: this.selectId}).then(res => {
        if (res.resultCode === 200) {
          this.$router.push({
            path: '/blogManager/home'
          })
          this.updatePage('home')
          this.getListData()
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.common-box {
  height: 100%;
  .tree-list-box {
    color: #3572b0;
    height: 100%;
    padding: 0 15px;
    .create-box {
      margin: 20px 0 8px 0;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      .create-btn {
        font-size: 12px;
        text-align: center;
        text-align: center;
        border-radius: 8px;
        height: 28px;
        width: 55px;
        padding: 0;
      }
    }
    .search-box {
      margin-bottom: 10px;
    }
  }
  .content-box {
    border-left: 1px solid #e5e5e5;
    height: 100%;
    overflow: auto;
    .flex_btns{
      position: fixed;
      right: 20px;
      top: 80px;
      background-color: #ffffff;
      /deep/ .el-button{
        border: none;
        color: #178fff;
      }
      /deep/ .el-dropdown{
        color: #178fff;
      }
    }
    .content-container {
      padding: 10px 20px;
      margin-right: 200px;
    }
  }
}
</style>
