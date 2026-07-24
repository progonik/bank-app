export interface NavItem {
  name: string;
  href: string;
  icon: string;
  icon2?: string;
  hide?: boolean;
  children?: NavItemChild[];
}

export interface NavItemChild {
  name: string;
  href: string;
  hide?: boolean;
}
