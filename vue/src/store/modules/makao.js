export default {
  namespaced: true,
  state: {
    players: {},
    created: false,
    stack: 0
  },
  mutations: {
    create(state) {
      state.created = true;
    },
    setPlayers(state, { players }) {
      state.players = players;
    },
    setStack(state, { stack }) {
      state.stack = stack;
    }
  },
  actions: {
    socket_cardsOnTable({commit}, { players, stack }) {
      commit("setPlayers", { players })
      commit("setStack", { stack: stack['cards'] })
    },
  },
};
