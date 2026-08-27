"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Button } from "@shared/ui";
import { ICON_BUTTON_CLASS } from "../shared/constants";
import type { TranslateFn } from "../../model/types";
import { cn } from "@shared/lib/utils";

interface EntrepreneursTableToolbarProps {
  t: TranslateFn;
  filterBarVisible: boolean;
  isDownloading?: boolean;
  onFilterBarToggle: () => void;
  onDownload?: () => void;
}

export function EntrepreneursTableToolbar({
  t,
  filterBarVisible,
  isDownloading = false,
  onFilterBarToggle,
  onDownload,
}: EntrepreneursTableToolbarProps) {
  const handleFilterClick = () => {
    onFilterBarToggle();
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Button
        type="button"
        variant="outline"
        className={ICON_BUTTON_CLASS}
        aria-label={t("common.download")}
        disabled={isDownloading}
        onClick={onDownload}
      >
        {isDownloading ? (
          <Loader2 className="h-5 w-5 animate-spin text-[#64748B]" />
        ) : (
          <Image src="/icons/download.svg" alt="" width={20} height={20} />
        )}
      </Button>

      <Button
        type="button"
        variant="outline"
        className={cn(
          ICON_BUTTON_CLASS,
          filterBarVisible && "border-[#3B82F6] bg-[#EFF6FF]"
        )}
        aria-label={t("common.filter")}
        aria-expanded={filterBarVisible}
        onClick={handleFilterClick}
      >
        <Image
          src="/icons/filter.svg"
          alt=""
          width={20}
          height={20}
          className={cn(filterBarVisible && "opacity-80")}
        />
      </Button>

      {/* <Button
        type="button"
        variant="outline"
        className={ICON_BUTTON_CLASS}
        aria-label={t("common.settings")}
      >
        <Image src="/icons/settings.svg" alt="" width={20} height={20} />
      </Button> */}
    </div>
  );
}
