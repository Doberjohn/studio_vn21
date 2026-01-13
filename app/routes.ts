import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/LandingPage.tsx"),
  route("dashboard", "./routes/DashboardPage.tsx"),
  route("storyManagementSection", "./routes/AdminPage.tsx"),
  route("storyManagementSection/new", "./routes/CreateStoryPage.tsx"),
  route("storyManagementSection/:id/edit", "./routes/EditStoryPage.tsx")
] satisfies RouteConfig;
