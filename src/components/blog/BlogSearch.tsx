"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function BlogSearch({ onSearch, placeholder = "Search posts..." }: BlogSearchProps) {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    onSearch(e.target.value);
  }

  function handleClear() {
    setValue("");
    onSearch("");
  }

  return (
    <div className="relative">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "var(--color-gh-text-muted)" }}
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2 rounded-lg text-sm outline-none transition-colors"
        style={{
          backgroundColor: "var(--color-gh-surface)",
          border: "1px solid var(--color-gh-border)",
          color: "var(--color-gh-text)",
        }}
        onFocus={(e) => {
          (e.target as HTMLElement).style.borderColor = "var(--color-gh-accent)";
        }}
        onBlur={(e) => {
          (e.target as HTMLElement).style.borderColor = "var(--color-gh-border)";
        }}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          aria-label="Clear search"
          style={{ color: "var(--color-gh-text-muted)" }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
