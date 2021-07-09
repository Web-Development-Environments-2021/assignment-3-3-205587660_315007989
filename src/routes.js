import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/LeagueGames",
    name: "LeagueGames",
    component: () => import("./pages/LeagueGames")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/FavGames",
    name: "FavGames",
    component: () => import("./pages/FavGames")
  },
  {
    path: "/FavTeams",
    name: "FavTeams",
    component: () => import("./pages/FavTeams")
  },
  {
    path: "/FavPlayers",
    name: "FavPlayers",
    component: () => import("./pages/FavPlayers")
  },
  {
    path: "/Players/:id",
    name: "players",
    component: () => import("./pages/players")

  },
  {
    path: "/Coach/:id",
    name: "Coach",
    component: () => import("./pages/Coach")

  },
  {
    path: "/Team/:id",
    name: "Team",
    component: () => import("./pages/Team")

  },

  {
    path: "/AddResult",
    name: "AddResult",
    component: () => import("./pages/AddResult")
  },
  {
    path: "/AddEvent",
    name: "AddEvent",
    component: () => import("./pages/AddEvent")
  },
  {
    path: "/AddGame",
    name: "AddGame",
    component: () => import("./pages/AddGame"),
    beforeEnter: (to, from, next) => {
      const authUser=window.localStorage.getItem('username')
      console.log(authUser)
      console.log(32);
      console.log(to.name);
      if(to.name == "AddGame" && authUser=="admin"){
        console.log(3231);
         next()}
      
     else next(false);

    }
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  },
  {
    path: "/game",
    name: "game",
    component:()=>import("./pages/AdminPage")
  },
  {
    path: "/AdminPage",
    name: "AdminPage",
    component:()=>import("./pages/AdminPage"),
    beforeEnter: (to, from, next) => {
      const authUser=window.localStorage.getItem('username')
      console.log(authUser)
      console.log(32);
      console.log(to.name);
      if(to.name == "AdminPage" && authUser=="admin"){
        console.log(3231);
         next()}
      
     else next(false);

    }
  },
];

export default routes;
