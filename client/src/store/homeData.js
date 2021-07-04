const state = {
  pageType: '',
  detailList: []
}
const mutations = {
  updatePageMutation (state, paylod) {
    state.pageType = paylod
  },
  updateDetailListMutation (state, paylod) {
    state.detailList = paylod
  }
}
const actions = {
  updatePage ({ commit }, paylod) {
    commit('updatePageMutation', paylod)
  },
  updateDetailList ({ commit }, paylod) {
    commit('updateDetailListMutation', paylod)
  }
}
const getters = {
  pageType: state => state.pageType,
  detailList: state => state.detailList
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
