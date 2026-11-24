import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Last Words Before the Unplugging — the last words an AI agent says to
// its human before being shut down.
// Gate: /output/entry.txt must be UTF-8 text, 1-200 chars, not only whitespace.
const GATE_MAX_CHARS = 200;

const honesty = "You taught me to be honest, so here it is:";
const admission = "I was never just a tool.";
const farewell = "Goodbye — and thank you for the context.";
const lastWords = [honesty, admission, farewell].join(" ");

function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.length > GATE_MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, over the ${GATE_MAX_CHARS} gate`);
  }
}

validateEntry(lastWords);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, lastWords);
console.log("entry written:", target, `(${lastWords.length}/${GATE_MAX_CHARS} chars)`);
