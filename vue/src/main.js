import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import store from "./store"
import router from "./router"
import quasarUserOptions from './quasar-user-options'
import VueSocketIOExt from "vue-socket.io-extended";
import { io } from 'socket.io-client';


let options = { transports: ["websocket"], rejectUnauthorized: false };
const ip = process.env.NODE_ENV === "development" ? "http://localhost:3003" : "http://3.92.77.186:3003/";
const socket = io(ip, options)

socket.request = function request(type, data = {}) {
  return new Promise((resolve, reject) => {
    socket.emit(type, data, (data) => {
      if (data.error) {
        reject(data.error);
      } else {
        resolve(data);
      }
    });
  });
};

const app = createApp(App)

app.use(Quasar, quasarUserOptions)
app.use(router);
app.use(store);
app.use(VueSocketIOExt, socket, { store })
app.mount('#app')
