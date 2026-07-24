"use client";

import * as React from "react";
import { Input } from "../input";
import { cn } from "@shared/lib/utils";

/** Uzbekistan format: +998-95-955-95-95 (country 998, then groups 2-3-2-2) */
export const PHONE_FORMAT_UZ: PhoneFormat = {
  countryCode: "998",
  pattern: [2, 3, 2, 2],
  separator: "-",
};

export interface PhoneFormat {
  /** Country code without +, e.g. "998". */
  countryCode: string;
  /** Digit group sizes after country code, e.g. [2, 3, 2, 2] for XX-XXX-XX-XX. */
  pattern: number[];
  /** Separator between groups. Default "-". */
  separator?: string;
}

const PATTERN_TOTAL = (p: number[]) => p.reduce((a, b) => a + b, 0);

/**
 * Formats digits as phone number, e.g. +998-95-955-95-95.
 * Extracts digits, applies country code and pattern.
 * Prefix (+998) is always preserved as minimum.
 */
export function formatPhoneInput(value: string, format: PhoneFormat): string {
  const digits = value.replace(/\D/g, "");
  const sep = "";
  const prefix = "+" + format.countryCode;

  if (digits.length === 0) return prefix;

  let rest = digits;
  if (rest.startsWith(format.countryCode)) {
    rest = rest.slice(format.countryCode.length);
  } else if (rest.length <= format.countryCode.length) {
    return prefix;
  } else {
    const patternTotal = PATTERN_TOTAL(format.pattern);
    if (rest.length >= patternTotal) {
      rest = rest.slice(-patternTotal);
    }
  }

  const parts: string[] = [];
  let i = 0;
  for (const size of format.pattern) {
    if (i >= rest.length) break;
    parts.push(rest.slice(i, i + size));
    i += size;
  }
  if (i < rest.length) {
    parts.push(rest.slice(i));
  }
  const formatted = parts.join(sep);
  return formatted ? prefix + sep + formatted : prefix;
}

/**
 * Filters and formats phone input. Extracts digits, keeps only valid length, formats.
 */
export function filterPhoneInput(
  value: string,
  format: PhoneFormat
): string {
  const digits = value.replace(/\D/g, "");
  const maxLen = format.countryCode.length + format.pattern.reduce((a, b) => a + b, 0);
  const limited = digits.slice(0, maxLen);
  return formatPhoneInput(limited, format);
}

export interface PhoneInputProps
  extends Omit<React.ComponentProps<typeof Input>, "type" | "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  /** Format config. Default Uzbekistan +998-XX-XXX-XX-XX. */
  format?: PhoneFormat;
}

export function PhoneInput({
  value,
  onChange,
  format = PHONE_FORMAT_UZ,
  className,
  ...props
}: PhoneInputProps) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = filterPhoneInput(e.target.value, format);
      onChange(formatted);
    },
    [onChange, format]
  );

  const displayValue = formatPhoneInput(value, format);

  return (
    <Input
      type="tel"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      className={cn(className)}
      {...props}
    />
  );
}
