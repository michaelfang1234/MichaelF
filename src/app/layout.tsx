import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Hiba Lions Dashboard",
  description: "Internal sports dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-[1440px] px-4 py-4 md:px-6">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
