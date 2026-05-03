"use server";

import { projectSchema, type Project } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";

export async function createProject(
  data: unknown,
): Promise<{ success: boolean; error?: string }> {
  // Validate data with Zod schema
  const validationResult = projectSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: "Validation failed: " + validationResult.error.message,
    };
  }

  const validatedData: Project = validationResult.data;

  try {
    const { error } = await supabase.from("projects").insert([
      {
        title: validatedData.title,
        description: validatedData.description,
        status: validatedData.status,
      },
    ]);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Error creating project:", err);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
