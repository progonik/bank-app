"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@shared/lib/utils";

const DialogContext = React.createContext<{
  onOpenChange?: (open: boolean) => void;
}>({});

function CustomDialog({
  open,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return (
    <DialogContext.Provider value={{ onOpenChange }}>
      <DialogPrimitive.Root
        data-slot="dialog"
        open={open}
        onOpenChange={(open) => {
          onOpenChange?.(open);
        }}
        {...props}
      />
    </DialogContext.Provider>
  );
}

function CustomDialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function CustomDialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function CustomDialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function CustomDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-[#02061880]",
        className
      )}
      {...props}
    />
  );
}

function CustomDialogContent({
  className,
  children,
  showCloseButton = true,
  onPointerDownOutside,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  const { onOpenChange } = React.useContext(DialogContext);

  const handlePointerDownOutside = React.useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-slot='popover-content']")) {
        e.preventDefault();
      }
      onPointerDownOutside?.(e as React.PointerEvent);
    },
    [onPointerDownOutside]
  );

  return (
    <CustomDialogPortal data-slot="dialog-portal">
      <CustomDialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-0 right-0 z-50 grid w-full min-w-[900px] max-w-[900px] overflow-y-auto bottom-0 duration-200 sm:max-w-lg p-4",
          className
        )}
        onPointerDownOutside={handlePointerDownOutside}
        {...props}
      >
        <div className="bg-white rounded-[16px] border p-6 shadow-lg">
          {children}
        </div>
      </DialogPrimitive.Content>
    </CustomDialogPortal>
  );
}

function CustomDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function CustomDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function CustomDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CustomDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  CustomDialog,
  CustomDialogClose,
  CustomDialogContent,
  CustomDialogDescription,
  CustomDialogFooter,
  CustomDialogHeader,
  CustomDialogOverlay,
  CustomDialogPortal,
  CustomDialogTitle,
  CustomDialogTrigger,
};
