export default function TeamLoading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-4 py-10 sm:px-6">
      <div className="mb-6 h-4 w-32 rounded bg-card" />

      <div className="mb-8 flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-card" />
        <div>
          <div className="h-7 w-48 rounded bg-card" />
          <div className="mt-2 h-4 w-32 rounded bg-card" />
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl border border-border bg-card" />
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="h-64 rounded-xl border border-border bg-card" />
        <div className="h-64 rounded-xl border border-border bg-card" />
      </div>

      <div className="mt-8 h-72 w-full rounded-xl border border-border bg-card" />
    </div>
  );
}
