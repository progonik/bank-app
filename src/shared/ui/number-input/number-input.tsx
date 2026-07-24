"use client";

import * as React from "react";
import { Input } from "../input";
import { cn } from "@shared/lib/utils";

const DIGITS_ONLY = /[^0-9]/g;
const DIGITS_AND_DECIMAL = /[^0-9.]/g;

function filterNumeric(value: string, allowDecimal: boolean): string {
  const regex = allowDecimal ? DIGITS_AND_DECIMAL : DIGITS_ONLY;
  let filtered = value.replace(regex, "");
  if (allowDecimal) {
    const parts = filtered.split(".");
    if (parts.length > 2) {
      filtered = parts[0] + "." + parts.slice(1).join("");
    }
  }
  return filtered;
}

export interface NumberInputProps
  extends Omit<React.ComponentProps<typeof Input>, "type" | "value" | "onChange"> {
  value: string | number;
  onChange: (value: string) => void;
  /** Allow decimal point. Default false (integers only). */
  allowDecimal?: boolean;
}

export function NumberInput({
  value,
  onChange,
  allowDecimal = false,
  className,
  ...props
}: NumberInputProps) {
  const displayValue =
    typeof value === "number" ? String(value) : value ?? "";

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const filtered = filterNumeric(e.target.value, allowDecimal);
      onChange(filtered);
    },
    [onChange, allowDecimal]
  );

  return (
    <Input
      type="text"
      inputMode={allowDecimal ? "decimal" : "numeric"}
      value={displayValue}
      onChange={handleChange}
      className={cn(className)}
      {...props}
    />
  );
}
