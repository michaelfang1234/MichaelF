import Link from "next/link";
import { notFound } from "next/navigation";
import { PLAYERS } from "@/data/players";

export default function PlayerDetailPage({ params }: { params: { id: string } }) {
  const p = PLAYERS.find((x) => x.id === params.id);
  if (!p) return notFound();

  return (
    <main className="space-y-5">
      <Link href="/players" className="text-sm text-slate-400 hover:text-white">← Back to Players</Link>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h1 className="text-4xl font-semibold">{p.name}</h1>
        <p className="mt-2 text-slate-300">{p.division}</p>
        <p className="mt-1 text-slate-400">
          Height: {p.height} cm • Weight: {p.weight === null ? "unknown" : `${p.weight} kg`}
        </p>
      </section>

      {p.sport === "Basketball" ? (
        <section className="grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-slate-400">PTS</p><p className="text-2xl font-semibold">0.0</p></div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-slate-400">REB</p><p className="text-2xl font-semibold">0.0</p></div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-slate-400">AST</p><p className="text-2xl font-semibold">0.0</p></div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-slate-400">FG%</p><p className="text-2xl font-semibold">0.0</p></div>
        </section>
      ) : p.sport === "Volleyball" ? (
        <section className="grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-slate-400">Kills</p><p className="text-2xl font-semibold">0.0</p></div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-slate-400">Blocks</p><p className="text-2xl font-semibold">0.0</p></div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-slate-400">Aces</p><p className="text-2xl font-semibold">0.0</p></div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-slate-400">Digs</p><p className="text-2xl font-semibold">0.0</p></div>
        </section>
      ) : (
        <section className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-300">
          Stats for {p.sport} coming soon.
        </section>
      )}
    </main>
  );
}
