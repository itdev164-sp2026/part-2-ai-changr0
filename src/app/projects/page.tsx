export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Projects
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Selected Work</h1>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          A simple overview of coursework and practice builds that support the
          developer profile.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Course Projects</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Class assignments and exercises focused on layout, routing, and UI
            composition.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Practice Builds</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Small experiments used to refine React, Tailwind, and component
            development skills.
          </p>
        </div>
      </section>
    </div>
  );
}
