import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getArtifactBySlug, getArtifactDetailCopy } from "@/lib/content";

export default function ArtifactPage({ params }: { params: { slug: string } }) {
  const artifact = getArtifactBySlug(params.slug);
  if (!artifact) return notFound();
  const detail = getArtifactDetailCopy(params.slug);

  return (
    <SiteShell>
      <article className="grid gap-6">
        <div className="grid gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">{artifact.category}</p>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">{artifact.name}</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted">{artifact.business_value}</p>
        </div>
        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-line bg-[#fbf8f3] p-4">
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted">What it does</h2>
            <p className="mt-2 text-sm leading-6">{artifact.promise}</p>
          </div>
          <div className="border border-line bg-[#fbf8f3] p-4">
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted">For whom</h2>
            <p className="mt-2 text-sm leading-6">{detail.audience}</p>
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-line bg-[#fbf8f3] p-4">
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted">Why it matters commercially</h2>
            <p className="mt-2 text-sm leading-6">{artifact.business_value}</p>
            <div className="mt-4 rounded border border-line bg-paper p-3 text-sm leading-6 text-muted">
              <span className="font-medium text-ink">Real demo:</span> {detail.demo}
            </div>
          </div>
          <div className="border border-line bg-[#fbf8f3] p-4">
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted">Public vs private</h2>
            <p className="mt-2 text-sm leading-6">{detail.publicPrivate}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div><dt className="text-muted">Status</dt><dd>{artifact.status}</dd></div>
              <div><dt className="text-muted">Protection level</dt><dd>{artifact.protection_level}</dd></div>
              <div><dt className="text-muted">Tech stack</dt><dd>{artifact.tech_stack.join(", ")}</dd></div>
            </dl>
          </div>
        </section>
        <section className="border border-line bg-[#fbf8f3] p-4">
          <h2 className="text-sm uppercase tracking-[0.2em] text-muted">Visual proof</h2>
          <div className="mt-3 overflow-hidden border border-line bg-paper">
            <Image src={artifact.capture} alt={artifact.name} width={1200} height={800} priority className="h-auto w-full" />
          </div>
          <p className="mt-3 text-xs leading-6 text-muted">
            Public capture is the proof asset. Private runtime, secrets, and internal engine pieces stay out of this repo.
          </p>
        </section>
      </article>
    </SiteShell>
  );
}
