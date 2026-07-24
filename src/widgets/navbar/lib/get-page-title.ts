import { createSidebarMenu, getPageTitleKey } from "@entities/navigation";
import { createTranslator } from "@shared/lib/i18n";
import type { Language } from "@shared/lib/i18n";

export function getPageTitle(pathname: string, language: Language): string {
  const t = createTranslator(language);
  const menu = createSidebarMenu(t);
  const key = getPageTitleKey(pathname);

  if (key) return t(key);

  const directMatch = menu.find((m) => m.href === pathname);
  if (directMatch) return directMatch.name;

  for (const m of menu) {
    const child = m.children?.find((c) => c.href === pathname);
    if (child) return m.name;
  }

  const partialMatch = menu.find(
    (m) => pathname.startsWith(m.href) && m.href !== "/" && m.href !== "#"
  );
  if (partialMatch) return partialMatch.name;

  for (const m of menu) {
    const child = m.children?.find(
      (c) =>
        pathname.startsWith(c.href) && c.href !== "/" && c.href !== "#"
    );
    if (child) return m.name;
  }

  return menu[0]?.name ?? "";
}
