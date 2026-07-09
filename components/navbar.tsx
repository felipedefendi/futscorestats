export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-black text-accent-foreground">
            ⚽
          </span>
          <span className="text-lg font-bold tracking-tight">
            FutScoreStats
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
          <span className="text-foreground">Brasileirão Série A</span>
          <span aria-hidden>▾</span>
        </div>
      </nav>
    </header>
  );
}
