const flightModule = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    updateListMutation (state, data) {
      const { result } = data;
      state.list = result;
    }
  },
  actions: {
    updateListAction({ commit, state }, payload) {
      commit('updateListMutation', {
        result: payload
      })
    }
  },
  getters: {
    list: function(store) {
      return store.list
    }
  }
}

export default flightModule