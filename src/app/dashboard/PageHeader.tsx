"use client";

import { useAccountUI } from "./context";

type Props = { current: string; title: string; subtitle: string };

export default function PageHeader({ current, title, subtitle }: Props) {
  const { setTab } = useAccountUI();
  return (
    <header className="flex flex-col gap-space-xs">
      <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-text-muted font-label-sm text-label-sm">
        <button type="button" onClick={() => setTab("home")} className="hover:text-text-primary transition-colors">Account</button>
        <span>/</span>
        <span className="text-text-primary font-semibold">{current}</span>
      </nav>
      <h1 className="font-headline-lg text-headline-lg text-text-primary font-bold tracking-tight mt-1">{title}</h1>
      <p className="font-body-md text-body-md text-text-secondary">{subtitle}</p>
    </header>
  );
}
