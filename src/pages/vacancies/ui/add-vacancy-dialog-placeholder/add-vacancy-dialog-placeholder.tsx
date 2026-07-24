"use client";

export type TranslateFn = (key: string) => string;

interface AddVacancyDialogPlaceholderProps {
  t: TranslateFn;
}

export function AddVacancyDialogPlaceholder({ t }: AddVacancyDialogPlaceholderProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">{t("vacancies.addVacancy")}</h3>
      <p className="text-sm text-[#64748B]">{t("vacancies.addVacancyPlaceholder")}</p>
    </div>
  );
}
