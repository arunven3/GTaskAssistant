"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLoading } from "@/app/contexts/LoadingContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status } = useSession();
  const { showLoading, hideLoading } = useLoading();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    if (status === "loading") {
      showLoading("Checking authentication..");
    } else {
      hideLoading();
    }
  }, [status, router, showLoading, hideLoading]);

  return <>{children}</>;
}
