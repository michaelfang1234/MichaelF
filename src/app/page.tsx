import Link from "next/link";

const cards = [
  { title: "Live", desc: "See games happening now", path: "/live" },
  { title: "Matches", desc: "Schedule & results", path: "/matches" },
  { title: "Standings", desc: "League tables", path: "/standings" },
  { title: "Teams", desc: "Browse teams", path: "/teams" },
  { title: "Players", desc: "Player stats", path: "/players" },
  { title: "News", desc: "Latest updates", path: "/news" },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#0f1c34] via-[#0b1a33] to-[#1d1638] p-8">
        <h1 className="text-5xl font-semibold tracking-tight">HSPN Dashboard</h1>
        <p className="mt-3 text-xl text-slate-300">Premium motion + dynamic experience.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.title} href={c.path} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-4 font-semibold">{c.title}</h2>
              <span className="text-slate-400">→</span>
            </div>
            <p className="text-slate-300">{c.desc}</p>
            <p className="mt-4 text-sm text-slate-500">{c.path}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
