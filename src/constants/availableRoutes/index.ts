import { Activity, Building2, Fingerprint, Home, User, List } from "lucide-react";
import { ImNewspaper } from "react-icons/im";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

export type Route = {
  name: string;
  path: string;
  icon: React.ElementType;
  needLogin: boolean;
}

export const routes: Route[] = [
  {
    name: "Home",
    path: "/",
    icon: Home,
    needLogin: false,
  },
  {
    name: "Account",
    path: "/account",
    icon: User,
    needLogin: true,
  },
  {
    name: "Stock News",
    path: "/stock-news",
    icon: ImNewspaper,
    needLogin: true,
  },
  {
    name: "Stock List",
    path: "/stock-list",
    icon: List,
    needLogin: true,
  },
  {
    name: "Stock Profile",
    path: "/stock-profile",
    icon: Building2,
    needLogin: true,
  },
  {
    name: "Stock Chart",
    path: "/stock-chart",
    icon: Activity,
    needLogin: true,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: QuestionMarkIcon,
    needLogin: false,
  },
  {
    name: "About",
    path: "/about",
    icon: Fingerprint,
    needLogin: false,
  }
];
