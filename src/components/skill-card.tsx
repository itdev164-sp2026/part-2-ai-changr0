import { LucideIcon } from "lucide-react";

interface SkillCardProps {
  name: string;
  icon: LucideIcon;
  description: string;
}

export function SkillCard({ name, icon: Icon, description }: SkillCardProps) {
  return (
    <div className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-semibold">{name}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
