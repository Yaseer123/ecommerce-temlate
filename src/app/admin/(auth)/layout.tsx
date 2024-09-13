import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Admin Auth",
  description: "Authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        {" "}
        <ClerkProvider>
          {/* Render the auth-related pages (sign-in, sign-up) */}
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
