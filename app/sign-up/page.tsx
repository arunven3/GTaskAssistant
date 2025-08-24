"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useLoading } from "@/contexts/LoadingContext";
import { Button, TextInput } from "flowbite-react";
import { Theme } from "@/components/theme/ThemeProvider";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { showLoading } = useLoading();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
        name: form.get("name"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) router.push("/dashboard");
    else alert((await res.json()).error || "Failed");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <section className={Theme.background.section}>
        <div className="w-full">
          <div className="">
            <h2 className="text-xl font-semibold">Create an account</h2>
            <form
              action="#"
              onSubmit={onSubmit}
              className="space-y-4 pt-10 text-left md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className={
                    Theme.highlightText + "mb-2 block text-sm font-medium"
                  }
                >
                  Name
                </label>
                <TextInput
                  color="primary"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Type your name..."
                />
              </div>
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
                  className=""
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={
                    Theme.highlightText + "mb-2 block text-sm font-medium"
                  }
                >
                  Confirm Password
                </label>
                <TextInput
                  color="primary"
                  type="password"
                  name="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className=""
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-3 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a className="font-medium" href="#">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <Button color="primary" type="submit" className="w-full">
                Create an account
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
                  <span className="text-md">Create account with Google</span>
                </Button>
              </div>

              <p className="text-sm font-light">
                Already have an account?{" "}
                <a
                  onClick={() => router.push("/sign-in")}
                  className="cursor-pointer font-medium"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
