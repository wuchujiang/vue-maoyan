import Vue from "vue";
import Router from "vue-router";
import Home from "@/page/Home";
import Movie from "@/page/Movie";
import Cinema from "@/page/Cinema";
import City from "@/page/City";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home,
      redirect: "/movie",
      children: [
        {
          path: "movie",
          component: Movie
        },
        {
          path: "cinema",
          component: Cinema
        }
      ]
    },
    {
      path: "/city",
      component: City
    }
  ]
});
