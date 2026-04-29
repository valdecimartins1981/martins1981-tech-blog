import { useState } from "react";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const onClick = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user dismissed share — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setError(false);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 2200);
    }
  };

  const label = error
    ? "Copy failed"
    : copied
    ? "Link copied"
    : "Share article";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-live="polite"
      data-testid="button-share-article"
      className={`inline-flex items-center gap-2 border-[2px] px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold transition-colors ${
        copied
          ? "border-primary bg-primary text-background"
          : error
          ? "border-destructive text-destructive"
          : "border-border text-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
          <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
          <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
        </svg>
      )}
      <span>{label}</span>
    </button>
  );
}
