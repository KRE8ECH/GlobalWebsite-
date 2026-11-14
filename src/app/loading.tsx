/** Skeleton shown while a server component streams in. */
export default function Loading() {
  return (
    <div className="container-page py-16" role="status" aria-label="Loading page">
      <div className="h-6 w-40 animate-pulse rounded-sm bg-stone-200" />
      <div className="mt-4 h-10 w-3/4 animate-pulse rounded-sm bg-stone-200" />
      <div className="mt-3 h-4 w-2/3 animate-pulse rounded-sm bg-stone-100" />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((key) => (
          <div key={key} className="h-32 animate-pulse rounded-md bg-stone-100" />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
