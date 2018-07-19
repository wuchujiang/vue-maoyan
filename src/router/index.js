import Vue from "vue";
import Router from "vue-router";
import Home from "@/page/Home";
import Movie from "@/page/Movie";
import Cinema from "@/page/Cinema";
import City from "@/page/City";
import CinemaMovie from "@/page/Cinema/Movie";
import Input from "@/page/Input";
import Select from "@/page/Select";
import Shows from "@/page/Shows";


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
        },
        {
          path: "cinema/movie/:id",
          name: "cinema-movie",
          component: CinemaMovie
        },
        {
          path: 'shows/:id',
          name: 'shows',
          component: Shows,
        }
      ]
    },
    {
      path: "/city",
      component: City
    },
    {
      path: "/input",
      component: Input,
      children: [
        {
          path: "select",
          component: Select
        }
      ]
    }
  ]
});
