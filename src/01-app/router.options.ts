import type { RouterConfig } from "@nuxt/schema";

export const enum RouteNamesEnum {
  Home = "home",
  Login = "login",
}

// https://router.vuejs.org/api/interfaces/routeroptions.html#routes
export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: RouteNamesEnum.Home,
      path: "/",
      component: () => import("pages/index"),
    },
    {
      name: RouteNamesEnum.Login,
      path: "/login",
      component: () => import("pages/passport/login"),
      meta: { layout: "passport" },
    },
  ],
};
