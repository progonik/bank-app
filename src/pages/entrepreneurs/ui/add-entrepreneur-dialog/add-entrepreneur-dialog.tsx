"use client";

import { Button, CustomDialogClose } from "@shared/ui";
import type { EntrepreneurApi } from "@shared/api/entrepreneurs";
import type { TranslateFn } from "../../model/types";
import { useEntrepreneurForm } from "../../model/use-entrepreneur-form";
import { EntrepreneurFormLeftColumn } from "./entrepreneur-form-fields";
import { EntrepreneurFormRightColumn } from "./entrepreneur-form-fields";
import { FORM_COLUMN_GAP } from "../../model/constants";

interface AddEntrepreneurDialogProps {
  t: TranslateFn;
  onSuccess?: () => void;
  onClose?: () => void;
  /** When provided, dialog works in edit mode. */
  entrepreneur?: EntrepreneurApi;
}

const DIALOG_TITLE_CLASS = "text-2xl font-bold text-[#000000]";
const CLOSE_BUTTON_CLASS = "p-2 -m-2 rounded hover:bg-[#F1F5F9] transition-colors";
const FOOTER_CLASS = "flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]";
const CANCEL_BUTTON_CLASS = "border-[#E2E8F0] text-[#334155] w-[118px] h-[48px] min-h-[48px] px-5 py-3 gap-[10px] rounded-md border";
const SUBMIT_BUTTON_CLASS = "bg-[#3B82F6] hover:bg-[#2563EB] text-white w-[118px] h-[48px] min-h-[48px] px-5 py-3 gap-[10px] rounded-md";

export function AddEntrepreneurDialog({
  t,
  onSuccess,
  onClose,
  entrepreneur,
}: AddEntrepreneurDialogProps) {
  const { form, updateField, handleSubmit, isSubmitting } = useEntrepreneurForm(
    { t, onSuccess, onClose, entrepreneur }
  );
  const isEdit = Boolean(entrepreneur);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className={DIALOG_TITLE_CLASS}>
          {isEdit ? t("entrepreneurs.edit") : t("entrepreneurs.add")}
        </h3>
        <CustomDialogClose asChild>
          <button
            type="button"
            className={CLOSE_BUTTON_CLASS}
            aria-label="Close"
          >
            <img src="/icons/x.svg" alt="" width={20} height={20} />
          </button>
        </CustomDialogClose>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          className="flex"
          style={{ gap: `${FORM_COLUMN_GAP}px` }}
        >
          <EntrepreneurFormLeftColumn
            form={form}
            updateField={updateField}
            t={t}
          />
          <EntrepreneurFormRightColumn
            form={form}
            updateField={updateField}
            t={t}
          />
        </div>

        <div className={FOOTER_CLASS}>
          <CustomDialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className={CANCEL_BUTTON_CLASS}
            >
              {t("entrepreneurs.cancel")}
            </Button>
          </CustomDialogClose>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={SUBMIT_BUTTON_CLASS}
          >
            {t("entrepreneurs.save")}
          </Button>
        </div>
      </form>
    </div>
  );
}
