import { ThemeProvider } from "../components/theme-provider";
import { SideBar } from "../components/SideBar";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-screen grid flex-1 md:grid-cols-[240px_1fr]">
            <aside className="hidden w-[240px] h-full flex-col md:flex">
              <SideBar />
            </aside>
            <div className="my-6 mx-6">
              {children}
            </div>

          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}
