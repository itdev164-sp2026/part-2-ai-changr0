import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { AppSidebar, DashboardTopbar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rickey Chang — Developer Profile",
  description:
    "Web development student proficient in React, GraphQL, GitHub, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            <SidebarProvider defaultOpen>
              <AppSidebar />
              <SidebarInset>
                <DashboardTopbar />
                <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                  <div className="mx-auto w-full max-w-6xl">{children}</div>
                </div>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
