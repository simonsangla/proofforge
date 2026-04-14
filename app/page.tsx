import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { ArtifactCard } from "@/components/artifact-card";
import { artifacts } from "@/lib/content";

import { TrackedLink } from "@/components/analytics";

export default function HomePage() {
  const featured = artifacts.find(a => a.status === "live_demo") || artifacts[0];
  const pack = artifacts.filter(a => a.protection_level === "limited");

  return (
    <SiteShell>
      <section className="grid gap-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Public proof surface</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl text-ink">Three proof units. One selling pack.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            ProofForge publishes compact artifacts that show promise, business value, and proof. Mobile review first. Noise last.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col justify-between border border-line bg-[#fbf8f3] p-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Publishing velocity</p>
              <p className="mt-3 text-3xl font-semibold text-ink">Weekly</p>
              <p className="mt-3 text-sm leading-6 text-muted">One focused artifact plus one note at a time.</p>
            </div>
            <TrackedLink href="/lab" eventName="homepage_lab_shortcut" className="mt-6 text-xs font-bold uppercase tracking-widest text-ink/40 underline underline-offset-8">Browse Lab →</TrackedLink>
          </div>
          <div className="md:col-span-2">
            <ArtifactCard artifact={featured} />
          </div>
        </div>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Selling pack (Selection)</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {pack.map((artifact) => (
              <ArtifactCard key={artifact.name} artifact={artifact} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Featured artifacts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {artifacts.map((artifact) => (
              <ArtifactCard key={artifact.name} artifact={artifact} />
            ))}
          </div>
        </section>

        <section className="border-y border-line py-6">
          <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <TrackedLink href="/lab" eventName="footer_link_lab" className="hover:text-ink">Prompt Dojo</TrackedLink>
            <span>•</span>
            <TrackedLink href="/notes" eventName="footer_link_notes" className="hover:text-ink">Publishing principles</TrackedLink>
            <span>•</span>
            <TrackedLink href="/about" eventName="footer_link_about" className="hover:text-ink">Commercial relevance</TrackedLink>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-line bg-[#fbf8f3] p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-ink">Commercial relevance</h2>
            <p className="mt-4 text-sm leading-7 text-muted">Each public artifact should make a clear case for training, consulting, productization, or repeatable internal use.</p>
          </div>
          <div className="border border-line bg-[#fbf8f3] p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-ink">Direct Outreach</h2>
            <p className="mt-4 text-sm leading-7 text-muted">For collaboration, partnerships, or bespoke proof systems, contact the architect directly.</p>
            <TrackedLink 
              href="/about" 
              eventName="homepage_contact_click"
              className="mt-6 inline-block bg-ink px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-90"
            >
              Contact Architect
            </TrackedLink>
          </div>
        </section>
      </section>
    </SiteShell>
  );
}

