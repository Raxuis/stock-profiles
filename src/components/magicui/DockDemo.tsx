import React, { SVGProps } from "react";

import { Dock, DockIcon } from "@/components/magicui/dock";
import Link from "next/link";
import { currentUser } from "@/auth/current-user";

import { routes } from "@/constants/availableRoutes";
import type { Route } from "@/constants/availableRoutes";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";

interface DockIconProps {
  route: Route,
  icon: React.ElementType,
  className?: string
}

export type IconProps = React.HTMLAttributes<SVGElement>;

export async function DockDemo() {
  const user = await currentUser();

  const DockIconComponent = ({ route, icon: Icon, className }: DockIconProps) => (
    <DockIcon className={cn("bg-black/10 px-3 dark:bg-white/10", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={route.path} className="size-full">
              <Icon className="size-full" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>{route.name}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DockIcon>
  );

  return (
    <div className="fixed bottom-2 z-50 flex w-full justify-center">
      <div className="relative">
        <Dock magnification={60} distance={100}>
          {routes.filter((route: Route) => route.needLogin ? user : true).map((route: Route) => (
            <DockIconComponent className="bg-black/10 px-3 dark:bg-white/10" key={route.path} route={route} icon={route.icon} />
          ))}
        </Dock>
      </div>
    </div>
  );
}
