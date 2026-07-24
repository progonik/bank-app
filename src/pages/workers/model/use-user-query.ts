"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@shared/api/users";
import type { UserApi } from "@shared/api/users";
import type { Language } from "@shared/lib/i18n";

export const userQueryKeys = {
  all: ["user"] as const,
  detail: (id: string, lang: string) =>
    ["user", "detail", id, lang] as const,
} as const;

export interface UseUserQueryParams {
  id: string;
  lang: Language;
}

export function useUserQuery({ id, lang }: UseUserQueryParams) {
  return useQuery({
    queryKey: userQueryKeys.detail(id, lang),
    queryFn: () => getUserById({ id, lang }),
    enabled: Boolean(id && id !== "undefined"),
  });
}

export type { UserApi };
