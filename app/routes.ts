import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/LandingPage.tsx"),
  route("dashboard", "./routes/DashboardPage.tsx"),
  route("adminManagementSection", "./routes/AdminDashboardPage.tsx"),
  route("adminManagementSection/stories", "./routes/AdminPage.tsx"),
  route("adminManagementSection/stories/new", "./routes/CreateStoryPage.tsx"),
  route(
    "adminManagementSection/stories/:id/edit",
    "./routes/EditStoryPage.tsx"
  ),
  route("adminManagementSection/collections", "./routes/CollectionsPage.tsx"),
  route("adminManagementSection/genres", "./routes/GenresPage.tsx")
] satisfies RouteConfig;
