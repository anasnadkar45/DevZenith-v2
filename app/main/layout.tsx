import { ThemeProvider } from "../components/theme-provider";
import { SideBar } from "../components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
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
