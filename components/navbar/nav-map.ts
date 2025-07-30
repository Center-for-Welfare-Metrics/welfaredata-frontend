import { Route } from "nextjs-routes";

type NavItem = {
  name: string;
  route: Route["pathname"];
  auth: boolean;
  super: boolean;
};

export const NavItens: NavItem[] = [
  {
    name: "Dashboard",
    route: "/admin",
    auth: true,
    super: false,
  },
  {
    name: "Admin Panel",
    route: "/admin/panel",
    auth: true,
    super: true,
  },
];
