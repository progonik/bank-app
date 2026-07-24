"use client";

import { Suspense } from "react";
import { Sidebar } from "@widgets/sidebar";
import { Navbar } from "@widgets/navbar";
import { PageLoading } from "../page-loading/page-loading";
import { NavbarActionsProvider } from "@app/navbar-actions/navbar-actions-context";

const SIDEBAR_FALLBACK = (
  <div className="w-[264px] h-screen bg-[#F8FAFC] border-r border-[#E2E8F0] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-[#E2E8F0] border-t-[#3B82F6] rounded-full animate-spin" />
  </div>
);

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <NavbarActionsProvider>
    <div className="fixed top-0 left-0 right-0 bottom-0" suppressHydrationWarning>
      <div className="w-full h-full flex">
        <Suspense fallback={SIDEBAR_FALLBACK}>
          <Sidebar />
        </Suspense>
        <div className="w-full max-w-[100vw-264px] overflow-hidden min-h-screen">
          <Navbar />
          <div className="bg-white w-full h-[calc(100vh-81px)] overflow-y-auto">
            <Suspense fallback={<PageLoading />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </div>
    </NavbarActionsProvider>
  );
}
