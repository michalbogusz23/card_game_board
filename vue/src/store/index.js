import { createStore } from "vuex";
import socket from "@/store/modules/socket";
export default createStore({
  modules: {
    socket
  },
  state: {
    username: "",
  },
  mutations: {
    SET_USERNAME(state): {

    }
  },
})