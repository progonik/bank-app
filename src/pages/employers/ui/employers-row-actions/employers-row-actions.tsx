"use client";

import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui";
import type { HrApi } from "@shared/api/hrs";

interface EmployersRowActionsProps {
  hr: HrApi;
}

export function EmployersRowActions({ hr: _hr }: EmployersRowActionsProps) {
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
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">Block</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
