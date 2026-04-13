import Link from "next/link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-sm">
          <Link href="/" className="font-medium tracking-wide">ProofForge</Link>
          <nav className="flex gap-4 text-muted">
            <Link href="/lab">Lab</Link>
            <Link href="/ideas">Ideas</Link>
            <Link href="/notes">Notes</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
