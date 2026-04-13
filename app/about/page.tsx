import { SiteShell } from "@/components/site-shell";

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="grid gap-6 max-w-2xl">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">About</p>
          <h1 className="mt-2 text-3xl font-semibold">Positioning</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            ProofForge publishes small, high-signal artifacts that demonstrate capability, not volume.
          </p>
        </div>
        <div className="border border-line bg-[#fbf8f3] p-4">
          <h2 className="text-lg font-semibold">Offers and collaboration</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Useful for product teams, founders, and operators who need clear proof surfaces, content systems, or prompt-led training assets.
          </p>
        </div>
        <div className="border border-line bg-[#fbf8f3] p-4">
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Use the public repo issue tracker or your preferred direct channel for collaboration.</p>
        </div>
      </section>
    </SiteShell>
  );
}
