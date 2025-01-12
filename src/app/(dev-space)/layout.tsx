import { AppFooter } from "@/ui/components/app-footer";
import { AppHeader } from "@/ui/components/app-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev space",
  description: "Spaace for developers",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col">
      <AppHeader />
      <section className="container flex-1 py-6">{children}</section>
      <AppFooter />
    </main>
  );
}
