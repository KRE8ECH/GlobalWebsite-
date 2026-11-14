"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, CornerDownLeft } from "lucide-react";
import { programs } from "@/data/site";
import { fallbackNotices } from "@/data/content";
import { primaryNav } from "@/data/navigation";

type Result = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  group: "Pages" | "Programmes" | "Notices";
};

/**
 * Lightweight command palette. Indexes pages, programmes and notices locally so
 * it works with no backend — the previous version could not search once the
 * database was unavailable.
 */
export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  /* Changing the query invalidates the highlighted row. Doing it in the handler
     keeps the effect free of synchronous state updates. */
  const onQueryChange = (value: string) => {
    setQuery(value);
    setActiveIndex(0);
  };

  /* Build the index once. */
  const index = React.useMemo<Result[]>(() => {
    const pages: Result[] = [];
    for (const group of primaryNav) {
      if (group.href) {
        pages.push({
          id: `page-${group.href}`,
          title: group.label,
          subtitle: "Page",
          href: group.href,
          group: "Pages",
        });
      }
      for (const child of group.children ?? []) {
        pages.push({
          id: `page-${child.href}`,
          title: child.label,
          subtitle: child.description ?? group.label,
          href: child.href,
          group: "Pages",
        });
      }
    }

    const programmeResults: Result[] = programs.map((programme) => ({
      id: `programme-${programme.slug}`,
      title: programme.name,
      subtitle: `${programme.department} · ${programme.durationYears} years`,
      href: `/programmes/${programme.slug}`,
      group: "Programmes",
    }));

    const noticeResults: Result[] = fallbackNotices.map((notice) => ({
      id: `notice-${notice.id}`,
      title: notice.title,
      subtitle: `${notice.category} · ${notice.source === "GITM" ? "GITM" : "Gurugram University"}`,
      href: "/events#notices",
      group: "Notices",
    }));

    return [...pages, ...programmeResults, ...noticeResults];
  }, []);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return index.filter((item) => item.group !== "Notices").slice(0, 8);
    }
    return index
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [index, query]);

  /* Focus the input when the dialog opens. Focus is an external-system concern,
     so it belongs in an effect; state is reset by remounting instead (see the
     `key` on the dialog below). */
  React.useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(timer);
  }, [open]);

  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);

  const go = React.useCallback(
    (result?: Result) => {
      if (!result) return;
      close();
      router.push(result.href);
    },
    [close, router]
  );

  if (!open) return null;

  /* Group results for display while keeping a flat index for arrow keys. */
  const grouped = results.reduce<Record<string, Result[]>>((acc, item) => {
    (acc[item.group] ??= []).push(item);
    return acc;
  }, {});

  let runningIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-md border border-stone-200 bg-white shadow-2xl"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.stopPropagation();
            close();
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((i) => (i + 1) % Math.max(results.length, 1));
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
          } else if (event.key === "Enter") {
            event.preventDefault();
            go(results[activeIndex]);
          }
        }}
      >
        <div className="flex items-center gap-3 border-b border-stone-200 px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-stone-400" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search programmes, pages, notices…"
            aria-label="Search the website"
            aria-controls="command-results"
            className="w-full bg-transparent text-sm text-navy placeholder:text-stone-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={close}
            className="rounded-sm p-1 text-stone-400 hover:bg-stone-100 hover:text-navy"
            aria-label="Close search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <ul
          id="command-results"
          ref={listRef}
          className="max-h-[55vh] overflow-y-auto py-2"
          role="listbox"
          aria-label="Search results"
        >
          {results.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-stone-500">
              No matches for “{query}”.
            </li>
          )}

          {Object.entries(grouped).map(([group, items]) => (
            <li key={group}>
              <p className="px-4 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wide text-stone-400">
                {group}
              </p>
              <ul>
                {items.map((item) => {
                  runningIndex += 1;
                  const isActive = runningIndex === activeIndex;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onPointerEnter={() => setActiveIndex(runningIndex)}
                        onClick={() => go(item)}
                        className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left ${
                          isActive ? "bg-stone-100" : ""
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-navy">
                            {item.title}
                          </span>
                          <span className="block truncate text-[11px] text-stone-500">
                            {item.subtitle}
                          </span>
                        </span>
                        {isActive && (
                          <CornerDownLeft
                            className="h-3.5 w-3.5 shrink-0 text-stone-400"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 border-t border-stone-200 bg-stone-50 px-4 py-2 text-[10px] text-stone-500">
          <span>
            <kbd className="rounded border border-stone-300 bg-white px-1">↑</kbd>{" "}
            <kbd className="rounded border border-stone-300 bg-white px-1">↓</kbd> to navigate
          </span>
          <span>
            <kbd className="rounded border border-stone-300 bg-white px-1">↵</kbd> to open
          </span>
          <span>
            <kbd className="rounded border border-stone-300 bg-white px-1">esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
