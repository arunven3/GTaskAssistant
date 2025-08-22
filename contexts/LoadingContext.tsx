"use client";

import { createContext, useContext, useState } from "react";
import { LoadingScreen } from "../components/routes/loading";

type LoadingContextType = {
  isLoading: boolean;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const showLoading = (message?: string) => {
    setLoadingMessage(message || "Loading...");
    setIsLoading(true);
  };
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && <LoadingScreen message={loadingMessage} />}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used inside LoadingProvider");
  }
  return context;
}
