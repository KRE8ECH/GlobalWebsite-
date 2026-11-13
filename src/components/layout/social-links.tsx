import { socials } from "@/data/site";

/**
 * Inline brand icons. Lucide removed brand marks, and pulling a whole icon pack
 * for five glyphs is not worth the bundle cost.
 */
const paths: Record<string, string> = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.42.42.68.83.9 1.4.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.42.42-.83.68-1.4.9-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.42-.42-.68-.83-.9-1.4-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.42-.42.83-.68 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-1 .04-1.5.2-1.8.33-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.13.3-.3.8-.33 1.8C3.3 9.2 3.3 9.6 3.3 12s0 2.8.07 4c.04 1 .2 1.5.33 1.8.2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.13.8.3 1.8.33 1.2.06 1.6.07 4.7.07s3.5 0 4.7-.07c1-.04 1.5-.2 1.8-.33.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.13-.3.3-.8.33-1.8.06-1.2.07-1.6.07-4s0-2.8-.07-4c-.04-1-.2-1.5-.33-1.8-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.3-.13-.8-.3-1.8-.33C15.5 4 15.1 4 12 4Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-3.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z",
  facebook:
    "M13.5 21v-7.4h2.6l.4-3h-3V8.7c0-.87.25-1.47 1.53-1.47H16.6V4.55c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.95 1.4-3.95 3.98v2.19H7.6v3h2.68V21h3.22Z",
  x: "M17.5 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.7L4.3 21H1l7.7-8.8L1.3 3H8l4.7 6.1L17.5 3Zm-1.2 16h1.8L7.8 4.9H5.9L16.3 19Z",
  youtube:
    "M21.6 7.2a2.5 2.5 0 0 0-1.75-1.76C18.3 5 12 5 12 5s-6.3 0-7.85.44A2.5 2.5 0 0 0 2.4 7.2C2 8.75 2 12 2 12s0 3.25.4 4.8a2.5 2.5 0 0 0 1.75 1.76C5.7 19 12 19 12 19s6.3 0 7.85-.44a2.5 2.5 0 0 0 1.75-1.76C22 15.25 22 12 22 12s0-3.25-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z",
};

export function SocialLinks({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <ul className="flex items-center gap-2">
      {socials.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site_label(social.name)} — ${social.handle} (opens in a new tab)`}
            className={
              variant === "dark"
                ? "flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 text-stone-300 transition-colors hover:border-amber-400 hover:bg-white/10 hover:text-white"
                : "flex h-9 w-9 items-center justify-center rounded-sm border border-stone-200 text-navy transition-colors hover:border-navy hover:bg-stone-100"
            }
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path d={paths[social.brand]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

function site_label(name: string) {
  return `GITM on ${name}`;
}
