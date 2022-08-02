import { createStore } from "vuex";
import socket from "@/store/modules/socket";
import room from "@/store/modules/room";
import makao from "@/store/modules/makao";
export default createStore({
  modules: {
    socket,
    room,
    makao
  },
  state: {
    username: "",
    id: "",
  },
  mutations: {
    setUsername(state, { username }) {
      state.username = username
    },
    setId(state, { id }) {
      state.id = id
    }
  },
})
