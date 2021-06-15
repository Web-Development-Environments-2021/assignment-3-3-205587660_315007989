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
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
