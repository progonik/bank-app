"use client";

export type TranslateFn = (key: string) => string;

interface AddWorkerDialogPlaceholderProps {
  t: TranslateFn;
}

export function AddWorkerDialogPlaceholder({ t }: AddWorkerDialogPlaceholderProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">{t("workers.addWorker")}</h3>
      <p className="text-sm text-[#64748B]">{t("workers.addWorkerPlaceholder")}</p>
    </div>
  );
}
