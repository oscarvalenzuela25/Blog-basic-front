//Importar el Layout
import LayoutAdmin from "../layout/LayoutAdmin";
import LayoutBasic from "../layout/LayoutBasic";

//Admin Pages
import AdminHome from "../pages/admin";
import AdminSignIn from "../pages/admin/SignIn";
import AdminUsers from "../pages/admin/User";
import AdminMenuWeb from "../pages/admin/MenuWeb";
import AdminCourses from "../pages/admin/Courses";
import AdminBlog from "../pages/admin/Blog";

//Basic Pages
import Home from "../pages/Home";
import Items from "../pages/Items";
import Blog from "../pages/Blog";

//Otros
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true,
      },
      {
        path: "/admin/login",
        component: AdminSignIn,
        exact: true,
      },
      {
        path: "/admin/users",
        component: AdminUsers,
        exact: true,
      },
      {
        path: "/admin/menu",
        component: AdminMenuWeb,
        exact: true,
      },
      {
        path: "/admin/courses",
        component: AdminCourses,
        exact: true,
      },
      {
        path: "/admin/blog",
        component: AdminBlog,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/items",
        component: Items,
        exact: true,
      },
      {
        path: "/blog",
        component: Blog,
        exact: true,
      },
      {
        path: "/blog/:url",
        component: Blog,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
