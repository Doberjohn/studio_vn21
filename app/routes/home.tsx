import type { Route } from "./+types/home";
import { LandingPage } from "~/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studio VN21 Landing" },
    { name: "description", content: "Welcome to Studio VN21!" },
  ];
}

export default function Home() {
  return <LandingPage />;
}
