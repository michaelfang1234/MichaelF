import Image from "next/image";
import "./globals.css";

export const metadata = {
  title: "HSPN",
  description: "HSPN site",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
  src="/logo.png"
  alt="HSPN logo"
  width={40}
  height={40}
  className="rounded-xl"
/>
              <div>
                <div className="text-lg font-semibold tracking-tight">HSPN</div>
                <div className="text-xs text-slate-400">Sports dashboard</div>
              </div>
            </div>

            <nav className="hidden gap-2 sm:flex">
              {["Live", "Matches", "Standings", "Teams"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
                >
                  {t}
                </span>
              ))}
            </nav>
          </header>

          <main className="mt-10">{children}</main>

          <footer className="mt-16 border-t border-white/10 pt-6 text-xs text-slate-400">
            Built with Next.js
          </footer>
        </div>
      </body>
    </html>
  );
}

