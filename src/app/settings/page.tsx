export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Settings
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Preferences</h1>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          Use the theme toggle in the header or sidebar to switch appearance.
          This route is in place so the dashboard navigation stays complete.
        </p>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Appearance</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Theme control is available from the dashboard chrome and responds to
          the current system preference when set to system mode.
        </p>
      </section>
    </div>
  );
}
