"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useLoading } from "@/contexts/LoadingContext";
import { Button, TextInput, Card } from "flowbite-react";
import { Theme } from "@/components/theme/ThemeProvider";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showLoading("Registering...");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/user/register", {
      method: "POST",
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
        name: form.get("name"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    setTimeout(() => {}, 200);
    hideLoading();

    if (res.ok) router.push("/dashboard");
    else alert((await res.json()).error || "Failed");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Join PTaskAssistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create your account and start boosting your productivity
          </p>
        </div>

        {/* Sign Up Form Card */}
        <Card className="border-0 bg-white shadow-xl dark:bg-gray-800">
          <div className="p-8">
            <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
              Sign Up
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <TextInput
                  color="primary"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <TextInput
                  color="primary"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <TextInput
                  color="primary"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Create a password"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <TextInput
                  color="primary"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  required
                  className="w-full"
                />
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              <Button
                color="primary"
                type="submit"
                className="w-full bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Create Account
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Google Sign Up */}
              <div className="flex justify-center">
                <Button
                  color="light"
                  onClick={() => {
                    showLoading("Authentication Starting...");
                    signIn("google", { callbackUrl: "/dashboard" });
                  }}
                  type="button"
                  className="w-full border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
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
                  <span className="text-gray-700 dark:text-gray-300">
                    Sign up with Google
                  </span>
                </Button>
              </div>
            </form>

            {/* Sign In Link */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <a
                onClick={() => router.push("/login")}
                className="cursor-pointer font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Sign in here
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
