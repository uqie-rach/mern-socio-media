import { IRoute } from "@interfaces/";
import { UserRoutes, AuthRoutes, PostRoutes, CommentRoutes } from "@routes/";

const API_PREFIX = "/api";

const routes: IRoute[] = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  { 
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/post",
    route: PostRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
];

export default (app: any) => {
  routes.forEach(({ path, route, excludeAPIPrefix }) => {
    const routePath = excludeAPIPrefix ? path : API_PREFIX + path;
    app.use(routePath, route);
  });
};
