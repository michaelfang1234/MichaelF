import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import SportsBar from "@/components/sports-bar";
import TopSearch from "@/components/top-search";

export const metadata = {
  title: "Hiba Lions",
  description: "Huili Sports Network",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="border-b border-white/10 bg-black/30 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <Link href="/#reset" className="flex items-center gap-3">
                <Image src="/logo.png" alt="Hiba Lions" width={40} height={40} className="rounded-lg" priority />
                <div>
                  <div className="font-semibold">Hiba Lions</div>
                  <div className="text-xs text-slate-400">Huili Sports Network</div>
                </div>
              </Link>

              <div className="flex items-center gap-3">
                <div className="hidden text-xs text-slate-300 md:block">Live • Scores • News</div>
                <TopSearch />
              </div>
            </div>

            <SportsBar />
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
