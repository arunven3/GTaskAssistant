"use client";

import React from "react";
import { useLoading } from "@/contexts/LoadingContext";
import { Button } from "flowbite-react";
import { Theme } from "@/components/theme/ThemeProvider";
import { useRouter } from "next/navigation";

export const Homepage = () => {
  const { showLoading } = useLoading();
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center">
      <section className={Theme.background.section + " h-screen sm:h-auto"}>
        <h1 className="mb-4 text-3xl font-bold underline underline-offset-4">
          {" "}
          Welcome to GTaskAssistant
        </h1>
        <h2 className="mt-10 text-xl font-semibold">
          Think of me as your digital brain helping you stay organized, focused,
          and one step ahead.
        </h2>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 p-6 md:grid-cols-2">
          <div className="rounded-xl border p-6 text-center shadow-sm transition hover:shadow-md">
            <h3 className="mb-2 text-lg font-semibold">New Customer</h3>
            <p className="mb-4">
              Create an account to start using GTaskAssistant.
            </p>
            <Button
              onClick={() => router.push("/sign-up")}
              color="primary"
              className="w-[140px] place-self-center-safe"
            >
              Create Account
            </Button>
          </div>
          <div className="rounded-xl border p-6 text-center shadow-sm transition hover:shadow-md">
            <h3 className="mb-2 text-lg font-semibold">Existing Customer</h3>
            <p className="mb-4">
              Already have an account? Continue with sign in.
            </p>
            <Button
              onClick={() => router.push("/sign-in")}
              color="primary"
              className="w-[140px] place-self-center-safe"
            >
              Log In
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
