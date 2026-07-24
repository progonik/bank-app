"use client";

import Image from "next/image";
import { cn } from "@shared/lib/utils";
import { AVATAR_FALLBACK } from "@/src/pages/workers/model";

/** Name: Inter 600, 20px, 28px line-height, -1%, #000 */
const NAME_CLASS =
  "font-semibold text-[20px] leading-[28px] tracking-[-0.01em] text-[#000000]";

export interface ProfileCardProps {
  readonly avatarSrc: string;
  readonly fullName: string;
  readonly children?: React.ReactNode;
  readonly className?: string;
}

/** Card: 16px radius, 16px padding, 16px gap, bg #F8FAFC. Avatar: 88×88, circular */
export function ProfileCard({
  avatarSrc,
  fullName,
  children,
  className,
}: ProfileCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-[16px] bg-[#F8FAFC] p-4",
        className
      )}
    >
      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[32px]">
        <Image
          src={avatarSrc}
          onError={(e) => {
            e.currentTarget.src = AVATAR_FALLBACK;
          }}
          alt=""
          fill
          className="object-cover"
          sizes="88px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <span className={cn(NAME_CLASS, "truncate")}>{fullName}</span>
        {children}
      </div>
    </div>
  );
}
