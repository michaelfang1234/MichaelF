import Link from "next/link";
import { notFound } from "next/navigation";

type Player = {
  id: string;
  name: string;
  sport: "Basketball" | "Volleyball";
  division: string;
  height: number;
  weight: number | null;
};

const players: Player[] = [
  { id: "michael", name: "Michael Fang", sport: "Basketball", division: "U19 Boys Basketball Team", height: 185, weight: 69 },
  { id: "andy", name: "Andy Gu", sport: "Basketball", division: "U19 Boys Basketball Team", height: 188, weight: 75 },
  { id: "ariel", name: "Ariel Pan", sport: "Volleyball", division: "U19 Girls Volleyball Team", height: 171, weight: null },
  { id: "michelle", name: "Michelle Xu", sport: "Volleyball", division: "U19 Girls Volleyball Team", height: 170, weight: null },
];

export default function PlayerDetailPage({ params }: { params: { id: string } }) {
  const p = players.find((x) => x.id === params.id);
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
      ) : (
        <section className="grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-slate-400">Kills</p><p className="text-2xl font-semibold">0.0</p></div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-slate-400">Blocks</p><p className="text-2xl font-semibold">0.0</p></div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-slate-400">Aces</p><p className="text-2xl font-semibold">0.0</p></div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-slate-400">Digs</p><p className="text-2xl font-semibold">0.0</p></div>
        </section>
      )}
    </main>
  );
}
