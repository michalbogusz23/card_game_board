export default {
  namespaced: true,
  state: {
    capacity: 0,
    players: {},
  },

  mutations: {
    setCapacity(state, { capacity }) {
      state.capacity = capacity
    },
    setPlayers(state, { players }) {
      state.players = players
    },
  },

  actions: {
    socket_joinedGame({commit}, { players }) {
      commit("setPlayers", { players })
      console.log("To tu", name);
    },
  },
  getters: {
    getPlayerName: (state) => (id) => {
      console.log("kiwi", state.players, id)
      return state.players[id].name
    }
  }
};
