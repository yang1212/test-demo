<template>
  <div class="page1-box">
    <div class="video-list">
      <div class="list-title">
        {{$route.params.userId}}
        <!-- {{list}} -->
      </div>
    </div>
  </div>
</template>

<script>
import getFlightDetail from '@/service/common'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
    }
  },
  created() {
    this.getListData()
  },
  computed: {
    ...mapGetters('flightModule', [
      'list'
    ]),
  },
  methods: {
    ...mapActions('flightModule', [
      'updateListAction'
    ]),
    async getListData() {
      let res = await getFlightDetail()
      this.updateListAction(res)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.page1-box {
  background: #eee;
  .video-list {
    margin-bottom: 10px;
    .list-title {
      background: #fff;
      padding: 8px 5px;
    }
  }
}
</style>
