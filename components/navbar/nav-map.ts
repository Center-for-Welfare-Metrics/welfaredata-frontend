import { Route } from "nextjs-routes";

type NavItem = {
  name: string;
  route: Route["pathname"];
  auth: boolean;
};

export const NavItens: NavItem[] = [
  {
    name: "Dashboard",
    route: "/admin",
    auth: true,
  },
];
