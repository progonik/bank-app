export function matchesPath(menuHref: string, currentPath: string): boolean {
  const normalizedHref = menuHref === "/" ? "/" : menuHref.replace(/\/$/, "");
  const normalizedPath = currentPath === "/" ? "/" : currentPath.replace(/\/$/, "");

  return (
    normalizedPath === normalizedHref ||
    (normalizedHref !== "/" && normalizedPath.startsWith(normalizedHref + "/"))
  );
}
