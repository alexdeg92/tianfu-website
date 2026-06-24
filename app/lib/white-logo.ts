import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const LOGO_PATH = join(
  process.cwd(),
  "public/images/Image_20240309211911-500x311.png",
);

/** Matches site header: brightness(0) invert(1) — opaque pixels become white. */
export async function getWhiteLogoDataUrl(): Promise<string> {
  const input = await readFile(LOGO_PATH);
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 0) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }

  const whiteLogo = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();

  return `data:image/png;base64,${whiteLogo.toString("base64")}`;
}

export const iconBackground = "#0b0a08";
