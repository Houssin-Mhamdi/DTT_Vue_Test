import { createRouter, createWebHistory } from "vue-router";

import Houses from "@/pages/Houses.vue";
import About from "@/pages/About.vue";
import CreateHouse from "@/pages/CreateHouse.vue";
import DetailsHouseView from "@/pages/DetailsHouseView.vue";
import EditListing from "@/pages/EditListing.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
const routes = [
  {
    path: "/",
    name: "Houses",
    component: Houses,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/create",
    name: "Create",
    component: CreateHouse,
  },
  {
    path: "/details/:id",
    name: "details-house",
    component: DetailsHouseView,
  },
  {
    path: "/edit/:id",
    name: "edit-listing",
    component: EditListing,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
