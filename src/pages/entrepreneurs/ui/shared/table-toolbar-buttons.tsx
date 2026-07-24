"use client";

import Image from "next/image";
import { Button } from "@shared/ui";
import { ICON_BUTTON_CLASS } from "./constants";

const TOOLBAR_BUTTONS = [
  { src: "/icons/download.svg", ariaKey: "common.add" },
  { src: "/icons/filter.svg", ariaKey: "common.filter" },
  { src: "/icons/settings.svg", ariaKey: "common.settings" },
] as const;

interface TableToolbarButtonsProps {
  t: (key: string) => string;
}

export function TableToolbarButtons({ t }: TableToolbarButtonsProps) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      {TOOLBAR_BUTTONS.map(({ src, ariaKey }) => (
        <Button
          key={ariaKey}
          type="button"
          variant="outline"
          className={ICON_BUTTON_CLASS}
          aria-label={t(ariaKey)}
        >
          <Image src={src} alt="" width={20} height={20} />
        </Button>
      ))}
    </div>
  );
}
