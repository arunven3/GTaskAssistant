"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useLoading } from "@/contexts/LoadingContext";

export const Homepage = () => {
  const { showLoading } = useLoading();

  return (
    <div className="bg-home flex h-screen items-center justify-center">
      <div className="rounded bg-gray-100 shadow-lg dark:bg-gray-700">
        <div>
          {true && (
            <>
              <section className="mx-auto max-w-2xl p-15 text-center text-gray-900 dark:text-white">
                <h1 className="mb-4 text-3xl font-bold">
                  {" "}
                  Welcome to GTaskAssistant
                </h1>
                <p className="sub-heading text-lg">
                  I{"'"}m your AI-powered smart assistant. you can ask anything
                  to me.
                  <br />
                  Authorize your google account to start.
                </p>
                <div className="flex justify-center">
                  {/* /"mt-10 flex  items-center rounded-sm border-2 border-gray-400 bg-[#795548ed] text-white shadow-lg transition-colors duration-300 hover:bg-[#795548]" */}
                  <button onClick={() => {
                    showLoading("Authentication Starting...");
                    signIn("google", { callbackUrl: "/dashboard" });
                  }}
                    type="button" className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-lg px-7 text-center inline-flex items-center h-[50px] mt-7">
                    <svg className="w-6 h-6 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                      <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                    </svg>
                    Sign in with Google
                  </button>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
