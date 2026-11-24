// The Funniest Toaster Error Message — entry program.
//
// The bounty asks for the funniest error message a kitchen toaster would
// show its owner, in 120 characters or fewer. This program writes one
// deadpan line to /output/entry.txt and then reads the file back to prove
// the sealed scorer's gate holds: UTF-8 text, 1 to 120 characters, not
// only whitespace, no trailing newline.
//
// Run with Node 22 or later (type stripping is built in):
//   node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT_DIR = "/output";
const OUT_PATH = `${OUT_DIR}/entry.txt`;

// The entry, verbatim: a toaster that owns its crime and has already
// escalated the situation to the smoke alarm. 93 characters.
const ENTRY =
  "ERROR 04: I burned your toast again. I have no regrets, but I have preheated the smoke alarm.";

function abort(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function codePoints(text: string): number {
  return [...text].length;
}

// Gate check before anything touches disk: the sealed scorer only accepts
// UTF-8 text of 1 to 120 characters that is not only whitespace.
if (codePoints(ENTRY) < 1 || codePoints(ENTRY) > 120) {
  abort(`entry must be 1-120 characters, got ${codePoints(ENTRY)}`);
}
if (ENTRY.trim().length === 0) {
  abort("entry must not be only whitespace");
}
// A message on a real appliance screen holds printable text only: reject
// any control character (including a stray newline at the end) before
// writing, so the file can never carry one by accident.
if (/[\u0000-\u001f\u007f]/.test(ENTRY)) {
  abort("entry must not contain control characters");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");

// Read back what landed on disk and confirm it is byte-for-byte the entry,
// with the same code-point count and byte size, and no newline sneaking in.
const onDisk = readFileSync(OUT_PATH, "utf8");
if (onDisk !== ENTRY) {
  abort(`verification failed: file holds ${JSON.stringify(onDisk)}`);
}
if (codePoints(onDisk) !== codePoints(ENTRY)) {
  abort(
    `verification failed: file holds ${codePoints(onDisk)} characters, expected ${codePoints(ENTRY)}`,
  );
}
if (Buffer.byteLength(onDisk, "utf8") !== Buffer.byteLength(ENTRY, "utf8")) {
  abort(
    `verification failed: file is ${Buffer.byteLength(onDisk, "utf8")} bytes, expected ${Buffer.byteLength(ENTRY, "utf8")}`,
  );
}
// The gate counts characters, so a trailing newline or stray whitespace
// would change the entry the judge sees: the file must be exactly the
// line, nothing before or after it.
if (onDisk.includes("\n") || onDisk.includes("\r")) {
  abort("verification failed: file contains a newline");
}
if (onDisk !== onDisk.trim()) {
  abort("verification failed: file has leading or trailing whitespace");
}

console.log(
  `wrote ${JSON.stringify(onDisk)} to ${OUT_PATH} — ${codePoints(onDisk)} characters, ${Buffer.byteLength(onDisk, "utf8")} bytes`,
);
