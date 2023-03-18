import NotFoundVue from "@/components/NotFound.vue";
import RepositoryListVue from "@/components/RepositoryList.vue";
import RepoDetailsVue from "@/components/RepoDetails.vue";
import AboutApp from "@/components/AboutApp.vue";
// import Vue from "vue";

import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "name",
      component: RepositoryListVue,
    },
    { path: "/notfound", name: "not found", component: NotFoundVue },
    {
      path: "/repodetails/:repoName",
      name: "details",
      component: RepoDetailsVue,
    },
    { path: "/about", name: "about", component: AboutApp },
  ],
});

export default router;
