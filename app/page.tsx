import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { ArtifactCard } from "@/components/artifact-card";
import { artifacts } from "@/lib/content";

export default function HomePage() {
  const featured = artifacts[0];
  const pack = artifacts.slice(0, 3);

  return (
    <SiteShell>
      <section className="grid gap-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Public proof surface</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Three proof units. One selling pack.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            ProofForge publishes compact artifacts that show promise, business value, and proof. Mobile review first. Noise last.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="border border-line bg-[#fbf8f3] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Publishing velocity</p>
            <p className="mt-2 text-2xl font-semibold">Weekly</p>
            <p className="mt-2 text-sm text-muted">One focused artifact plus one note at a time.</p>
          </div>
          <div className="md:col-span-2">
            <ArtifactCard artifact={featured} />
          </div>
        </div>

        <section>
          <h2 className="text-lg font-semibold">Selling pack</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {pack.map((artifact) => (
              <ArtifactCard key={artifact.name} artifact={artifact} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Featured artifacts</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {artifacts.map((artifact) => (
              <ArtifactCard key={artifact.name} artifact={artifact} />
            ))}
          </div>
        </section>

        <section className="border-y border-line py-5">
          <div className="flex flex-wrap gap-3 text-sm text-muted">
            <Link href="/lab" className="underline">Prompt Dojo</Link>
            <span>•</span>
            <Link href="/notes" className="underline">Publishing principles</Link>
            <span>•</span>
            <Link href="/about" className="underline">Commercial relevance</Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-line bg-[#fbf8f3] p-4">
            <h2 className="text-lg font-semibold">Commercial relevance</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Each public artifact should make a clear case for training, consulting, productization, or repeatable internal use.</p>
          </div>
          <div className="border border-line bg-[#fbf8f3] p-4">
            <h2 className="text-lg font-semibold">Contact</h2>
            <p className="mt-2 text-sm leading-6 text-muted">For collaboration, partnerships, or bespoke proof systems, use the about page contact block.</p>
          </div>
        </section>
      </section>
    </SiteShell>
  );
}
