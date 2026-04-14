import type { Artifact } from "@/lib/content";
import { TrackedLink } from "./analytics";

const statusStyles: Record<string, string> = {
  live_demo: "text-emerald-700 bg-emerald-50 border-emerald-200",
  internal_harness: "text-amber-700 bg-amber-50 border-amber-200",
  spec_only: "text-zinc-500 bg-zinc-50 border-zinc-200",
  protected: "text-rose-700 bg-rose-50 border-rose-200",
};

export function ArtifactCard({ artifact }: { artifact: Artifact }) {
  const statusColor = statusStyles[artifact.status] || statusStyles.spec_only;

  return (
    <article className="group relative flex h-full flex-col border border-line bg-[#fbf8f3] p-5 transition-all hover:border-ink/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted">{artifact.category}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{artifact.name}</h3>
        </div>
        <span className={`border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${statusColor}`}>
          {artifact.status.replace("_", " ")}
        </span>
      </div>
      
      <p className="mt-4 flex-grow text-sm leading-6 text-ink/80">{artifact.promise}</p>
      
      <div className="mt-6 flex flex-col gap-4">
        <p className="text-xs italic leading-relaxed text-muted">
          <span className="font-semibold uppercase not-italic tracking-wider text-ink/40">Value:</span> {artifact.business_value}
        </p>
        
        <div className="flex items-center justify-between border-t border-line pt-4">
          <div className="flex flex-wrap gap-1.5">
            {artifact.tech_stack.slice(0, 2).map((item) => (
              <span key={item} className="text-[10px] text-muted-foreground underline decoration-ink/10 underline-offset-4">{item}</span>
            ))}
          </div>
          <TrackedLink 
            href={artifact.link}
            eventName="open_proof_click"
            className="text-xs font-semibold uppercase tracking-widest text-ink hover:underline underline-offset-8" 
          >
            Open Proof →
          </TrackedLink>
        </div>
      </div>
    </article>
  );
}


