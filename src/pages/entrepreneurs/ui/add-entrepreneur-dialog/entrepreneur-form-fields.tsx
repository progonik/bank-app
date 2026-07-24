"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import {
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  FormRow,
  NumberInput,
  PhoneInput,
} from "@shared/ui";
import type { EntrepreneurFormState } from "../../model/types";
import { FORM_FIELD_CLASS } from "../shared/constants";
import {
  REGISTRATION_AUTHORITY_OPTIONS,
  LEGAL_FORM_OPTIONS,
  ACTIVITY_STATUS_TRUE,
  ACTIVITY_STATUS_FALSE,
} from "../../model/form-options";

type TranslateFn = (key: string) => string;
type UpdateFieldFn = <K extends keyof EntrepreneurFormState>(
  key: K,
  value: EntrepreneurFormState[K]
) => void;

interface FormFieldsProps {
  form: EntrepreneurFormState;
  updateField: UpdateFieldFn;
  t: TranslateFn;
}

const INPUT_WITH_ICON_CLASS = `${FORM_FIELD_CLASS} pl-10`;

export function EntrepreneurFormLeftColumn({
  form,
  updateField,
  t,
}: FormFieldsProps) {
  return (
    <div className="flex flex-col gap-3 flex-1 w-full">
      <FormRow label={t("entrepreneurs.inn")}>
        <Input
          value={form.inn}
          onChange={(e) => updateField("inn", e.target.value?.replace(" ", ""))}
          placeholder={t("entrepreneurs.enterInfo")}
          className={FORM_FIELD_CLASS}
          maxLength={14}
        />
      </FormRow>
      <FormRow label={t("entrepreneurs.legalName")}>
        <Input
          value={form.legal_name}
          onChange={(e) => updateField("legal_name", e.target.value)}
          placeholder={t("entrepreneurs.enterInfo")}
          className={FORM_FIELD_CLASS}
        />
      </FormRow>
      <FormRow label={t("entrepreneurs.registrationAuthority")}>
        <Select
          value={form.registration_authority}
          onValueChange={(v) => updateField("registration_authority", v)}
          defaultValue={REGISTRATION_AUTHORITY_OPTIONS[0].value}
        >
          <SelectTrigger className={FORM_FIELD_CLASS}>
            <SelectValue placeholder={t("entrepreneurs.selectFromList")} />
          </SelectTrigger>
          <SelectContent>
            {REGISTRATION_AUTHORITY_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormRow>
      <FormRow label={t("entrepreneurs.registrationDate")}>
        <Input
          value={form.registration_date}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^\d]/g, "").slice(0, 8);

            let formatted = raw;

            if (raw.length > 4) {
              formatted = raw.slice(0, 4) + "-" + raw.slice(4);
            }

            if (raw.length > 6) {
              formatted =
                raw.slice(0, 4) +
                "-" +
                raw.slice(4, 6) +
                "-" +
                raw.slice(6);
            }

            updateField("registration_date", formatted);
          }}
          placeholder="YYYY-MM-DD"
          maxLength={10}
          className={FORM_FIELD_CLASS}
        />
      </FormRow>
      <FormRow label={t("entrepreneurs.registrationNumber")}>
        <NumberInput
          value={form.registration_number}
          onChange={(v) => updateField("registration_number", v)}
          placeholder="0"
          className={FORM_FIELD_CLASS}
        />
      </FormRow>
      <FormRow label={t("entrepreneurs.legalForm")}>
        <Select
          value={form.legal_form}
          onValueChange={(v) => updateField("legal_form", v)}
          defaultValue={LEGAL_FORM_OPTIONS[0].value}
        >
          <SelectTrigger className={`${FORM_FIELD_CLASS} w-full max-w-[215px] truncate!`}>
            <SelectValue placeholder={t("entrepreneurs.selectFromList")} />
          </SelectTrigger>
          <SelectContent>
            {LEGAL_FORM_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormRow>
      <FormRow label={t("entrepreneurs.ifutCode")}>
        <Input
          value={form.ifut_code}
          onChange={(e) => updateField("ifut_code", e.target.value)}
          placeholder="IFUT code"
          className={FORM_FIELD_CLASS}
        />
      </FormRow>
      <FormRow label={t("entrepreneurs.dbibtCode")}>
        <NumberInput
          value={form.dbibt_code || ""}
          onChange={(v) => updateField("dbibt_code", Number(v) || 0)}
          placeholder="0"
          className={FORM_FIELD_CLASS}
        />
      </FormRow>
    </div>
  );
}

export function EntrepreneurFormRightColumn({
  form,
  updateField,
  t,
}: FormFieldsProps) {
  return (
    <div className="flex flex-col gap-3 flex-1">
      <FormRow label={t("entrepreneurs.activityStatus")}>
        <Select
          value={String(form.activity_status)}
          onValueChange={(v) =>
            updateField("activity_status", v === ACTIVITY_STATUS_TRUE)
          }
        >
          <SelectTrigger className={FORM_FIELD_CLASS}>
            <SelectValue placeholder={t("entrepreneurs.selectFromList")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ACTIVITY_STATUS_TRUE}>
              {t("common.active")}
            </SelectItem>
            <SelectItem value={ACTIVITY_STATUS_FALSE}>
              {t("common.block")}
            </SelectItem>
          </SelectContent>
        </Select>
      </FormRow>
      <FormRow label={t("entrepreneurs.charterFund")}>
        <NumberInput
          value={form.charter_fund || ""}
          onChange={(v) => updateField("charter_fund", Number(v) || 0)}
          placeholder="0 so'm"
          className={FORM_FIELD_CLASS}
          allowDecimal
        />
      </FormRow>
      <FormRow label={t("entrepreneurs.founders")}>
        <Input
          value={form.founders}
          onChange={(e) => updateField("founders", e.target.value)}
          placeholder={t("entrepreneurs.enterInfo")}
          className={FORM_FIELD_CLASS}
        />
      </FormRow>
      <FormRow label={t("entrepreneurs.email")}>
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <Input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder={t("entrepreneurs.enterInfo")}
            className={INPUT_WITH_ICON_CLASS}
          />
        </div>
      </FormRow>
      <FormRow label={t("entrepreneurs.phone")}>
        <div className="relative flex-1">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <PhoneInput
            value={form.phone}
            onChange={(v) => updateField("phone", v)}
            placeholder="+998"
            className={INPUT_WITH_ICON_CLASS}
          />
        </div>
      </FormRow>
      <FormRow label={t("entrepreneurs.mhobtCode")}>
        <Input
          value={form.mhobt_code}
          onChange={(e) => updateField("mhobt_code", e.target.value)}
          placeholder={t("entrepreneurs.enterInfo")}
          className={FORM_FIELD_CLASS}
        />
      </FormRow>
      <FormRow label={t("entrepreneurs.address")}>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <Input
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder={t("entrepreneurs.enterInfo")}
            className={INPUT_WITH_ICON_CLASS}
          />
        </div>
      </FormRow>
      <FormRow label={t("entrepreneurs.directorName")}>
        <Input
          value={form.director_name}
          onChange={(e) => updateField("director_name", e.target.value)}
          placeholder={t("entrepreneurs.enterInfo")}
          className={FORM_FIELD_CLASS}
        />
      </FormRow>
    </div>
  );
}
