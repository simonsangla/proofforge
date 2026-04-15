import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getArtifactBySlug, getArtifactDetailCopy } from "@/lib/content";
import { TrackedLink, TrackedButton } from "@/components/analytics";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artifact = getArtifactBySlug(slug);
  if (!artifact) return { title: "Not Found" };

  return {
    title: `${artifact.name} | ProofForge`,
    description: artifact.promise,
    openGraph: {
      title: artifact.name,
      description: artifact.promise,
      images: [{ url: artifact.capture }],
    },
  };
}

export default async function ArtifactPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artifact = getArtifactBySlug(slug);
  if (!artifact) return notFound();
  const detail = getArtifactDetailCopy(slug);

  const protectionLevelValue = (artifact.protection_level === "private") ? 2 : (artifact.protection_level === "protected" ? 3 : (artifact.protection_level === "limited" ? 1 : 0));
  const showCTA = protectionLevelValue > 1;

  return (
    <SiteShell>
      <article className="grid gap-10">
        <header className="grid gap-4 border-b border-line pb-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">{artifact.category}</p>
            <time className="text-[10px] tabular-nums tracking-widest text-muted">{artifact.date}</time>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-6xl">{artifact.name}</h1>
          <p className="max-w-3xl text-lg leading-8 text-muted">{artifact.business_value}</p>
        </header>

        <section className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="group relative overflow-hidden border border-line bg-paper">
              <Image src={artifact.capture} alt={artifact.name} width={1200} height={800} priority className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]" />
            </div>
            <p className="mt-4 text-xs italic text-muted">Proof Capture Component (Field 8)</p>
          </div>

          <aside className="flex flex-col gap-8">
            {showCTA && (
              <div className="border border-rose-200 bg-rose-50 p-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-rose-800">Protected Asset (Conversion)</h2>
                <p className="mt-3 text-sm leading-6 text-rose-700">Detailed proof for this artifact requires clearance.</p>
                <TrackedButton 
                  eventName="request_proof_access" 
                  className="mt-5 w-full bg-rose-700 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-rose-800"
                >
                  Request Proof Access
                </TrackedButton>
              </div>
            )}

            <div className="border border-line bg-[#fbf8f3] p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">The Promise (Field 3)</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-ink">{artifact.promise}</p>
            </div>

            <div className="border border-line bg-[#fbf8f3] p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Governance (Fields 5, 6, 7)</h2>
              <dl className="mt-4 grid grid-cols-2 gap-y-4 text-sm">
                <dt className="text-muted">Status</dt>
                <dd className="font-semibold text-ink">{artifact.status}</dd>
                
                <dt className="text-muted">Protection</dt>
                <dd className="font-semibold text-ink">{artifact.protection_level}</dd>

                <dt className="text-muted">Reference</dt>
                <dd className="truncate font-mono text-[10px] text-muted-foreground underline">{artifact.link}</dd>
              </dl>
            </div>

            <div className="border border-line bg-[#fbf8f3] p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Stack (Field 9)</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {artifact.tech_stack.map((item) => (
                  <li key={item} className="border border-line bg-white px-2 py-1 text-[10px] font-medium tracking-wide uppercase text-ink/60">{item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 border-t border-line pt-10 md:grid-cols-2">
          <div className="p-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Audience Persona</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{detail.audience}</p>
          </div>
          <div className="p-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Demo Integrity</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{detail.demo}</p>
            <div className="mt-4 border-l-2 border-line pl-4 text-xs leading-6 text-muted-foreground italic">
              {detail.publicPrivate}
            </div>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}

