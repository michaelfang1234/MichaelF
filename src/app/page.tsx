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
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            HSPN Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            A clean starting point. Next we’ll add real pages under{" "}
            <code className="rounded bg-white/10 px-2 py-1">src/app/*/page.tsx</code>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-sm text-cyan-200 ring-1 ring-cyan-400/20">
              App Router
            </span>
            <span className="rounded-full bg-purple-400/15 px-3 py-1 text-sm text-purple-200 ring-1 ring-purple-400/20">
              Tailwind CSS
            </span>
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200 ring-1 ring-emerald-400/20">
              Deployed on Vercel
            </span>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <a
            key={c.title}
            href={c.href}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{c.title}</h2>
              <span className="text-slate-400 transition group-hover:translate-x-0.5">
                →
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{c.desc}</p>
            <p className="mt-4 text-xs text-slate-500">{c.href}</p>
          </a>
        ))}
      </section>
    </div>
  );
}
