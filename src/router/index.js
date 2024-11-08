/*eslint-disable*/
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '../components/LoginPage.vue'
import HomePage from "../views/HomePage.vue";
import HeritageSitePage from "../views/HeritageSitePage.vue";
import HeritageSiteDetail from "../views/HeritageSiteDetail.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import AdminLoginPage from "@/components/AdminLoginPage.vue";


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
      path: "/register",
      name: "registerPage",
      component: RegisterPage,
    },

    {
      path: "/heritageSite",
      name: "heritagePage",
      component: HeritageSitePage,
    },


    {
      path: "/heritageSiteDetail/:id",
      name: "heritageDetailPage",
      component: HeritageSiteDetail,
    },


    {
      path: "/adminLogin",
      name: "adminLoginPage",
      component: AdminLoginPage,
    },


];




const router = createRouter({

  history: createWebHashHistory(),
  routes,

})


export default router;