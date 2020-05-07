import Home from "./views/Home/Home";
import About from "./views/About/About";

const routes = [
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    redirect: true,
    path: "/",
    to: "/home",
    name: "Home",
    component: Home
  }
];

export default routes;
