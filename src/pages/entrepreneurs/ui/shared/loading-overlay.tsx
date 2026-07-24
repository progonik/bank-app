"use client";

interface LoadingOverlayProps {
  show: boolean;
}

const SPINNER_SVG = (
  <svg
    className="h-8 w-8 animate-spin text-[#3B82F6]"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export function LoadingOverlay({ show }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center rounded-[12px] bg-white/80"
      aria-label="Loading"
    >
      {SPINNER_SVG}
    </div>
  );
}
