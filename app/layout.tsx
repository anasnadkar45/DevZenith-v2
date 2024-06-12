import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { cn } from "@/lib/utils";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { SideBar } from "./components/SideBar";
import { Toaster } from "sonner";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Navbar } from "./components/Navbar";
import BottomBar from "./components/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  return (
    <html lang="en">
      <body>
        <main className="custom-scrollbar">
          <NextSSRPlugin
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="h-screen grid flex-1 md:grid-cols-[240px_1fr] pt-14">
              <aside className="hidden w-[240px] h-full flex-col md:flex">
                <SideBar />
              </aside>
              <div className="m-3 pb-32 lg:pb-0 lg:m-6 ">
                {children}
              </div>
              <BottomBar />
            </div>
          </ThemeProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
