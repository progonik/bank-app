"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Button,
  CustomDialog,
  CustomDialogContent,
  CustomDialogTrigger,
} from "@shared/ui";
import { cn } from "@shared/lib/utils";
import type { TableHeaderProps } from "./types";

const ADD_ICON_SIZE = 20;

export function PageTableHeader({
  title,
  breadcrumb,
  toolbar,
  action,
  className,
}: TableHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between w-full gap-4",
        className
      )}
    >
      <div className="flex items-center justify-center h-11 shrink-0 gap-6">
        <h2 className="text-[20px] leading-[28px] font-semibold text-[#1E293B]">
          {breadcrumb && (
            <>
              <Link
                href={breadcrumb.href}
                className="hover:underline"
              >
                {breadcrumb.label}
                {" / "}
              </Link>
            </>
          )}
          {title}
        </h2>
        {toolbar && (
          <div className="flex items-center gap-2 shrink-0">
            {toolbar}
          </div>
        )}
      </div>

      {action && (
        <CustomDialog
          open={action.open}
          onOpenChange={action.onOpenChange}
        >
          <CustomDialogTrigger asChild>
            <Button
              className="text-[16px] leading-[22px] font-medium h-12 px-5 cursor-pointer"
              disabled={action.disabled}
            >
              <Image
                src="/icons/plus.svg"
                alt=""
                width={ADD_ICON_SIZE}
                height={ADD_ICON_SIZE}
              />
              {action.label}
            </Button>
          </CustomDialogTrigger>
          <CustomDialogContent
            className={cn("w-[575px] min-w-[575px]", action.dialogClassName)}
          >
            {action.dialogContent}
          </CustomDialogContent>
        </CustomDialog>
      )}
    </header>
  );
}
