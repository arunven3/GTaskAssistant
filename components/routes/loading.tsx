"use client";
import "@/styles/loader.css";
import "@/styles/style.css";

export const LoadingScreen = ({ message }: { message: string }) => {
  return (
    <div className="relative z-50">
      <div className="loading-bg"></div>
      <div className="laoding-bg laoding-bg2"></div>
      <div className="laoding-bg laoding-bg3"></div>
      <div className="content">
        <div className="loader">{message}</div>
      </div>
    </div>
  );
};
