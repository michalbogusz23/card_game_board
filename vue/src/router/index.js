import LandingPage from "@/components/LandingPage";
import {createRouter, createWebHistory} from "vue-router";
import NewGameList from "@/components/NewGameList";
import MakaoSettings from "@/components/MakaoSettings";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/gameList", name: "gameList", component: NewGameList },
  { path: "/war", name: "war", component: MakaoSettings },
  { path: "/makao", name: "makao", component: MakaoSettings },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})