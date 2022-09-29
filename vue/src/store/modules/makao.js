export default {
  namespaced: true,
  state: {
    players: {},
    created: false,
    stack: 0,
    board: {},
    whichTurn: "",
    amountOfCardsToCollect: "",
    suitsChoice: "",
    demand: "",
    playersPaused: "",
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
    },
    setAmountOfCardsToCollect(state, { amountOfCardsToCollect }) {
      state.amountOfCardsToCollect = amountOfCardsToCollect;
    },
    setSuitsChoice(state, { suitsChoice }) {
      state.suitsChoice = suitsChoice;
    },
    setDemand(state, { demand }) {
      state.demand = demand;
    },
    setPlayersPaused(state, { playersPaused }) {
      state.playersPaused = playersPaused;
    },
    setRoundsToPause(state, { roundsToPause }) {
      state.roundsToPause = roundsToPause;
    }
  },
  actions: {
    socket_cardsOnTable({commit}, {
      players,
      stack,
      board,
      whichTurn,
      amountOfCardsToCollect,
      suitsChoice,
      demand,
      playersPaused,
      roundsToPause,
    }) {
      commit("setPlayers", { players })
      commit("setStack", { stack: stack['cards'] })
      commit("setBoard", { board })
      commit("setWhichTurn", { whichTurn })
      commit("setAmountOfCardsToCollect", { amountOfCardsToCollect })
      commit("setSuitsChoice", { suitsChoice })
      commit("setDemand", { demand })
      commit("setPlayersPaused", { playersPaused })
      commit("setRoundsToPause", { roundsToPause })
    },
  },
};
