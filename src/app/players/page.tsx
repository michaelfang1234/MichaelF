import Link from "next/link";

const players = [
  { key: "michael", name: "Michael Fang", team: "U19 Boys Basketball Team", height: "185 cm", weight: "69 kg" },
  { key: "andy", name: "Andy Gu", team: "U19 Boys Basketball Team", height: "188 cm", weight: "75 kg" },
  { key: "ariel", name: "Ariel Pan", team: "U19 Girls Volleyball Team", height: "171 cm", weight: "53 kg" },
  { key: "michelle", name: "Michelle Xu", team: "U19 Girls Volleyball Team", height: "170 cm", weight: "58 kg" },
];

export default function PlayersPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Players</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {players.map((p) => (
          <article key={p.key} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-2xl font-semibold">{p.name}</h2>
            <p className="mt-1 text-slate-300">{p.team}</p>
            <p className="mt-1 text-sm text-slate-400">Height: {p.height} • Weight: {p.weight}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg border border-white/10 bg-black/20 p-2">PTS: 0.0</div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-2">REB: 0.0</div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-2">AST: 0.0</div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-2">FG%: 0.0</div>
            </div>
            <Link href="/" className="mt-3 inline-block text-sm text-slate-400 hover:text-white">Back to dashboard</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
