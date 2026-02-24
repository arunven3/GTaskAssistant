"use client";

import React, { useRef } from "react";
import { signIn } from "next-auth/react";
import { useLoading } from "@/contexts/LoadingContext";
import { Button, TextInput, Card } from "flowbite-react";
import { Theme } from "@/components/theme/ThemeProvider";
import { useRouter, useSearchParams } from "next/navigation";

export const SignInPage = ({
  page,
  onSucess,
}: {
  page: string;
  onSucess: string;
}) => {
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();
  const next = useSearchParams().get("next") || onSucess;
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    showLoading("Signing in...");

    try {
      const result = await fetch(`/api/${page}/login`, {
        method: "POST",
        body: JSON.stringify({
          email: refEmail?.current?.value,
          password: refPassword?.current?.value,
        }),
        headers: { "Content-Type": "application/json" },
      });

      setTimeout(() => {}, 200);

      if (result.ok) router.push(next);
      else alert((await result.json()).error || "Failed");

      hideLoading();
    } catch (error) {
      console.log("An error occurred during sign in");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        {/* Sign In Form Card */}
        <Card className="border-0 bg-white shadow-xl dark:bg-gray-800">
          <div className="p-8">
            <h3 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
              Welcome Back! Sign In to Your Account
            </h3>
            <div className="space-y-4">
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
                  ref={refEmail}
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
                  placeholder="Enter your password"
                  ref={refPassword}
                  required
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                onClick={() => handleSubmit()}
                color="primary"
                type="submit"
                className="w-full bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Sign In
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
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
                  Sign in with Google
                </span>
              </Button>
            </div>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a
                onClick={() => router.push("/register")}
                className="cursor-pointer font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Sign up here
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
