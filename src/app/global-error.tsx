"use client";

/** Last-resort boundary: must render its own <html>/<body>. */
/*
 * This boundary replaces the root layout, so it cannot rely on anything from
 * src/data/* (that module may be the thing that failed). The phone number is
 * therefore duplicated here on purpose. Keep it in sync with site.phones.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-IN">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: "4rem 1.5rem" }}>
        <main style={{ maxWidth: "40rem", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", color: "#0f2b48" }}>
            GITM Gurugram — temporarily unavailable
          </h1>
          <p style={{ color: "#57534e", fontSize: "0.9rem", lineHeight: 1.6 }}>
            We could not load this page. Please call the admissions helpline on{" "}
            <a href="tel:+919555100100" style={{ color: "#881337" }}>
              +91 95551 00100
            </a>{" "}
            or try again.
          </p>
          {error.digest && (
            <p style={{ color: "#a8a29e", fontSize: "0.75rem" }}>Reference: {error.digest}</p>
          )}
          <button
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.7rem 1.4rem",
              borderRadius: "2px",
              border: 0,
              background: "#0f2b48",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
