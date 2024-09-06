import Vue from 'vue';
import Router from 'vue-router';

import PersonalBlog from './views/PersonalBlog.vue';
import UserProfileLite from './views/UserProfileLite.vue';
import AddNewPost from './views/AddNewPost.vue';
import Errors from './views/NotFound.vue';
import ComponentsOverview from './views/ComponentsOverview.vue';
import Tables from './views/Tables.vue';
import BlogPosts from './views/BlogPosts.vue';

import Campagne from "@/components/Campagne/Campagne.vue";
import Home from "@/views/Home.vue";
import CampaignDetails from "@/components/Campagne/CampaignDetails.vue";
import CampaignList from "@/components/Campagne/CampaignList.vue";
import AddEmployee from "@/views/AddEmployee.vue";
import Objectifs from "@/views/Objectifs.vue";
import Consulter from "@/components/Campagne/Consulter.vue";
import ObjectifsTracking from "@/views/ObjectifsTracking.vue";
import Equipe from "@/views/Equipe.vue";
import InterviewList from "@/views/InterviewList.vue";
import InterviewCalendar from "@/views/InterviewCalendar.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Evaluationreports from "@/views/Evaluationreports.vue";
import RespondForm from "@/components/Campagne/RespondForm.vue";
import AddEvaluation from "@/views/AddEvaluation.vue";
import EmployeeResponses from "@/components/Campagne/EmployeeResponses.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/blog-overview',
      name: 'blog-overview',
      component: PersonalBlog,
    },
    {
      path: '/respond',
      name: 'respond-form',
      component: RespondForm,
    },
    {
      path: '/user-profile-lite',
      name: 'user-profile-lite',
      component: UserProfileLite,
    },
    {
      path: '/addevaluation',
      name :'addevaluation',
      component : AddEvaluation
    },
    {
      path: '/add-new-post',
      name: 'add-new-post',
      component: AddNewPost,
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },
    {
      path: '/components-overview',
      name: 'components-overview',
      component: ComponentsOverview,
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables,
    },
    {
      path: '/blog-posts',
      name: 'blog-posts',
      component: BlogPosts,
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/campagne',
      name: 'campagne',
      component: Campagne,
    },
    {
      path: '/campaign-list',
      name: 'CampaignList',
      component: CampaignList
    },
    {
      path:'/report',
      name:'report',
      component: Evaluationreports
    },
    {
      path: '/campaign-details/:id',
      name: 'campaign-details',
      component: CampaignDetails,
    },
    {
      path: '/add-employee',
      name: 'add-employee',
      component: AddEmployee,
    },
    {
      path: '/consulter',
      name: 'consulter',
      component: CampaignList,
    },
    {
      path: '/interview-calendar',
      name: 'calendar',
      component: InterviewCalendar
    },
    {
      path: '/respond/:id',
      name: 'respond',
      component: RespondForm
    },

    {
      path: '/interview-list',
      name: 'list',
      component: InterviewList
    },
    {
      path :'/equipes',
      name:'equipes',
      component: Equipe
    },
    {
      path: '/objectifs-tracking',
      name: 'objectifs-tracking',
      component: ObjectifsTracking,
    },
    {
      path: '/objectifs',
      name: 'objectifs',
      component: Objectifs,
    },
    {
      path: '*',
      redirect: '/errors',
    },
  ],
});
