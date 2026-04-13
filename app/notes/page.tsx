import { SiteShell } from "@/components/site-shell";
import { notes } from "@/lib/content";

export default function NotesPage() {
  return (
    <SiteShell>
      <section>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Notes</p>
        <h1 className="mt-2 text-3xl font-semibold">Simple note list</h1>
        <div className="mt-6 grid gap-4">
          {notes.map((note) => (
            <article key={note.slug} className="border border-line bg-[#fbf8f3] p-4">
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="mt-2 text-sm text-muted">{note.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
