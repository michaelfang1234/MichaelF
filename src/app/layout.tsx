import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import PageTransition from "@/components/page-transition";

export const metadata = {
  title: "HSPN",
  description: "HSPN sports dashboard",
};

const nav = [
  { label: "Live", href: "/live" },
  { label: "Matches", href: "/matches" },
  { label: "Standings", href: "/standings" },
  { label: "Teams", href: "/teams" },
];

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
                <div className="text-4 font-semibold tracking-tight text-white">HSPN</div>
                <div className="text-xs text-slate-400">Sports dashboard</div>
              </div>
            </Link>

            <nav className="hidden gap-2 sm:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-100 transition hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
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
