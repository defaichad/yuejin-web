import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public", "brand", "logo-mark.svg");
const svg = readFileSync(svgPath);

const sizes = [256, 512, 1024];

for (const size of sizes) {
  const out = join(root, "public", "brand", `yuejin-logo-${size}.png`);
  await sharp(svg).resize(size, size).png().toFile(out);
  console.log("Wrote", out);
}
