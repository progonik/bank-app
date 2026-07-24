"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui";
import { LogOut } from "lucide-react";
import { createTranslator } from "@shared/lib/i18n";
import { useI18nStore } from "@shared/lib/i18n";
import { getUserDataFromStorage } from "@entities/user";
import { clearSession } from "@features/auth";
import { ROUTES } from "@shared/config/links";

const DEFAULT_AVATAR = "/images/avatar.jpg";

export function UserBox() {
  const language = useI18nStore((s) => s.language);
  const t = createTranslator(language);
  const userData = getUserDataFromStorage();

  const handleLogout = () => {
    clearSession();
    window.location.href = ROUTES.AUTH.LOGIN;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-[10px] cursor-pointer">
          <img
            src={userData?.avatar ?? DEFAULT_AVATAR}
            alt=""
            width={36}
            height={36}
            className="rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_AVATAR;
            }}
          />
          <div className="flex flex-col gap-[2px]">
            <h3 className="text-[16px] leading-[24px] font-medium text-black">
              {userData?.full_name ?? t("user.defaultName")}
            </h3>
            <p className="text-[12px] leading-[16px] font-medium text-[#64748B]">
              {userData?.role_name ?? t("user.role")}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          {t("auth.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
