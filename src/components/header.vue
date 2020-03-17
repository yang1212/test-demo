<template>
  <div class="header">
    <h3>Tiboo</h3>
    <div class="tab-option">
      <div v-for="(item, index) in tabOption" :key="index"  @click="updateTabOption(item.routeName)" class="tab-option-item">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerTab',
  data() {
    return {
      tabOption: [{
        name: '视频',
        routeName: 'tab1',
      }, {
        name: '音乐',
        routeName: 'tab2',
      }, {
        name: '收藏',
        routeName: 'tab3',
      }]
    }
  },
  methods: {
    updateTabOption(routeName) {
      this.$router.push({ name: routeName });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
.header {
  display: flex;
  justify-content: space-between;
  background: #283282;
  height: 45px;
  line-height: 45px;
  padding-left: 20px;
  h3 {
    color: #fff;
  }
  .tab-option {
    .tab-option-item {
      display: inline-block;
      padding: 0 20px;
      font-size: 14px;
      color: #fff;
    }
  }
}

</style>
