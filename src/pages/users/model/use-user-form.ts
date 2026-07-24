"use client";

import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createFoydalanuvchi, updateFoydalanuvchi } from "@shared/api/foydalanuvchilar";
import { successToast, errorToast } from "@shared/lib/toast";
import { foydalanuvchilarQueryKeys } from "./use-foydalanuvchilar-query";
import { INITIAL_FORM_STATE, type FoydalanuvchiFormState } from "./types";
import type { FoydalanuvchiRow } from "./types";

export function useUserForm(t: (key: string) => string) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FoydalanuvchiFormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const updateField = useCallback(
    <K extends keyof FoydalanuvchiFormState>(key: K, value: FoydalanuvchiFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM_STATE);
    setEditingUserId(null);
  }, []);

  const initializeForEdit = useCallback((user: FoydalanuvchiRow) => {
    setForm({
      full_name: user.fullName,
      role: user.role,
      login: user.login,
      password: "",
    });
    setEditingUserId(user.id);
  }, []);

  const submitForm = useCallback(
    async (onSuccess?: () => void) => {
      if (!form.full_name.trim() || !form.login.trim()) return;
      if (!editingUserId && !form.password.trim()) return;

      setIsSubmitting(true);
      try {
        if (editingUserId) {
          const updateData: Record<string, unknown> = {
            full_name: form.full_name,
            role: form.role,
            login: form.login,
          };
          if (form.password.trim()) {
            updateData.password = form.password;
          }
          await updateFoydalanuvchi(editingUserId, updateData);
        } else {
          await createFoydalanuvchi({
            full_name: form.full_name,
            login: form.login,
            password: form.password,
            role: form.role,
          });
        }
        successToast(t("common.success"));
        await queryClient.invalidateQueries({
          queryKey: foydalanuvchilarQueryKeys.all,
        });
        resetForm();
        onSuccess?.();
      } catch {
        errorToast(t("common.error"));
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, editingUserId, t, queryClient, resetForm]
  );

  return {
    form,
    updateField,
    resetForm,
    initializeForEdit,
    submitForm,
    isSubmitting,
    isEditMode: editingUserId !== null,
  };
}
