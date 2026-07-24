"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { SIDEBAR_MENU_KEYS } from "@entities/navigation";
import { getIntegrations, updateIntegration } from "@shared/api/integrations";
import type { IntegrationApi } from "@shared/api/integrations";
import { errorToast, successToast } from "@shared/lib/toast";
import { createTranslator, useI18nStore } from "@shared/lib/i18n";
import { Button, Card, CardContent, Checkbox, Input } from "@shared/ui";

const queryKey = ["integrations"];
const TASHKENT_OFFSET = "+05:00";

function toDateValue(value: string | null): string {
  if (!value) return "";
  return value.slice(0, 10);
}

function toDeadline(date: string): string | null {
  if (!date) return null;
  return `${date}T23:59:00${TASHKENT_OFFSET}`;
}

function formatDeadline(value: string | null): string {
  if (!value) return "Cheklanmagan";
  return new Intl.DateTimeFormat("uz-UZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tashkent",
  }).format(new Date(value));
}

function getStatusLabel(integration: IntegrationApi): string {
  if (!integration.active) return "O'chirilgan";
  if (!integration.is_usable) return "Muddati tugagan";
  return "Aktiv";
}

function getStatusClass(integration: IntegrationApi): string {
  if (integration.is_usable) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (!integration.active) return "bg-slate-50 text-slate-600 border-slate-200";
  return "bg-amber-50 text-amber-700 border-amber-200";
}

export function IntegrationsPage() {
  const language = useI18nStore((s) => s.language);
  const t = createTranslator(language);
  const queryClient = useQueryClient();
  const [deadlines, setDeadlines] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: getIntegrations,
  });

  const integrations = data?.integrations ?? [];
  const deadlineValues = useMemo(() => {
    const values: Record<string, string> = {};
    for (const integration of integrations) {
      values[integration.code] = deadlines[integration.code] ?? toDateValue(integration.active_until);
    }
    return values;
  }, [deadlines, integrations]);

  const mutation = useMutation({
    mutationFn: ({ code, active, deadline }: { code: string; active: boolean; deadline: string }) =>
      updateIntegration(code, { active, active_until: toDeadline(deadline) }),
    onSuccess: () => {
      successToast(t("common.success"));
      queryClient.invalidateQueries({ queryKey });
    },
    onError: () => errorToast(t("common.error")),
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-[#1E293B]">
        {t(SIDEBAR_MENU_KEYS.INTEGRATIONS)}
      </h1>

      <div className="mt-6 grid gap-4">
        {isLoading ? (
          <div className="text-sm text-slate-500">Yuklanmoqda...</div>
        ) : (
          integrations.map((integration) => {
            const deadline = deadlineValues[integration.code] ?? "";
            const saving = mutation.isPending;

            return (
              <Card key={integration.id} className="rounded-lg">
                <CardContent className="grid gap-5 md:grid-cols-[1fr_280px]">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div>
                        <div className="text-lg font-semibold text-slate-900">{integration.name}</div>
                        <div className="text-sm uppercase text-slate-500">{integration.code}</div>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(integration)}`}>
                        {getStatusLabel(integration)}
                      </span>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-700">Bog'langan foydalanuvchilar</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {integration.users.length ? (
                          integration.users.map((user) => (
                            <span key={user.id} className="rounded-md border bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
                              {user.user_full_name || user.user_login} - {user.role}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-500">Hali bog'langan foydalanuvchi yo'q</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Checkbox
                        checked={integration.active}
                        onCheckedChange={(checked) =>
                          mutation.mutate({
                            code: integration.code,
                            active: checked === true,
                            deadline,
                          })
                        }
                      />
                      Aktiv
                    </label>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Aktiv muddati</label>
                      <Input
                        type="date"
                        value={deadline}
                        onChange={(event) =>
                          setDeadlines((current) => ({
                            ...current,
                            [integration.code]: event.target.value,
                          }))
                        }
                      />
                      <div className="text-xs text-slate-500">
                        Joriy: {formatDeadline(integration.active_until)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        disabled={saving}
                        onClick={() =>
                          mutation.mutate({
                            code: integration.code,
                            active: integration.active,
                            deadline,
                          })
                        }
                      >
                        Saqlash
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={saving}
                        onClick={() => {
                          setDeadlines((current) => ({ ...current, [integration.code]: "" }));
                          mutation.mutate({
                            code: integration.code,
                            active: integration.active,
                            deadline: "",
                          });
                        }}
                      >
                        Muddat yo'q
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
