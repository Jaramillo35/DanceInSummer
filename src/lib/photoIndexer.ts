import fs from "node:fs/promises";
import path from "node:path";
import { buildOptimizedImage, buildPieceZip, ensureDir } from "@/lib/imageUtils";
import { guessBestPieceMatch, normalizeTitle } from "@/lib/fuzzyMatch";
import type { DancePiece, PhotoIndex, UnmatchedData } from "@/lib/types";

const IMAGE_EXT = /\.(jpe?g|png|webp|tiff?)$/i;
const EXCLUDED_FOLDERS = new Set([
  "dance_collage",
  "site",
  ".git",
  "node_modules",
  ".ds_store",
  "artistinfo",
  "dance-zip-upload",
]);
const EXCLUDED_PIECE_IDS = new Set(["artistinfo", "dancezipupload"]);

type IndexOptions = {
  rootDir: string;
  appDir: string;
  manualMap: Record<string, string>;
};

function isDanceFolder(name: string): boolean {
  const lower = name.toLowerCase();
  return !EXCLUDED_FOLDERS.has(lower) && !lower.includes("program");
}

function dayStatus(day: DancePiece["day"], hasPhotos: boolean): DancePiece["photo_status"] {
  if (!hasPhotos) {
    return "coming_soon";
  }
  if (day === "unknown") {
    return "partial";
  }
  return "complete";
}

function folderToTitle(folder: string): string {
  return folder
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
}

export async function indexPhotos(
  program: DancePiece[],
  options: IndexOptions,
): Promise<{ program: DancePiece[]; photoIndex: PhotoIndex; unmatched: UnmatchedData }> {
  const sanitizedProgram = program.filter((piece) => !EXCLUDED_PIECE_IDS.has(piece.id));
  program.length = 0;
  program.push(...sanitizedProgram);

  const entries = await fs.readdir(options.rootDir, { withFileTypes: true });
  const danceFolders = entries
    .filter((entry) => entry.isDirectory() && isDanceFolder(entry.name))
    .map((entry) => entry.name);

  const pieceLookup = program.map((piece) => ({ id: piece.id, title: piece.title }));
  const unmatchedFolders: string[] = [];
  const matchedPieceIds = new Set<string>();
  const photoIndexPieces: PhotoIndex["pieces"] = [];
  const outputRoot = path.join(options.appDir, "public", "photos");
  const downloadsRoot = path.join(options.appDir, "public", "downloads");
  await ensureDir(outputRoot);
  await ensureDir(downloadsRoot);

  for (const folderName of danceFolders) {
    const manualTitle = options.manualMap[folderName];
    const matchId =
      (manualTitle &&
        pieceLookup.find((piece) => normalizeTitle(piece.title) === normalizeTitle(manualTitle))
          ?.id) ??
      guessBestPieceMatch(folderName, pieceLookup);

    let piece = matchId ? program.find((entry) => entry.id === matchId) : undefined;
    if (!piece) {
      unmatchedFolders.push(folderName);
      const syntheticId = normalizeTitle(folderName);
      piece = program.find((entry) => entry.id === syntheticId);
      if (!piece) {
        piece = {
          id: syntheticId,
          title: folderToTitle(folderName),
          company: "needs review",
          event: "Terpsichore Collective Showcase",
          performance_date: "Friday professional Showcase",
          day: "friday",
          venue: "Riverside Arts Center Theatre",
          choreographer: ["needs review"],
          dancers: ["needs review"],
          music: ["needs review"],
          costumes: ["needs review"],
          program_note: "needs review",
          folder_name: "",
          photo_status: "coming_soon",
          photos: [],
        };
        program.push(piece);
        pieceLookup.push({ id: piece.id, title: piece.title });
      }
    }

    if (!piece) {
      unmatchedFolders.push(folderName);
      continue;
    }
    matchedPieceIds.add(piece.id);

    const folderPath = path.join(options.rootDir, folderName);
    const files = (await fs.readdir(folderPath))
      .filter((name) => IMAGE_EXT.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const pieceOutputDir = path.join(outputRoot, piece.id);
    await ensureDir(pieceOutputDir);
    const photos = [];

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const source = path.join(folderPath, file);
      const target = path.join(pieceOutputDir, `${String(i + 1).padStart(3, "0")}.jpg`);
      let optimized: Awaited<ReturnType<typeof buildOptimizedImage>>;
      try {
        await fs.access(target);
        const meta = await import("sharp").then((s) => s.default(target).metadata());
        const blurBuffer = await import("sharp").then((s) =>
          s.default(target).resize({ width: 20, withoutEnlargement: true }).jpeg({ quality: 50 }).toBuffer()
        );
        const relativePath = target.split("/public")[1] ?? target;
        optimized = {
          src: relativePath.replace(/\\/g, "/"),
          width: meta.width ?? 0,
          height: meta.height ?? 0,
          blurDataUrl: `data:image/jpeg;base64,${blurBuffer.toString("base64")}`,
        };
      } catch {
        optimized = await buildOptimizedImage(source, target);
      }
      photos.push({
        ...optimized,
        alt: `${piece.title} by ${piece.company || "dance ensemble"} - frame ${i + 1}`,
      });
    }

    piece.folder_name = folderName;
    piece.photos = photos.map((photo) => photo.src);
    piece.photo_status = dayStatus(piece.day, photos.length > 0);

    if (files.length > 0) {
      const sourcePaths = files.map((f) => path.join(folderPath, f));
      const zipPath = path.join(downloadsRoot, `${piece.id}.zip`);
      let needsZip = true;
      try {
        const zipStat = await fs.stat(zipPath);
        const newestSource = await Promise.all(sourcePaths.map((p) => fs.stat(p))).then(
          (stats) => Math.max(...stats.map((s) => s.mtimeMs))
        );
        needsZip = newestSource > zipStat.mtimeMs;
      } catch { /* zip doesn't exist yet */ }
      if (needsZip) {
        await buildPieceZip(sourcePaths, zipPath, folderName);
      }
    }

    photoIndexPieces.push({
      pieceId: piece.id,
      title: piece.title,
      folderName,
      photos,
    });
  }

  for (const piece of program) {
    if (!matchedPieceIds.has(piece.id)) {
      piece.photo_status = "coming_soon";
    }
  }

  const unmatchedProgramPieces = program
    .filter((piece) => !matchedPieceIds.has(piece.id))
    .map((piece) => piece.title);
  const warnings = [
    ...unmatchedFolders.map((name) => `No program match found for folder "${name}"`),
    ...unmatchedProgramPieces.map((title) => `No photo folder found for piece "${title}"`),
  ];

  return {
    program,
    photoIndex: {
      generatedAt: new Date().toISOString(),
      pieces: photoIndexPieces,
    },
    unmatched: {
      generatedAt: new Date().toISOString(),
      unmatchedFolders,
      unmatchedProgramPieces,
      warnings,
    },
  };
}
