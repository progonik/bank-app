"use client";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui";
import type { EntrepreneurApi } from "@shared/api/entrepreneurs";

export type TranslateFn = (key: string) => string;

interface EntrepreneursRowActionsProps {
  entrepreneur: EntrepreneurApi;
  t: TranslateFn;
  onEdit?: (e: EntrepreneurApi) => void;
  onDelete?: (e: EntrepreneurApi) => void;
}

export function EntrepreneursRowActions({
  entrepreneur,
  t,
  onEdit,
  onDelete,
}: EntrepreneursRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-8 h-8 rounded flex items-center justify-center hover:bg-[#F1F5F9]"
          aria-label="Actions"
        >
          <MoreVertical className="w-5 h-5 text-[#64748B]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(entrepreneur)} className="flex items-center gap-2 font-medium! hover:bg-[#F1F5F9]! transition-all duration-300 ease-in-out!">
            <Pencil className="w-4 h-4 mr-1" />
            {t("entrepreneurs.edit")}
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            className="text-red-600 flex items-center font-medium! hover:bg-[#F1F5F9]! transition-all duration-300 ease-in-out!"
            onClick={() => onDelete(entrepreneur)}
          >
            <Trash2 className="w-4 h-4 mr-1" color="#EF4444" />
            {t("entrepreneurs.delete")}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
