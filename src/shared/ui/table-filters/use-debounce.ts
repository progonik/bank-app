"use client";

import { useState, useCallback, useEffect, useRef } from "react";

/**
 * Returns [displayValue, setValue] where setValue updates display immediately
 * and calls onChange after delayMs. When delayMs is 0, onChange is called synchronously.
 */
export function useDebouncedValue<T>(
  value: T,
  onChange: (v: T) => void,
  delayMs: number
): [T, (v: T) => void] {
  const [localValue, setLocalValue] = useState(value);
  const onChangeRef = useRef(onChange);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  onChangeRef.current = onChange;

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const setDebounced = useCallback(
    (newValue: T) => {
      setLocalValue(newValue);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (delayMs <= 0) {
        onChangeRef.current(newValue);
      } else {
        timeoutRef.current = setTimeout(() => {
          onChangeRef.current(newValue);
          timeoutRef.current = null;
        }, delayMs);
      }
    },
    [delayMs]
  );

  return [localValue, setDebounced];
}
