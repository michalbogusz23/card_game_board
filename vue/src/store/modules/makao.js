export default {
  namespaced: true,
  state: {
    players: [],
    created: false
  },
  mutations: {
    create(state) {
      state.created = true;
    }
  },
  actions: {

  },
};
