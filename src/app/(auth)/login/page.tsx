"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp } from "@/app/auth/actions";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = isSignUp
        ? await signUp({
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          })
        : await signIn({
            email: formData.email,
            password: formData.password,
          });

      if (result && !result.success) {
        toast.error(result.error || "An error occurred");
        setIsLoading(false);
      } else if (isSignUp && result?.success) {
        // Show confirmation message for signup
        toast.success("Please confirm your email to complete sign up");
        setSignUpSuccess(true);
        setFormData({ email: "", password: "", confirmPassword: "" });
        setIsLoading(false);
      }
      // On sign in success, the server action redirects (doesn't return)
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md border-border/70 shadow-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">
            {isSignUp ? "Create Account" : "Sign In"}
          </CardTitle>
          <CardDescription>
            {signUpSuccess
              ? "Check your email to confirm your account"
              : isSignUp
                ? "Enter your email and password to create a new account"
                : "Enter your credentials to access your dashboard"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {signUpSuccess ? (
            <div className="space-y-4">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
                <p className="font-medium">Confirmation email sent</p>
                <p className="mt-1 text-xs">
                  We&apos;ve sent a confirmation link to{" "}
                  <strong>{formData.email}</strong>. Please click it to verify
                  your email address.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSignUpSuccess(false);
                  setIsSignUp(false);
                  setFormData({ email: "", password: "", confirmPassword: "" });
                }}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
              </Button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setFormData({
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                  className="cursor-pointer text-primary hover:underline"
                  disabled={isLoading}
                >
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign up"}
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
