import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import PageTransition from "@/components/page-transition";
import TopNav from "@/components/top-nav";

export const metadata = {
  title: "HSPN",
  description: "HSPN sports dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <header className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="HSPN logo"
                width={44}
                height={44}
                className="rounded-xl"
                priority
              />
              <div>
                <div className="text-lg font-semibold tracking-tight text-white">HSPN</div>
                <div className="text-xs text-slate-400">Sports dashboard</div>
              </div>
            </Link>
            <TopNav />
          </header>

          <main className="mt-10">
            <PageTransition>{children}</PageTransition>
          </main>

          <footer className="mt-16 border-t border-white/10 pt-6 text-xs text-slate-400">
            Built with Next.js
          </footer>
        </div>
      </body>
    </html>
  );
}
