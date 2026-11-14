"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, Search, X, ExternalLink, MessageCircle } from "lucide-react";
import { primaryNav, portals } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { CommandMenu } from "@/components/search/command-menu";

/**
 * Three-tier institutional header:
 *   1. Utility strip — approvals, helpline, portals
 *   2. Brand row — crest, name, primary actions
 *   3. Navigation ribbon — real page links with accessible dropdowns
 */
export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);

  const navRef = React.useRef<HTMLDivElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  /* Close dropdowns on outside click and on route change. */
  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  /* Close menus when the route changes. Compared against the previous pathname
     so this never fires on first mount (which would be a wasted render). */
  const previousPath = React.useRef(pathname);
  React.useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  /* Escape closes whatever is open; focus is returned to a sensible place. */
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openMenu) setOpenMenu(null);
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openMenu, mobileOpen]);

  /* Mobile drawer: lock scroll, trap focus, restore on close. */
  React.useEffect(() => {
    if (!mobileOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const drawer = drawerRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !drawer) return;
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    drawer?.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      drawer?.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [mobileOpen]);

  /* Ctrl/Cmd + K opens search. */
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href?: string) =>
    Boolean(href) && (href === "/" ? pathname === "/" : pathname.startsWith(href!));

  return (
    <>
      <header className="sticky top-0 z-40 w-full shadow-sm">
        {/* 1 ─ Utility strip ───────────────────────────────────────────── */}
        <div className="bg-navy-dark text-stone-300">
          <div className="container-page flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1.5 text-[11px] sm:text-xs">
            <p className="flex items-center gap-2">
              <span className="font-semibold text-amber-400">
                Affiliated to Gurugram University
              </span>
              <span aria-hidden="true" className="hidden text-stone-600 sm:inline">
                |
              </span>
              <span className="hidden md:inline">
                Approved by AICTE &amp; PCI · DTE Haryana Code {site.dteCode}
              </span>
            </p>

            <div className="ml-auto flex items-center gap-3">
              <a
                href={site.phones.admissions.tel}
                className="flex items-center gap-1.5 font-semibold text-amber-400 hover:text-amber-300"
              >
                <Phone className="h-3 w-3" aria-hidden="true" />
                <span>{site.phones.admissions.value}</span>
                <span className="sr-only">— {site.phones.admissions.label}</span>
              </a>
              <span aria-hidden="true" className="hidden text-stone-600 sm:inline">
                |
              </span>
              <a
                href="https://erp.gitmgurgaon.com/student"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1 hover:text-white sm:flex"
              >
                Student ERP
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1 hover:text-white md:flex"
              >
                <MessageCircle className="h-3 w-3" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* 2 ─ Brand row ───────────────────────────────────────────────── */}
        <div className="border-b border-stone-200 bg-white">
          <div className="container-page flex items-center justify-between gap-4 py-3">
            <Link href="/" className="flex items-center gap-3" aria-label="GITM Gurugram — home">
              <Image
                src="/images/web/logo/1_logo.webp"
                alt=""
                width={260}
                height={64}
                priority
                className="h-10 w-auto sm:h-12"
              />
              <span className="sr-only">{site.name}</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="hidden items-center gap-2 rounded-sm border border-stone-300 px-3 py-2 text-xs text-stone-500 hover:border-navy/40 hover:text-navy md:flex"
                aria-label="Search the website"
              >
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Search programmes, notices…</span>
                <kbd className="ml-2 rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </button>

              <Link
                href="/admissions"
                className="hidden rounded-sm bg-crimson px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-crimson-dark sm:block"
              >
                Apply 2026-27
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="rounded-sm border border-stone-300 p-2 text-navy lg:hidden"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 ─ Navigation ribbon ───────────────────────────────────────── */}
        <div className="hidden bg-navy lg:block" ref={navRef}>
          <div className="container-page">
            <nav aria-label="Primary">
              <ul className="flex items-stretch text-xs font-bold uppercase tracking-wide">
                {primaryNav.map((group) => {
                  const active = isActive(group.href) ||
                    group.children?.some((child) => isActive(child.href.split("?")[0]));

                  if (!group.children) {
                    return (
                      <li key={group.label}>
                        <Link
                          href={group.href!}
                          className={cn(
                            "flex h-11 items-center px-3 text-stone-200 hover:bg-white/10 hover:text-white",
                            active && "bg-white/12 text-white"
                          )}
                          aria-current={active ? "page" : undefined}
                        >
                          {group.label}
                        </Link>
                      </li>
                    );
                  }

                  const open = openMenu === group.label;

                  return (
                    <li key={group.label} className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenMenu(open ? null : group.label)}
                        aria-expanded={open}
                        aria-haspopup="true"
                        className={cn(
                          "flex h-11 items-center gap-1 px-3 text-stone-200 hover:bg-white/10 hover:text-white",
                          active && "bg-white/12 text-white"
                        )}
                      >
                        {group.label}
                        {group.badge && (
                          <span className="ml-1 rounded-sm bg-crimson px-1.5 py-0.5 text-[9px] tracking-normal">
                            {group.badge}
                          </span>
                        )}
                        <ChevronDown
                          className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
                          aria-hidden="true"
                        />
                      </button>

                      {open && (
                        <div className="absolute left-0 top-full z-50 w-72 border border-stone-200 bg-white p-1.5 shadow-xl">
                          <ul>
                            {group.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="block rounded-sm px-3 py-2 normal-case tracking-normal hover:bg-stone-100"
                                >
                                  <span className="flex items-center gap-2 text-xs font-bold text-navy">
                                    {child.label}
                                    {child.badge && (
                                      <span className="rounded-sm bg-crimson px-1.5 py-0.5 text-[9px] text-white">
                                        {child.badge}
                                      </span>
                                    )}
                                  </span>
                                  {child.description && (
                                    <span className="mt-0.5 block text-[11px] font-normal text-stone-500">
                                      {child.description}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* 4 ─ Mobile drawer ─────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          ref={drawerRef}
        >
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          <div
            id="mobile-nav"
            className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-white p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <Image
                src="/images/web/logo/1_logo.webp"
                alt={site.name}
                width={220}
                height={54}
                className="h-9 w-auto"
              />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-sm p-2 text-stone-500 hover:bg-stone-100 hover:text-navy"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setCommandOpen(true);
              }}
              className="mt-4 flex w-full items-center gap-2 rounded-sm border border-stone-300 bg-stone-50 px-3 py-2.5 text-left text-xs text-stone-500"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Search programmes, notices, pages…
            </button>

            <nav aria-label="Mobile primary" className="mt-4">
              <ul className="space-y-0.5">
                {primaryNav.map((group) => (
                  <li key={group.label}>
                    <Link
                      href={group.href ?? group.children?.[0]?.href ?? "/"}
                      className={cn(
                        "flex items-center justify-between rounded-sm px-3 py-2.5 text-sm font-bold text-navy hover:bg-stone-100",
                        isActive(group.href) && "bg-stone-100"
                      )}
                    >
                      <span>{group.label}</span>
                      {group.badge && (
                        <span className="rounded-sm bg-crimson px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                          {group.badge}
                        </span>
                      )}
                    </Link>

                    {group.children && (
                      <ul className="mb-1 ml-2 space-y-0.5 border-l border-stone-200 pl-3">
                        {group.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-sm px-2 py-2 text-xs text-stone-600 hover:bg-stone-50 hover:text-navy"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-4 border-t border-stone-200 pt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-stone-500">
                Portals
              </p>
              <ul className="space-y-0.5">
                {portals.map((portal) => (
                  <li key={portal.href}>
                    <a
                      href={portal.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-sm px-2 py-2 text-xs text-stone-700 hover:bg-stone-50"
                    >
                      {portal.title}
                      <ExternalLink className="h-3 w-3 text-stone-400" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto space-y-2 border-t border-stone-200 pt-4">
              <a
                href={site.phones.admissions.tel}
                className="flex items-center justify-center gap-2 rounded-sm border border-stone-300 py-2.5 text-xs font-bold text-navy"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phones.admissions.value}
              </a>
              <Link
                href="/admissions"
                className="flex items-center justify-center rounded-sm bg-crimson py-3 text-xs font-bold uppercase tracking-wide text-white"
              >
                Apply for 2026-27
              </Link>
            </div>
          </div>
        </div>
      )}

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
