import { SiteShell } from "@/components/site-shell";
import { ArtifactCard } from "@/components/artifact-card";
import { artifacts } from "@/lib/content";

export default function LabPage() {
  const featured = artifacts.slice(0, 3);
  const archive = artifacts.slice(3);

  return (
    <SiteShell>
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Lab</p>
            <h1 className="mt-2 text-3xl font-semibold">Selling pack</h1>
          </div>
          <div className="text-sm text-muted">Mobile-safe proof first</div>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Three commercially legible artifacts first. Full archive stays below, ordered for review speed.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featured.map((artifact) => (
            <ArtifactCard key={artifact.name} artifact={artifact} />
          ))}
        </div>
        <h2 className="mt-10 text-sm uppercase tracking-[0.2em] text-muted">Archive</h2>
        <div className="mt-4 grid gap-4">
          {archive.map((artifact) => (
            <ArtifactCard key={artifact.name} artifact={artifact} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
