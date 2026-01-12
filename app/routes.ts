import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/LandingPage2.tsx"),
  route("dashboard", "./routes/DashboardPage.tsx"),
] satisfies RouteConfig;
