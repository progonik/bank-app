"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@features/language-switch";
import { UserBox } from "@features/user-menu";
import { useI18nStore } from "@shared/lib/i18n";
import { useNavbarActions } from "@app/navbar-actions/navbar-actions-context";
import { getPageTitle } from "../../lib/get-page-title";

export function Navbar() {
  const pathname = usePathname();
  const language = useI18nStore((s) => s.language);
  const { actions } = useNavbarActions();

  const title = useMemo(
    () => getPageTitle(pathname, language),
    [pathname, language]
  );

  return (
    <header className="w-full h-[80px] bg-[#F8FAFC] border-b border-[#E2E8F0] flex justify-between items-center px-[32px]">
      <h2 className="text-[24px] leading-[32px] font-semibold text-[#1E293B]">
        {title}
      </h2>
      <div className="flex items-center gap-4">
        {actions}
        <LanguageSwitcher />
        <UserBox />
      </div>
    </header>
  );
}
