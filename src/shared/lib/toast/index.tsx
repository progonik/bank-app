"use client";

import { toast } from "sonner";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

const TOAST_STYLES = {
  success: {
    color: "#166534",
    backgroundColor: "#fff",
    border: "2px solid #46c271",
    fontSize: "14px",
  },
  error: {
    color: "#991b1b",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    fontSize: "14px",
  },
  warning: {
    color: "#854d0e",
    backgroundColor: "#fefce8",
    border: "1px solid #fef08a",
    fontSize: "14px",
  },
  info: {
    color: "#1e40af",
    backgroundColor: "#eff6ff",
    border: "1px solid #bfdbfe",
    fontSize: "14px",
  },
} as const;

export const successToast = (message: string, description?: string): void => {
  toast.success(message, {
    description,
    icon: <CheckCircle2 className="text-green-600 w-6 h-6" />,
    style: TOAST_STYLES.success,
  });
};

export const errorToast = (message: string, description?: string): void => {
  toast.error(message, {
    description,
    icon: <XCircle className="text-red-600 w-5 h-5" />,
    style: TOAST_STYLES.error,
  });
};

export const warningToast = (message: string, description?: string): void => {
  toast.warning(message, {
    description,
    icon: <AlertTriangle className="text-yellow-600 w-5 h-5" />,
    style: TOAST_STYLES.warning,
  });
};

export const infoToast = (message: string, description?: string): void => {
  toast.info(message, {
    description,
    icon: <Info className="text-blue-600 w-5 h-5" />,
    style: TOAST_STYLES.info,
  });
};
