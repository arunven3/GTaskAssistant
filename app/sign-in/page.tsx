"use client";

import React from "react";
import { SignInPage } from "@/components/auth-ui/SignInPage";
import { useLoading } from "@/contexts/LoadingContext";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <SignInPage></SignInPage>
    </Suspense>
  );
}
