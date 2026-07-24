import { RootLayout } from "@widgets/layout";

export default function RootRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
