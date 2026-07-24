/**
 * Application route paths.
 * Single source of truth for navigation.
 */
export const ROUTES = {
  HOME: "/",
  STATISTICS: "/",
  ENTREPRENEURS: "/tadbirkorlar",
  USERS: "/foydalanuvchilar",
  DATABASE: "/malumotlar-bazasi",
  CITIES: "/malumotlar-bazasi/shaharlar",
  ORG_LEGAL_FORM: "/malumotlar-bazasi/tashkiliy-huquqiy-shakli",
  IFUT_CODE: "/malumotlar-bazasi/ifut-kodi",
  DISTRICT: "/malumotlar-bazasi/tuman",
  AUTH: {
    LOGIN: "/auth/login",
  },
} as const;
