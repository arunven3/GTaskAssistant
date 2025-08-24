"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useLoading } from "@/contexts/LoadingContext";
import { Button, TextInput } from "flowbite-react";
import { Theme } from "@/components/theme/ThemeProvider";
import { useRouter, useSearchParams } from "next/navigation";

export const SignInPage = () => {
  const { showLoading } = useLoading();
  const router = useRouter();
  const next = useSearchParams().get("next") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoading("Signing in...");
    const formData = new FormData(e.currentTarget);

    try {
      const result = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (result.ok) router.push(next);
      else alert((await result.json()).error || "Failed");
    } catch (error) {
      console.log("An error occurred during sign in");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <section className={Theme.background.section}>
        <div className="w-full">
          <div className="">
            <h2 className="text-xl font-semibold">Sign In your account</h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 pt-10 text-left md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className={
                    Theme.highlightText + "mb-2 block text-sm font-medium"
                  }
                >
                  Email
                </label>
                <TextInput
                  color="primary"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={
                    Theme.highlightText + "mb-2 block text-sm font-medium"
                  }
                >
                  Password
                </label>
                <TextInput
                  color="primary"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button color="primary" type="submit" className="w-full">
                Sign in
              </Button>

              <div className="inline-flex w-full items-center justify-center">
                <hr
                  className={Theme.background.elements + " my-4 h-px w-full"}
                />
                <span
                  className={
                    Theme.background.elements +
                    " -translate-x-50px absolute px-3 font-medium"
                  }
                >
                  OR
                </span>
              </div>

              <div className="flex justify-center">
                <Button
                  color="primary"
                  onClick={() => {
                    showLoading("Authentication Starting...");
                    signIn("google", { callbackUrl: "/dashboard" });
                  }}
                  type="button"
                >
                  <svg
                    className="me-2 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 19"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-md">Sign in with Google</span>
                </Button>
              </div>

              <p className={Theme.text + " text-md"}>
                Don{"'"}t have an account yet?{" "}
                <a
                  onClick={() => router.push("/sign-up")}
                  className={
                    Theme.highlightText +
                    " cursor-pointer font-medium hover:underline"
                  }
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
