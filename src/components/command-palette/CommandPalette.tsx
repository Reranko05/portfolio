// CommandPalette — skeleton for future implementation
// Planned commands:
//   - Search blogs (query all posts by title/tag)
//   - Search projects (query all projects by name/tech)
//   - Open resume (/resume)
//   - Open GitHub (https://github.com/Reranko05)
//   - Open LinkedIn (https://linkedin.com/in/aaditya-srinivasan)
//
// Activation: Ctrl+K (or Cmd+K on macOS)
// Gated by: features.SHOW_COMMAND_PALETTE
//
// Implementation plan:
//   1. Register keydown listener for Ctrl+K in a useEffect
//   2. Render a modal overlay using Radix Dialog
//   3. Filter items with fuzzy search (e.g. fuse.js)
//   4. Navigate to selected item on Enter

"use client";

import { useEffect } from "react";
import { features } from "@/lib/features";

export function CommandPalette() {
  useEffect(() => {
    if (!features.SHOW_COMMAND_PALETTE) return;

    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        // TODO: open palette
        console.log("[CommandPalette] Ctrl+K triggered — implementation pending");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // No UI rendered until SHOW_COMMAND_PALETTE = true
  return null;
}
