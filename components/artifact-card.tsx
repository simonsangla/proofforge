import Link from "next/link";
import type { Artifact } from "@/lib/content";

export function ArtifactCard({ artifact }: { artifact: Artifact }) {
  return (
    <article className="border border-line bg-[#fbf8f3] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{artifact.category}</p>
          <h3 className="mt-2 text-lg font-semibold">{artifact.name}</h3>
        </div>
        <span className="text-xs text-muted">{artifact.status}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink">{artifact.promise}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{artifact.business_value}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
        {artifact.tech_stack.map((item) => (
          <span key={item} className="border border-line px-2 py-1">{item}</span>
        ))}
      </div>
      <div className="mt-4">
        <Link className="text-sm underline" href={artifact.link}>Open proof</Link>
      </div>
    </article>
  );
}
