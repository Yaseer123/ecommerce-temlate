import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { AuroraBackground } from "~/components/ui/aurora-background";
import { ThemeProvider } from "~/components/ui/theme-provider";
import { DarkModeToggle } from "~/components/ui/DarkModeToggle";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DarkModeToggle />
          <AuroraBackground>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </AuroraBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
