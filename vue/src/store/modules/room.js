export default {
  namespaced: true,
  state: {
    capacity: 0,
    players: {}
  },

  mutations: {
    setCapacity(state, { capacity }) {
      state.capacity = capacity
    },
    setPlayers(state, { players }) {
      state.players = players
    }
  },

  actions: {
    socket_joinedGame(_, {name}) {
      console.log("To tu", name);
    }
  },
};
