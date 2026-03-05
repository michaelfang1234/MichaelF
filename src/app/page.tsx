export default function HomePage() {
  const quickLinks = [
    "SSSA Football League",
    "SSSA Basketball League",
    "SSSA Volleyball League",
    "SSSA Swimming League",
    "U19 Fixtures",
    "U15 Fixtures",
    "U13 Fixtures"
  ];

  const headlines = [
    "U19 Girls Volleyball: schedule published",
    "Basketball standings update coming soon",
    "Football scores module coming soon",
    "Swimming season updates coming soon"
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <aside className="glass rounded-2xl p-4 lg:col-span-3">
        <h2 className="mb-3 text-sm font-semibold text-slate-300">School Quick Links</h2>
        <ul className="space-y-2 text-sm">
          {quickLinks.map((x) => (
            <li key={x} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              {x}
            </li>
          ))}
        </ul>
      </aside>

      <section className="glass rounded-2xl p-4 lg:col-span-6">
        <div className="mb-3 inline-flex rounded-full px-2 py-1 text-xs brand-pill">Top Story</div>
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5">
          <h1 className="text-2xl font-semibold">Welcome to HSPN</h1>
          <p className="mt-2 text-slate-300">
            SSSA sports hub by sport, section, age and group.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Volleyball U19 Girls schedule is now live in Schedule tab.
          </p>
        </div>
      </section>

      <aside className="glass rounded-2xl p-4 lg:col-span-3">
        <h2 className="mb-3 text-sm font-semibold text-slate-300">Top Headlines</h2>
        <ul className="space-y-2 text-sm">
          {headlines.map((h) => (
            <li key={h} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              {h}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
