export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="h-8 w-64 rounded bg-card" />
          <div className="mt-2 h-4 w-40 rounded bg-card" />
        </div>
        <div className="h-6 w-32 rounded-full bg-card" />
      </div>

      <div className="h-6 w-40 rounded bg-card" />
      <div className="mt-4 overflow-hidden rounded-xl border border-border">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-border px-3 py-4 last:border-0">
            <div className="h-4 w-4 rounded bg-card" />
            <div className="h-6 w-6 rounded-full bg-card" />
            <div className="h-4 w-32 rounded bg-card" />
            <div className="ml-auto h-4 w-24 rounded bg-card" />
          </div>
        ))}
      </div>

      <div className="mt-8 h-80 w-full rounded-xl border border-border bg-card" />
    </div>
  );
}
