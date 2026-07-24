"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@shared/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@shared/ui";
import { useSidebarStore } from "@entities/sidebar";
import { useI18nStore } from "@shared/lib/i18n";
import { createTranslator } from "@shared/lib/i18n";
import { createSidebarMenu } from "@entities/navigation";
import type { NavItem } from "@entities/navigation";
import { matchesPath } from "../../lib/url-matcher";

const LOGO_PATH = "/sidebar/logo.png";
const TOGGLE_ICON = "/icons/CaretLeft.svg";

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const language = useI18nStore((s) => s.language);
  const { isOpen, toggle } = useSidebarStore();

  const t = useMemo(() => createTranslator(language), [language]);
  const menu = useMemo(() => createSidebarMenu(t), [t]);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const isActive = useCallback(
    (item: NavItem) => {
      if (!item.children?.length) return matchesPath(item.href, pathname);
      return item.children.some((c) => matchesPath(c.href, pathname));
    },
    [pathname]
  );

  const handleItemClick = useCallback(
    (item: NavItem, index: number) => {
      if (!item.children?.length) {
        router.push(item.href);
        setExpandedIndex(null);
      } else {
        setExpandedIndex((prev) => (prev === index ? null : index));
      }
    },
    [router]
  );

  const visibleMenu = useMemo(
    () => menu.filter((m) => !m.hide),
    [menu]
  );

  return (
    <div
      className={cn(
        isOpen ? "w-[263px] min-w-[264px]" : "w-[76px] min-w-[76px]",
        "h-screen bg-[#F8FAFC] border-r border-[#E2E8F0] z-30 relative transition-all duration-300"
      )}
    >
      <div className={cn("w-full p-4", !isOpen ? "p-4" : "p-6")}>
        <Link href="/">
          <Image
            src={LOGO_PATH}
            alt="Logo"
            width={isOpen ? 90 : 43}
            height={43}
            className={isOpen ? "min-h-[43px] object-cover ml-3" : undefined}
          />
        </Link>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle sidebar"
        className="cursor-pointer absolute top-[21px] -right-[16px] h-[32px] w-[32px] border border-[#E2E8F0] bg-white rounded-full flex justify-center items-center z-50 transition-all duration-300"
      >
        <Image
          src={TOGGLE_ICON}
          width={16}
          height={16}
          alt="Toggle"
          className={cn("transition-transform", isOpen && "rotate-180")}
        />
      </button>

      <nav className={cn("px-6 overflow-y-auto no-scrollbar absolute right-0 left-0 bottom-0 h-[calc(100vh-101px)] pb-[70px]", !isOpen ? "px-4" : "px-6")}>
        {isOpen ? (
          <ExpandedMenu
            menu={visibleMenu}
            pathname={pathname}
            expandedIndex={expandedIndex}
            onItemClick={handleItemClick}
            isActive={isActive}
          />
        ) : (
          <CollapsedMenu
            menu={visibleMenu}
            pathname={pathname}
            isActive={isActive}
          />
        )}
      </nav>
    </div>
  );
}

interface MenuProps {
  menu: NavItem[];
  pathname: string;
  isActive: (item: NavItem) => boolean;
}

interface ExpandedMenuProps extends MenuProps {
  expandedIndex: number | null;
  onItemClick: (item: NavItem, index: number) => void;
}

function ExpandedMenu({
  menu,
  pathname,
  expandedIndex,
  onItemClick,
  isActive,
}: ExpandedMenuProps) {
  return (
    <>
      {menu.map((item, index) => (
        <div
          key={index}
          className={cn(
            expandedIndex === index && "bg-white! px-3 rounded-[8px] shadow-slate-200 shadow-sm transition-all duration-300",
            "w-full cursor-pointer px-3 transition-all duration-300"
          )}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={() => onItemClick(item, index)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && onItemClick(item, index)
            }
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center gap-[6px] flex-1 min-w-0">
              <div className="w-[48px] h-[48px] flex justify-center items-center flex-shrink-0">
                <Image
                  src={isActive(item) && item.icon2 ? item.icon2 : item.icon}
                  alt={item.name}
                  width={24}
                  height={24}
                />
              </div>
              <span
                className={cn(
                  isActive(item) ? "text-[#2563EB]" : "text-[#334155]",
                  "text-[14px] leading-[20px] font-medium break-words transition-all duration-300"
                )}
              >
                {item.name}
              </span>
            </div>
            {item.children?.length ? (
              <ChevronDown
                className={cn(
                  expandedIndex === index ? "text-[#2563EB] rotate-180" : "text-[#334155]",
                  "w-5 h-5 transition-all duration-300 flex-shrink-0"
                )}
              />
            ) : null}
          </div>

          <AnimatePresence initial={false}>
            {expandedIndex === index && item.children?.length ? (
              <motion.div
                className="pl-[32px] overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {item.children
                  .filter((c) => !c.hide)
                  .map((child, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-[6px] py-3 px-4"
                    >
                      <Link
                        href={child.href}
                        className={cn(
                          matchesPath(child.href, pathname)
                            ? "text-[#2563EB]"
                            : "text-[#334155]",
                          "text-[14px] hover:text-[#2563EB] leading-[20px] font-medium cursor-pointer break-words transition-all duration-300"
                        )}
                      >
                        {child.name}
                      </Link>
                    </div>
                  ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
}

function CollapsedMenu({ menu, pathname, isActive }: MenuProps) {
  return (
    <>
      {menu.map((item, index) =>
        item.children?.length ? (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <div className="py-2 w-[44px] flex justify-center items-center mb-5 cursor-pointer group">
                <Image
                  src={isActive(item) && item.icon2 ? item.icon2 : item.icon}
                  alt={item.name}
                  width={24}
                  height={24}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-[#E2E8F0] w-[236px] ml-[54px]">
              {item.children
                .filter((c) => !c.hide)
                .map((child, i) => (
                  <DropdownMenuLabel key={i} className="px-4 py-3">
                    <Link
                      href={child.href}
                      className={cn(
                        matchesPath(child.href, pathname)
                          ? "text-[#2563EB]"
                          : "text-[#334155]",
                        "text-[14px] hover:text-[#2563EB] leading-[20px] font-medium cursor-pointer break-words"
                      )}
                    >
                      {child.name}
                    </Link>
                  </DropdownMenuLabel>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            key={index}
            href={item.href}
            className="py-2 w-[44px] flex justify-center items-center mb-5 cursor-pointer group block"
          >
            <Image
              src={isActive(item) && item.icon2 ? item.icon2 : item.icon}
              alt={item.name}
              width={24}
              height={24}
            />
          </Link>
        )
      )}
    </>
  );
}
