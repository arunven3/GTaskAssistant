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
                  <button
                    onClick={() => {
                      showLoading("Authentication Starting...");
                      signIn("google", { callbackUrl: "/dashboard" });
                    }}
                    className="mt-10 flex h-[50px] w-[240px] items-center rounded-sm border-2 border-gray-400 bg-[#795548ed] text-white shadow-lg transition-colors duration-300 hover:bg-[#795548]"
                  >
                    <div className="flex h-full w-[50px] items-center justify-center border-r-1 border-solid border-gray-400">
                      <svg
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="font-roboto ml-5 text-center text-[16px]">
                      <b>Sign in with Google</b>
                    </p>
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
