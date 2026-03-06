import Link from "next/link";
import SportsBar from "@/components/sports-bar";

const cards = [
  { title: "Live", desc: "See games happening now", href: "/live" },
  { title: "Matches", desc: "Schedule & results", href: "/matches" },
  { title: "Standings", desc: "League tables", href: "/standings" },
  { title: "Teams", desc: "Browse teams", href: "/teams" },
  { title: "Players", desc: "Player stats", href: "/players" },
  { title: "News", desc: "Latest updates", href: "/news" },
];

export default function HomePage() {
  return (
    <main className="space-y-6">
      <SportsBar />

      <section className="rounded-[28px] border border-white/10 bg-gradient-to-r from-[#102a56]/60 to-[#2c1a5f]/60 px-10 py-8">
        <h2 className="text-6xl font-semibold tracking-tight">Hiba Lions Dashboard</h2>
        <p className="mt-3 text-[40px] text-slate-200">Premium motion + dynamic experience.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-4xl font-semibold">{c.title}</h3>
              <span className="text-slate-400 transition group-hover:translate-x-1">→</span>
            </div>
            <p className="mt-2 text-slate-200">{c.desc}</p>
            <p className="mt-3 text-sm text-slate-500">{c.href}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
