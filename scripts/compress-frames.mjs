import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

const SRC = "public/frames";
const DST = "public/frames-compressed";
const TOTAL = 220;
const QUALITY = 45;
const WIDTH = 960;

mkdirSync(DST, { recursive: true });

let done = 0;
const errors = [];

for (let i = 1; i <= TOTAL; i++) {
  const name = `hero-sequence-${String(i).padStart(4, "0")}.webp`;
  const src = join(SRC, name);
  const dst = join(DST, name);

  if (!existsSync(src)) {
    errors.push(`Missing: ${src}`);
    continue;
  }

  try {
    await sharp(src)
      .resize(WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(dst);
    done++;
    if (done % 20 === 0) process.stdout.write(`\r  ${done}/${TOTAL} compressed...`);
  } catch (e) {
    errors.push(`Error on ${name}: ${e.message}`);
  }
}

console.log(`\n  Done: ${done}/${TOTAL} frames`);
if (errors.length) console.log("  Errors:", errors);
