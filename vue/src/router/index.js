import LandingPage from "@/components/LandingPage";
import {createRouter, createWebHistory} from "vue-router";
import NewGameList from "@/components/NewGameList";
import MakaoCreator from "@/components/MakaoCreateor";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/gameList", name: "gameList", component: NewGameList },
  { path: "/war", name: "war", component: MakaoCreator },
  { path: "/makao", name: "makao", component: MakaoCreator },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
