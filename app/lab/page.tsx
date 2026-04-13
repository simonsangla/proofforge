import { SiteShell } from "@/components/site-shell";
import { ArtifactCard } from "@/components/artifact-card";
import { artifacts } from "@/lib/content";

export default function LabPage() {
  return (
    <SiteShell>
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Lab</p>
            <h1 className="mt-2 text-3xl font-semibold">Artifacts</h1>
          </div>
          <div className="text-sm text-muted">Filter placeholders only</div>
        </div>
        <div className="mt-6 grid gap-4">
          {artifacts.map((artifact) => (
            <ArtifactCard key={artifact.name} artifact={artifact} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
