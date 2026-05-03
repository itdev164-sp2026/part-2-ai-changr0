"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";

import { projectSchema, type Project } from "@/lib/schemas";
import { createProject } from "@/app/actions";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: "active",
    },
  });

  const status = watch("status");

  const onSubmit = async (data: Project) => {
    setIsSubmitting(true);
    try {
      const result = await createProject(data);

      if (result.success) {
        toast.success("Project created successfully!");
        // Reset form or redirect here if needed
      } else {
        toast.error(result.error || "Failed to create project");
      }
    } catch (error) {
      toast.error("An error occurred while creating the project");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          Create New Project
        </h1>
        <p className="text-muted-foreground">
          Add a new project to your portfolio.
        </p>
      </div>

      <Field>
        <FieldLabel>
          <span>Title</span>
        </FieldLabel>
        <FieldContent>
          <Input
            placeholder="Enter project title"
            {...register("title")}
            aria-invalid={!!errors.title}
          />
          <FieldError errors={errors.title ? [errors.title] : []} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>
          <span>Description</span>
        </FieldLabel>
        <FieldContent>
          <Textarea
            placeholder="Enter project description"
            {...register("description")}
            aria-invalid={!!errors.description}
          />
          <FieldError errors={errors.description ? [errors.description] : []} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>
          <span>Status</span>
        </FieldLabel>
        <FieldContent>
          <Select
            value={status}
            onValueChange={(value) =>
              setValue("status", value as "active" | "completed" | "archived")
            }
          >
            <SelectTrigger aria-invalid={!!errors.status}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <FieldError errors={errors.status ? [errors.status] : []} />
        </FieldContent>
      </Field>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
