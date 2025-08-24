"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useLoading } from "@/contexts/LoadingContext";
import { Button, TextInput } from "flowbite-react";
import { Theme } from "@/components/theme/ThemeProvider";
import { useRouter } from 'next/navigation';

export default function SignInPage() {
    const { showLoading } = useLoading();
    const router = useRouter()


    return (
        <div className="flex items-center justify-center h-screen">
            <section className={Theme.background.section}>
                <div className="w-full">
                    <div className="">
                        <h2 className="text-xl font-semibold">
                            Sign In your account
                        </h2>
                        <div className="space-y-4 md:space-y-6 text-left pt-10">
                            <div>
                                <label htmlFor="email" className={Theme.highlightText + "block mb-2 text-sm font-medium"}>Email</label>
                                <TextInput color="primary" type="email" name="email" id="email" placeholder="name@company.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className={Theme.highlightText + "block mb-2 text-sm font-medium"}>Password</label>
                                <TextInput color="primary" type="password" name="password" id="password" placeholder="••••••••" className="" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <TextInput color="primary" id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className={Theme.background.elements}>Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className={Theme.highlightText + " text-sm font-medium"}>Forgot password?</a>
                            </div>

                            <Button color="primary" type="submit" className="w-full">Sign in</Button>

                            <div className="inline-flex items-center justify-center w-full">
                                <hr className={Theme.background.elements + " w-full h-px my-4"} />
                                <span className={Theme.background.elements + " absolute px-3 font-medium -translate-x-50px"}>OR</span>
                            </div>

                            <div className="flex justify-center">
                                <Button color="primary" onClick={() => {
                                    showLoading("Authentication Starting...");
                                    signIn("google", { callbackUrl: "/dashboard" });
                                }}
                                    type="button" >
                                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                        <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-md">Sign in with Google</span>
                                </Button>
                            </div>

                            <p className={Theme.text + " text-md"}>
                                Don’t have an account yet? <a onClick={() => router.push('/sign-up')} className={Theme.highlightText + " font-medium hover:underline "}>Sign up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
};
