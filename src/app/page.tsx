const headlines = [
  "Girls Volleyball secures key win in 5 sets",
  "Basketball team enters playoff race",
  "Football derby scheduled for Friday evening",
  "Track athletes set new school records",
  "Tennis doubles pair wins regional qualifier"
];

const quickLinks = [
  "Premier League","NBA","School Volleyball","Transfer News","Fantasy","Champions League","Formula 1"
];

export default function HomePage() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <aside className="glass rounded-2xl p-4 lg:col-span-3">
        <h2 className="mb-3 text-sm font-semibold text-slate-300">Quick Links</h2>
        <ul className="space-y-2 text-sm">
          {quickLinks.map((x) => (
            <li key={x} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">{x}</li>
          ))}
        </ul>
      </aside>

      <section className="glass rounded-2xl p-4 lg:col-span-6">
        <div className="mb-3 inline-flex rounded-full px-2 py-1 text-xs brand-pill">Top Story</div>
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5">
          <h1 className="text-2xl font-semibold">Welcome to HSPN</h1>
          <p className="mt-2 text-slate-300">
            ESPN-style portal with sport categories, match statuses, and dynamic schedule display.
          </p>
          <p className="mt-4 text-sm text-slate-400">Go to Matches to view by sport and status.</p>
        </div>
      </section>

      <aside className="glass rounded-2xl p-4 lg:col-span-3">
        <h2 className="mb-3 text-sm font-semibold text-slate-300">Top Headlines</h2>
        <ul className="space-y-2 text-sm">
          {headlines.map((h) => (
            <li key={h} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">{h}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
