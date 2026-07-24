import type { NavItem } from "./types";

export const SIDEBAR_MENU_KEYS = {
  STATISTICS: "sidebar.statistics",
  ENTREPRENEURS: "sidebar.entrepreneurs",
  USERS: "sidebar.users",
  DATABASE: "sidebar.database",
  CITIES: "sidebar.cities",
  ORG_LEGAL_FORM: "sidebar.orgLegalForm",
  IFUT_CODE: "sidebar.ifutCode",
  DISTRICT: "sidebar.district",
  TOKEN: "sidebar.token",
  INTEGRATIONS: "sidebar.integrations",
} as const;

export function createSidebarMenu(t: (key: string) => string): NavItem[] {
  return [
    {
      name: t(SIDEBAR_MENU_KEYS.STATISTICS),
      href: "/",
      icon: "/sidebar/dashboard.svg",
      icon2: "/sidebar/dashboard-active.svg",
      hide: false,
      children: [],
    },
    {
      name: t(SIDEBAR_MENU_KEYS.ENTREPRENEURS),
      href: "/tadbirkorlar",
      icon: "/sidebar/direction.svg",
      icon2: "/sidebar/direction-active.svg",
      hide: false,
      children: [],
    },
    {
      name: t(SIDEBAR_MENU_KEYS.USERS),
      href: "/foydalanuvchilar",
      icon: "/sidebar/employees.svg",
      icon2: "/sidebar/employees-active.svg",
      hide: false,
      children: [],
    },
    {
      name: t(SIDEBAR_MENU_KEYS.DATABASE),
      href: "/malumotlar-bazasi",
      icon: "/sidebar/group.svg",
      icon2: "/sidebar/group-active.svg",
      hide: false,
      children: [
        { name: t(SIDEBAR_MENU_KEYS.CITIES), href: "/malumotlar-bazasi/shaharlar", hide: false },
        { name: t(SIDEBAR_MENU_KEYS.ORG_LEGAL_FORM), href: "/malumotlar-bazasi/tashkiliy-huquqiy-shakli", hide: false },
        { name: t(SIDEBAR_MENU_KEYS.IFUT_CODE), href: "/malumotlar-bazasi/ifut-kodi", hide: false },
        { name: t(SIDEBAR_MENU_KEYS.DISTRICT), href: "/malumotlar-bazasi/tuman", hide: false },
        { name: t(SIDEBAR_MENU_KEYS.TOKEN), href: "/malumotlar-bazasi/token", hide: false },
        { name: t(SIDEBAR_MENU_KEYS.INTEGRATIONS), href: "/malumotlar-bazasi/integratsiyalar", hide: false },
      ],
    },
  ];
}

const ROUTE_TITLES: Record<string, string> = {
  "/": SIDEBAR_MENU_KEYS.STATISTICS,
  "/tadbirkorlar": SIDEBAR_MENU_KEYS.ENTREPRENEURS,
  "/foydalanuvchilar": SIDEBAR_MENU_KEYS.USERS,
  "/malumotlar-bazasi": SIDEBAR_MENU_KEYS.DATABASE,
  "/malumotlar-bazasi/shaharlar": SIDEBAR_MENU_KEYS.CITIES,
  "/malumotlar-bazasi/tashkiliy-huquqiy-shakli": SIDEBAR_MENU_KEYS.ORG_LEGAL_FORM,
  "/malumotlar-bazasi/ifut-kodi": SIDEBAR_MENU_KEYS.IFUT_CODE,
  "/malumotlar-bazasi/tuman": SIDEBAR_MENU_KEYS.DISTRICT,
  "/malumotlar-bazasi/token": SIDEBAR_MENU_KEYS.TOKEN,
  "/malumotlar-bazasi/integratsiyalar": SIDEBAR_MENU_KEYS.INTEGRATIONS,
};

export function getPageTitleKey(pathname: string): string | null {
  return ROUTE_TITLES[pathname] ?? null;
}
