"use client";

export type TranslateFn = (key: string) => string;

interface AddEmployerDialogPlaceholderProps {
  t: TranslateFn;
}

export function AddEmployerDialogPlaceholder({ t }: AddEmployerDialogPlaceholderProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">{t("employers.addEmployer")}</h3>
      <p className="text-sm text-[#64748B]">{t("employers.addEmployerPlaceholder")}</p>
    </div>
  );
}
