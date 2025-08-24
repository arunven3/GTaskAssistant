"use client";

import React from "react";
import { useLoading } from "@/contexts/LoadingContext";
import { Button } from "flowbite-react";
import { Theme } from "@/components/theme/ThemeProvider";
import { useRouter } from 'next/navigation';


export const Homepage = () => {
  const { showLoading } = useLoading();
  const router = useRouter();


  return (
    <div className="flex items-center justify-center h-screen">
      <section className={Theme.background.section + " h-screen sm:h-auto"}>
        <h1 className="mb-4 text-3xl font-bold underline-offset-4 underline">
          {" "}
          Welcome to GTaskAssistant
        </h1>
        <h2 className="text-xl font-semibold mt-10">
          I{"'"}m your AI-powered smart assistant. Designed to help you stay organized and productive.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto p-6 mt-10">
          <div className="border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">New Customer</h3>
            <p className="mb-4">Create an account to start using GTaskAssistant.</p>
            <Button onClick={() => router.push('/sign-up')} color="primary" className="place-self-center-safe w-[140px]">
              Create Account
            </Button>
          </div>
          <div className="border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Existing Customer</h3>
            <p className="mb-4">Already have an account? Continue with sign in.</p>
            <Button onClick={() => router.push('/sign-in')} color="primary" className="place-self-center-safe w-[140px]">
              Log In
            </Button>
          </div>
        </div>
      </section>
    </div >



  );
};
