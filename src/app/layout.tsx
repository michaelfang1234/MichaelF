import "./globals.css";
import Link from "next/link";
import TopNav from "@/components/top-nav";
import TopSearch from "@/components/top-search";

export const metadata = {
  title: "Hiba Lions Dashboard",
  description: "Internal sports dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#020817] text-slate-100">
        <div className="mx-auto max-w-[1440px] px-4 py-4 md:px-6">
          <header className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-md border border-white/10 bg-white/5">
                <img src="/hiba-logo.png" alt="Hiba Lions logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <h1 className="text-[42px] leading-none font-bold tracking-tight">Hiba Lions</h1>
                <p className="text-[34px] leading-tight text-slate-300">Huili Sports Network</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <TopNav />
              <TopSearch />
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
