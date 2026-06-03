"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback — do nothing
    }
  }

  return (
    <button
      onClick={handleCopy}
      title="Copy link to article"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all duration-150"
      style={{
        backgroundColor: copied
          ? "var(--color-gh-success-muted)"
          : "var(--color-gh-elevated)",
        border: `1px solid ${
          copied ? "var(--color-gh-success)" : "var(--color-gh-border)"
        }`,
        color: copied ? "var(--color-gh-success)" : "var(--color-gh-text-muted)",
      }}
    >
      {copied ? <Check size={13} /> : <Link2 size={13} />}
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
}
