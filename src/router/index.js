/*eslint-disable*/
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '../components/LoginPage.vue'
import HomePage from "../views/HomePage.vue";
import HeritageSitePage from "../views/HeritageSitePage.vue";
import HeritageSiteDetail from "../views/HeritageSiteDetail.vue";


const routes = [


    {
      path: "/",
      name: "homePage",
      component: HomePage,
    },

    {
      path: "/login",
      name: "loginPage",
      component: LoginPage,
    },

    {
      path: "/heritageSite",
      name: "heritagePage",
      component: HeritageSitePage,
    },


    {
      path: "/heritageSiteDetail",
      name: "heritageDetailPage",
      component: HeritageSiteDetail,
    },


];




const router = createRouter({

  history: createWebHistory(process.env.BASE_URL),
 
  routes, // short for `routes: routes`
})


export default router;