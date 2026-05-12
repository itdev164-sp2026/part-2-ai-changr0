"use server";

import { redirect } from "next/navigation";
import {
  signInSchema,
  signUpSchema,
  type SignIn,
  type SignUp,
} from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function signIn(data: unknown): Promise<{
  success: boolean;
  error?: string;
}> {
  const validationResult = signInSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: "Validation failed: " + validationResult.error.message,
    };
  }

  const validatedData: SignIn = validationResult.data;

  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  } catch (err) {
    console.error("Error signing in:", err);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }

  redirect("/projects");
}

export async function signUp(data: unknown): Promise<{
  success: boolean;
  error?: string;
}> {
  const validationResult = signUpSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: "Validation failed: " + validationResult.error.message,
    };
  }

  const validatedData: SignUp = validationResult.data;

  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    // Return success without redirect - user must confirm email
    return { success: true };
  } catch (err) {
    console.error("Error signing up:", err);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();

  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error("Error signing out:", err);
  }

  redirect("/login");
}
