export default function Loading() {
  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="flex items-center justify-between border-b px-8 py-5">
        <div className="text-xl font-bold tracking-tight">
          BlackCap
        </div>

        <div className="flex items-center gap-6">
          <span className="text-zinc-400">Courses</span>
          <span className="text-zinc-400">Login</span>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-8 py-16">
        <div>
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-200" />

          <div className="mt-4 h-10 w-72 animate-pulse rounded bg-zinc-200" />

          <div className="mt-4 h-5 w-2/3 animate-pulse rounded bg-zinc-200" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-xl border p-6"
            >
              <div className="h-6 w-3/4 animate-pulse rounded bg-zinc-200" />

              <div className="mt-4 h-16 animate-pulse rounded bg-zinc-200" />

              <div className="mt-6 h-5 w-20 animate-pulse rounded bg-zinc-200" />

              <div className="mt-6 h-10 w-32 animate-pulse rounded bg-zinc-200" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}