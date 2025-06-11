import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      
      component: () => import("../views/LogIn.vue"),
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: () => import("../views/SignUp.vue"),
    },
    {
      path: "/welcome-page",
      name: "welcome-page",
      component: () => import("../views/WelcomePage.vue"),
    },
    {
      path: '/hospital-map',
      name: 'HospitalMap',
      component: () => import("../views/HospitalMap.vue"),
    },
    {
      path: '/find-hospital',
      name: 'find-hospital',
      component: () => import("../views/FindHospital.vue"),
    },
    {
      path: '/find-blood',
      name: 'find-blood',
      component: () => import("../views/FindBlood.vue"),
    },
    {
      path: '/blood-map',
      name: 'BloodMap',
      component: () => import("../views/BloodMap.vue"),
    },
    {
      path: '/blood-result',
      name: 'BloodResult',
      component: () => import("../views/BloodResult.vue"),
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import("../views/HospitalInventory.vue"),
    },
    {
      path: '/hospital-result',
      name: 'hospital-result',
      component: () => import("../views/HospitalResult.vue"),
    },
    {
      path: '/donor-quiz',
      name: 'donor-quiz',
      component: () => import("../views/DonorQuiz.vue"),
    },
    {
      path: '/hospital-request',
      name: 'hospital-request',
      component: () => import("../views/HospitalRequests.vue"),
    },
  ],
})

export default router
