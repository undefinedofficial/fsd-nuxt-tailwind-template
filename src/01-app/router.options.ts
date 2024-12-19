import type { RouterConfig } from "@nuxt/schema";

// https://router.vuejs.org/api/interfaces/routeroptions.html#routes
export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: "home",
      path: "/",
      component: () => import("pages/index"),
    },
    {
      name: "login",
      path: "/login",
      component: () => import("pages/passport/login"),
    },
  ],
};
