import LandingPage from "@/components/LandingPage";
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
  { path: "/", component: LandingPage }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})