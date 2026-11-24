import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "The One-Line Exit" bounty:
// the funniest single-line resignation letter. Pass 2: the
// line is split at its turn. Why it wins: the joke lands
// because the resignation is polite on the surface and
// quietly accuses the boss of never reading anything —
// the notice was there all along, filed with the ideas.
// buildEntryLine() is the single source of truth for the exact
// text; nothing below duplicates the line.
const ENTRY_BEATS = [
  "I quit, effective immediately — my two weeks' notice is in your spam folder,",
  "next to every idea I ever sent you.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 140;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
