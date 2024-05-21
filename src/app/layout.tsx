import type { Metadata } from "next";

import "./globals.css";
import { Header } from "./components";
import { getAuthenticatedAppForUser } from "../lib/serverApp";

export const metadata: Metadata = {
  title: "Next.js on Firebase App Hosting",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <html lang="en" className="dark-theme">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="dots" />
        <Header currentUser={currentUser?.toJSON()}/>
        {children}
        <div className="bottom-gradient" />
      </body>
    </html>
  );
}
