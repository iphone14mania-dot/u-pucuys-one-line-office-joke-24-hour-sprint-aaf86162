// One-Line Office Joke: 24-Hour Sprint — entry program.
//
// Writes one short text to /output/entry.txt: a single-line joke about
// office life. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. One sentence, setup and punchline on a single line
// (brief criterion 3): ask HR for a raise, get a mindfulness app instead,
// and the punchline — "calmly underpaid" — pays off the setup with a
// two-word twist anyone who has sat in an office recognises (criterion 2).
// The detail is specific rather than a generic complaint (criterion 4):
// a wellness app handed out as a substitute for pay, a modern office
// ritual. Tight wording, clear on first read (criterion 5).
// Revision: an earlier draft ended "...so now I meditate on my payslip."
// — dropped, because it explains the joke after the punch; "calmly
// underpaid" lands the same idea in two words and stops.
const ENTRY =
  "I asked HR for a raise and they gave me a mindfulness app, so now I'm calmly underpaid.";

// Competition rules: 1 to 200 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
