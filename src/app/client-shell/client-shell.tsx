"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "@shared/ui";
import { ReactQueryProvider } from "@app/providers";
import { useI18nStore } from "@shared/lib/i18n";
import { createTranslator } from "@shared/lib/i18n";
import { getPageTitleKey } from "@entities/navigation";

const APP_NAME = "BANK";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const language = useI18nStore((s) => s.language);
  const t = createTranslator(language);

  useEffect(() => {
    const key = getPageTitleKey(pathname);
    const title = key ? t(key) : null;
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;
  }, [pathname, language, t]);

  return (
    <ReactQueryProvider>
      {children}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </ReactQueryProvider>
  );
}
