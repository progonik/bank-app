"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User, X } from "lucide-react";
import { Button, Input } from "@shared/ui";
import type { FoydalanuvchiFormState } from "../../model";

interface AddUserDialogProps {
  readonly form: FoydalanuvchiFormState;
  readonly onFieldChange: <K extends keyof FoydalanuvchiFormState>(
    key: K,
    value: FoydalanuvchiFormState[K]
  ) => void;
  readonly onSubmit: () => void;
  readonly onCancel: () => void;
  readonly isSubmitting: boolean;
  readonly isEditMode?: boolean;
  readonly t: (key: string) => string;
}

export function AddUserDialog({
  form,
  onFieldChange,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditMode = false,
  t,
}: AddUserDialogProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = isEditMode
    ? form.full_name.trim() !== "" && form.login.trim() !== ""
    : form.full_name.trim() !== "" && form.login.trim() !== "" && form.password.trim() !== "";

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] leading-[24px] font-semibold text-[#0F172A]">
            {isEditMode ? t("foydalanuvchilar.edit") : t("common.add")}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px] leading-[20px] font-medium text-[#334155]">
              {t("foydalanuvchilar.fullName")}
            </label>
            <Input
              value={form.full_name}
              onChange={(e) => onFieldChange("full_name", e.target.value)}
              placeholder={t("foydalanuvchilar.fullNamePlaceholder")}
              className="h-[44px] rounded-[8px] border-[#E2E8F0] text-[14px] placeholder:text-[#94A3B8]"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px] leading-[20px] font-medium text-[#334155]">
              {t("foydalanuvchilar.role")}
            </label>
            <Input
              value={form.role}
              onChange={(e) => onFieldChange("role", e.target.value)}
              placeholder={t("foydalanuvchilar.rolePlaceholder")}
              className="h-[44px] rounded-[8px] border-[#E2E8F0] text-[14px] placeholder:text-[#94A3B8]"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px] leading-[20px] font-medium text-[#334155]">
              {t("foydalanuvchilar.login")}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8] pointer-events-none" />
              <Input
                value={form.login}
                onChange={(e) => onFieldChange("login", e.target.value)}
                placeholder={t("foydalanuvchilar.loginPlaceholder")}
                className="h-[44px] rounded-[8px] border-[#E2E8F0] text-[14px] pl-10 placeholder:text-[#94A3B8]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px] leading-[20px] font-medium text-[#334155]">
              {t("foydalanuvchilar.password")}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8] pointer-events-none" />
              <Input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => onFieldChange("password", e.target.value)}
                placeholder={t("foydalanuvchilar.passwordPlaceholder")}
                className="h-[44px] rounded-[8px] border-[#E2E8F0] text-[14px] pl-10 pr-10 placeholder:text-[#94A3B8]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-[18px] h-[18px]" />
                ) : (
                  <Eye className="w-[18px] h-[18px]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="h-[44px] px-6 rounded-[8px] text-[14px] font-medium border-[#E2E8F0] text-[#475569] cursor-pointer"
        >
          {t("foydalanuvchilar.cancel")}
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || !isFormValid}
          className="h-[44px] px-6 rounded-[8px] text-[14px] font-medium cursor-pointer"
        >
          {t("foydalanuvchilar.save")}
        </Button>
      </div>
    </div>
  );
}
