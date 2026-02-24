"use client";

import React from "react";
import { SignInPage } from "@/components/auth-ui/SignInPage";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <SignInPage page="admin" onSucess="/admin/secured/dashboard"></SignInPage>
    </Suspense>
  );
}
