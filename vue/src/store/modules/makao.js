export default {
  namespaced: true,
  state: {
    players: {},
    created: false,
    stack: 0,
    board: {},
    whichTurn: "",
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
    },
    setBoard(state, { board }) {
      state.board = board;
    },
    setWhichTurn(state, { whichTurn }) {
      state.whichTurn = whichTurn;
    }

  },
  actions: {
    socket_cardsOnTable({commit}, { players, stack, board, whichTurn }) {
      commit("setPlayers", { players })
      commit("setStack", { stack: stack['cards'] })
      commit("setBoard", { board })
      commit("setWhichTurn", { whichTurn })
    },
  },
};
