"use client";

import Link from "next/link";
import TopNav from "@/components/top-nav";
import TopSearch from "@/components/top-search";

export default function SiteHeader() {
  return (
    <header className="mb-4 flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-3">
        <div className="h-11 w-11 overflow-hidden rounded-md border border-white/15 bg-white/5">
          <img src="/hiba-logo.png" alt="Hiba Lions" className="h-full w-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold leading-tight">Hiba Lions</h1>
          <p className="text-xs text-slate-400">Huili Sports Network</p>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <TopNav />
        <TopSearch />
      </div>
    </header>
  );
}

