import Link from "next/link";

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
    <div>
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8">
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.35),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.35),transparent_45%)]" />
        <div className="relative">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">HSPN Dashboard</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Fast, smooth, and ready for real sports data.</p>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{c.title}</h2>
              <span className="text-slate-400 transition group-hover:translate-x-0.5">→</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{c.desc}</p>
            <p className="mt-4 text-xs text-slate-500">{c.href}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
