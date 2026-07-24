"use client";

import { Loader } from "lucide-react";

export function PageLoading() {
  return (
    <div className="w-full h-full min-h-[calc(100vh-81px)] flex flex-col gap-5 justify-center items-center bg-white">
      <Loader className="w-10 h-10 animate-spin text-[#3B82F6]" />
    </div>
  );
}
