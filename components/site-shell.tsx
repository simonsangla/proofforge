import Link from "next/link";
import { TrackedButton } from "./analytics";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-sm">
          <Link href="/" className="font-medium tracking-wide">ProofForge</Link>
          <nav className="flex items-center gap-4 text-muted">
            <Link href="/lab">Lab</Link>
            <Link href="/notes">Notes</Link>
            <Link href="/about">About</Link>
            <TrackedButton 
              eventName="pwa_install_prompt_click"
              className="rounded bg-line/20 px-2 py-1 text-xs font-semibold transition-colors hover:bg-line/40 text-ink"
            >
              Install App
            </TrackedButton>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
