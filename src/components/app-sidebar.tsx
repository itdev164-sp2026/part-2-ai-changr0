"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, FolderOpen, Home, LogOut, Settings } from "lucide-react";
import type { ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

import { ModeToggle } from "@/components/mode-toggle";
import { signOut } from "@/app/auth/actions";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    label: "Overview",
    href: "/",
    icon: Home,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const;

function normalizePath(pathname: string) {
  return pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
}

export function AppSidebar({ user }: { user: User | null }) {
  const pathname = usePathname();
  const normalizedPath = normalizePath(pathname);
  const { isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile, pathname, setOpenMobile]);

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b border-sidebar-border/70 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
            <BookOpen className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-tight">ITDEV-164</p>
            <p className="text-xs text-sidebar-foreground/70">
              Developer profile dashboard
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(({ label, href, icon: Icon }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    asChild
                    isActive={normalizedPath === href}
                    tooltip={label}
                  >
                    <Link href={href}>
                      <Icon />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <div className="space-y-4 p-4">
        <div className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/40 p-3">
          <p className="text-sm font-medium">Theme</p>
          <p className="mt-1 text-xs text-sidebar-foreground/70">
            Switch between light and dark modes.
          </p>
          <div className="mt-3">
            <ModeToggle />
          </div>
        </div>

        {user && (
          <div className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/40 p-3">
            <p className="text-sm font-medium truncate">{user.email}</p>
            <p className="mt-1 text-xs text-sidebar-foreground/70">
              Signed in as
            </p>
            <button
              onClick={() => signOut()}
              className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-sidebar-primary px-3 py-2 text-sm font-medium text-sidebar-primary-foreground hover:bg-sidebar-primary/90 transition-colors"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>

      <SidebarRail />
    </Sidebar>
  );
}

export function DashboardTopbar({ breadcrumb }: { breadcrumb: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6 lg:px-8">
      <SidebarTrigger className="-ml-1 z-30" />
      <div className="hidden h-4 w-px bg-border sm:block" />
      <div className="min-w-0">{breadcrumb}</div>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </header>
  );
}
