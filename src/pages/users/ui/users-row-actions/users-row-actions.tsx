"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui";
import { createTranslator } from "@shared/lib/i18n";
import { useI18nStore } from "@shared/lib/i18n";
import type { FoydalanuvchiRow } from "../../model";

interface UsersRowActionsProps {
  readonly user: FoydalanuvchiRow;
  readonly onEdit: (user: FoydalanuvchiRow) => void;
}

export function UsersRowActions({ user, onEdit }: UsersRowActionsProps) {
  const language = useI18nStore((s) => s.language);
  const t = createTranslator(language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#F1F5F9] transition-colors cursor-pointer"
          aria-label="Actions"
        >
          <Image src="/icons/more-icon.svg" alt="" width={20} height={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => onEdit(user)}
        >
          <Image src="/icons/edit.svg" alt="" width={16} height={16} />
          {t("foydalanuvchilar.edit")}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 focus:text-red-600">
          <Image src="/icons/trash.svg" alt="" width={16} height={16} />
          {t("foydalanuvchilar.delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
