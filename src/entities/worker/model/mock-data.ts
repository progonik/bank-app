import type { Worker } from "./types";

/* ============================== CONSTANTS ============================== */

const FIRST_NAMES = [
  "Sanjar", "Jasur", "Otabek", "Aziz", "Bekzod", "Sherzod", "Sardor", "Jamshid", "Islom",
  "Maruf", "Dilshod", "Umid", "Rustam", "Akmal", "Doston", "Farrux", "Shoxrux", "Ibrohim",
  "Temur", "Alisher", "Madina", "Dilnoza", "Zarina", "Malika", "Shahnoza", "Gulnoza",
  "Nigina", "Sevara", "Nilufar", "Lola", "Mohira", "Munisa", "Sitora", "Rayhona"
] as const;

const LAST_NAMES = [
  "Qobilov", "Karimov", "Rahimov", "Ergashev", "Toshmatov", "Abdullayev", "Akbarov",
  "Rasulov", "Tursunov", "Ismoilov", "Yusupov", "Xudoyberdiyev", "Nazarov", "Shodmonov",
  "Soliyev", "Akhmedov", "Xasanov", "Mamatov"
] as const;

const ROLES: Worker["role"][] = [
  "officeWorker",
  "freelancer",
  "developer",
  "designer",
  "operator",
  "salesperson",
  "unemployed"
];

const CATEGORIES: Worker["categories"][number][] = [
  "developer",
  "golang",
  "uiUxDesigner",
  "graphicDesigner",
  "operator",
  "salesperson",
  "translator"
];

const REGIONS: Worker["region"][] = [
  "tashkentCity",
  "andijan"
];

const STATUS: Worker["status"][] = ["active", "blocked"];
const TARIFF: Worker["tariff"][] = ["free", "vip"];

const COUNTRY: Worker["country"] = "uzbekistan";
const AVATAR = "/images/avatar.jpg";

/* ============================== HELPERS ============================== */

const randomFrom = <T>(arr: readonly T[], seed: number): T => {
  return arr[seed % arr.length];
};

const generatePhone = (i: number): string => {
  const code = 90 + (i % 8);
  const part1 = String(100 + (i * 13) % 900);
  const part2 = String(1000 + (i * 97) % 9000);
  return `+998 ${code} ${part1} ${part2}`;
};

const generateSalary = (i: number): string => {
  if (i % 7 === 0) return "undefined";
  if (i % 3 === 0) return `${300 + (i % 10) * 50}$`;
  return `${1_500_000 + (i % 8) * 500_000}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const generateCategories = (i: number): Worker["categories"] => {
  const count = (i % 3) + 1;
  return Array.from({ length: count }, (_, idx) =>
    randomFrom(CATEGORIES, i + idx)
  );
};

const generateDate = (i: number): string => {
  const day = String((i % 28) + 1).padStart(2, "0");
  const month = "01";
  const year = "2025";
  return `${day}.${month}.${year}`;
};

const generateFullName = (i: number): string => {
  const first = randomFrom(FIRST_NAMES, i);
  const last = randomFrom(LAST_NAMES, i * 3);
  return `${last} ${first}`;
};

/* ============================== FACTORY ============================== */

export const createWorker = (id: number): Worker => {
  return {
    id: String(id),
    fullName: generateFullName(id),
    role: randomFrom(ROLES, id),
    avatar: AVATAR,
    phone: generatePhone(id),
    telegram: `@user${id}`,
    categories: generateCategories(id),
    salary: generateSalary(id),
    tariff: randomFrom(TARIFF, id),
    country: COUNTRY,
    region: randomFrom(REGIONS, id),
    registrationDate: generateDate(id),
    status: randomFrom(STATUS, id),
  };
};

/* ============================== EXPORT ============================== */

const TOTAL_WORKERS = 2000;

export const MOCK_WORKERS: Worker[] = Array.from(
  { length: TOTAL_WORKERS },
  (_, i) => createWorker(i + 1)
);