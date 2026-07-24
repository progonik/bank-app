"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  createEntrepreneur,
  updateEntrepreneur,
} from "@shared/api/entrepreneurs";
import { successToast, errorToast } from "@shared/lib/toast";
import type {
  EntrepreneurPostData,
  EntrepreneurApi,
} from "@shared/api/entrepreneurs";
import type { EntrepreneurFormState } from "./types";
import { INITIAL_FORM_STATE } from "./types";

type TranslateFn = (key: string) => string;

/** YYYY-MM-DD → dd.mm.yyyy */
function isoToDisplay(iso: string): string {
  if (!iso) return "";
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

/** dd.mm.yyyy → YYYY-MM-DD */
function displayToIso(display: string): string {
  if (!display) return "";
  const parts = display.split(".");
  if (parts.length !== 3 || parts[2].length !== 4) return display;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

function mapApiToFormState(e: EntrepreneurApi): EntrepreneurFormState {
  return {
    inn: e.inn_name ?? e.inn_id ?? "",
    legal_name: e.legal_name ?? "",
    registration_authority: e.registration_authority ?? "",
    registration_date: isoToDisplay(e.registration_date ?? ""),
    registration_number: e.registration_number ?? "0",
    legal_form: e.legal_form ?? "",
    ifut_code: String(e.ifut_code_name ?? ""),
    dbibt_code: e.dbibt_code ?? 0,
    activity_status: e.activity_status ?? true,
    charter_fund: e.charter_fund ?? 0,
    founders: e.founders ?? "",
    email: e.email ?? "",
    phone: e.phone ?? "+998",
    mhobt_code: e.mhobt_code ?? "",
    address: e.address ?? "",
    director_name: e.director_name ?? "",
  };
}

interface UseEntrepreneurFormParams {
  t: TranslateFn;
  onSuccess?: () => void;
  onClose?: () => void;
  /** When provided, form works in edit mode. */
  entrepreneur?: EntrepreneurApi;
}

export function useEntrepreneurForm({
  t,
  onSuccess,
  onClose,
  entrepreneur,
}: UseEntrepreneurFormParams) {
  const initialForm = useMemo(
    () => (entrepreneur ? mapApiToFormState(entrepreneur) : INITIAL_FORM_STATE),
    [entrepreneur]
  );
  const [form, setForm] = useState<EntrepreneurFormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm(initialForm);
  }, [entrepreneur?.id]);

  const updateField = useCallback(
    <K extends keyof EntrepreneurFormState>(
      key: K,
      value: EntrepreneurFormState[K]
    ) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const buildPostData = useCallback(
    (): EntrepreneurPostData => ({
      inn: form.inn,
      phone: form.phone,
      email: form.email,
      registration_date: displayToIso(form.registration_date),
      ...(form.legal_name ? { legal_name: form.legal_name } : {}),
      ...(form.legal_form ? { legal_form: form.legal_form } : {}),
      ...(form.ifut_code ? { ifut_code: String(form.ifut_code) } : {}),
      ...(form.mhobt_code ? { mhobt_code: form.mhobt_code } : {}),
      ...(form.director_name ? { director_name: form.director_name } : {}),
      ...(form.address ? { address: form.address } : {}),
      ...(form.registration_authority ? { registration_authority: form.registration_authority } : {}),
      ...(form.registration_number ? { registration_number: form.registration_number } : {}),
      ...(form.dbibt_code ? { dbibt_code: form.dbibt_code } : {}),
      ...(form.activity_status ? { activity_status: form.activity_status } : {}),
      ...(form.charter_fund ? { charter_fund: form.charter_fund } : {}),
      ...(form.founders ? { founders: form.founders } : {}),
      ...(form.email ? { email: form.email } : {}),
      ...(form.phone ? { phone: form.phone } : {}),
    }),
    [form]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        const data = buildPostData();
        if (entrepreneur) {
          await updateEntrepreneur(entrepreneur.id, data);
        } else {
          await createEntrepreneur(data);
        }
        successToast(t("common.success"));
        onSuccess?.();
        onClose?.();
      } catch {
        errorToast(t("common.error"));
      } finally {
        setIsSubmitting(false);
      }
    },
    [buildPostData, entrepreneur, t, onSuccess, onClose]
  );

  return { form, updateField, handleSubmit, isSubmitting };
}
