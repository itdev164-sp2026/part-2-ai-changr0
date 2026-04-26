"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const pageTitles: Record<string, string> = {
  "/": "Overview",
  "/projects": "Projects",
  "/settings": "Settings",
};

function normalizePath(pathname: string) {
  return pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
}

function getPageTitle(pathname: string) {
  return pageTitles[normalizePath(pathname)] ?? "Overview";
}

export function BreadcrumbNav() {
  const pathname = usePathname();
  const currentPage = getPageTitle(pathname);

  return (
    <Breadcrumb className="min-w-0">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">ITDEV-164</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
