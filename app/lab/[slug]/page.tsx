import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getArtifactBySlug } from "@/lib/content";

export default function ArtifactPage({ params }: { params: { slug: string } }) {
  const artifact = getArtifactBySlug(params.slug);
  if (!artifact) return notFound();

  return (
    <SiteShell>
      <article className="grid gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">{artifact.category}</p>
          <h1 className="mt-2 text-3xl font-semibold">{artifact.name}</h1>
        </div>
        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-line bg-[#fbf8f3] p-4">
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted">Promise</h2>
            <p className="mt-2 text-sm leading-6">{artifact.promise}</p>
          </div>
          <div className="border border-line bg-[#fbf8f3] p-4">
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted">Business value</h2>
            <p className="mt-2 text-sm leading-6">{artifact.business_value}</p>
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-line bg-[#fbf8f3] p-4">
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted">Visual proof</h2>
            <div className="mt-3 overflow-hidden border border-line bg-paper">
              <Image src={artifact.capture} alt={`${artifact.name} capture placeholder`} width={1200} height={800} className="h-auto w-full" />
            </div>
          </div>
          <div className="border border-line bg-[#fbf8f3] p-4">
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted">Public vs private</h2>
            <p className="mt-2 text-sm leading-6">
              This page exposes the public proof only. Private engine logic, credentials, and internal implementation remain outside this repo.
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div><dt className="text-muted">Status</dt><dd>{artifact.status}</dd></div>
              <div><dt className="text-muted">Protection level</dt><dd>{artifact.protection_level}</dd></div>
              <div><dt className="text-muted">Tech stack</dt><dd>{artifact.tech_stack.join(", ")}</dd></div>
            </dl>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
