import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

type ProjectStatus = "active" | "completed" | "archived";

interface Project {
  id: number | string;
  title: string;
  description: string | null;
  status: ProjectStatus | string;
}

function getStatusBadgeClasses(status: string) {
  const normalizedStatus = status.toLowerCase();

  return cn(
    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
    {
      "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200":
        normalizedStatus === "active",
      "border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-200":
        normalizedStatus === "completed",
      "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200":
        normalizedStatus === "archived",
      "border-border bg-muted text-muted-foreground":
        normalizedStatus !== "active" &&
        normalizedStatus !== "completed" &&
        normalizedStatus !== "archived",
    },
  );
}

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, description, status")
    .order("title", { ascending: true });

  const typedProjects: Project[] = (projects ?? []) as Project[];

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Projects
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Project Portfolio</h1>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          Live project data fetched directly from Supabase and presented in a
          clean dashboard layout.
        </p>
      </section>

      {error ? (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle>Unable to load projects</CardTitle>
            <CardDescription>
              {error.message ||
                "An unexpected error occurred while fetching project records."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : typedProjects.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No projects found</CardTitle>
            <CardDescription>
              The projects table is currently empty. Add records in Supabase to
              populate this view.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {typedProjects.map((project) => (
            <Card
              key={project.id}
              className="border border-border/70 shadow-sm"
            >
              <CardHeader className="gap-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg font-semibold leading-tight">
                    {project.title}
                  </CardTitle>
                  <span className={getStatusBadgeClasses(project.status)}>
                    {project.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description || "No description provided."}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
