import { createStore } from "vuex";
import socket from "@/store/modules/socket";
export default createStore({
  modules: {
    socket
  },
  state() {
    return {

    }
  }
})