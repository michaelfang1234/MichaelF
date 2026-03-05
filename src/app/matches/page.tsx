export default function MatchesPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Matches</h1>
      <p className="text-slate-300">Schedule & results.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Team A vs Team B · 19:30</div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Team C vs Team D · 21:00</div>
      </div>
    </main>
  );
}
