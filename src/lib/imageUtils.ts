import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import JSZip from "jszip";

type ImageAsset = {
  src: string;
  width: number;
  height: number;
  blurDataUrl: string;
};

export async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

export async function buildOptimizedImage(
  sourcePath: string,
  targetPath: string,
): Promise<ImageAsset> {
  const image = sharp(sourcePath).rotate();
  const metadata = await image.metadata();
  const width = metadata.width ?? 1800;
  const height = metadata.height ?? 1200;
  const maxWidth = Math.min(width, 2200);
  const maxHeight = Math.round((height / width) * maxWidth);

  await ensureDir(path.dirname(targetPath));
  await image
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(targetPath);

  const blurBuffer = await sharp(sourcePath)
    .rotate()
    .resize({ width: 20, withoutEnlargement: true })
    .jpeg({ quality: 50 })
    .toBuffer();

  const relativePath = targetPath.split("/public")[1] ?? targetPath;
  return {
    src: relativePath.replace(/\\/g, "/"),
    width: maxWidth,
    height: maxHeight,
    blurDataUrl: `data:image/jpeg;base64,${blurBuffer.toString("base64")}`,
  };
}

export async function buildPieceZip(
  sourceFiles: string[],
  zipPath: string,
  folderName: string,
): Promise<void> {
  await ensureDir(path.dirname(zipPath));
  const zip = new JSZip();
  const folder = zip.folder(folderName);
  if (!folder) throw new Error(`Failed to create ZIP folder: ${folderName}`);
  for (const file of sourceFiles) {
    const data = await fs.readFile(file);
    folder.file(path.basename(file), data);
  }
  const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 6 } });
  await fs.writeFile(zipPath, buffer);
}
