import Fuse from "fuse.js";

const TITLE_STOPWORDS = /[^a-z0-9]+/g;

export function normalizeTitle(value: string): string {
  return value.toLowerCase().replace(TITLE_STOPWORDS, "");
}

export function guessBestPieceMatch(
  folderName: string,
  titles: { id: string; title: string }[],
): string | null {
  const normalizedFolder = normalizeTitle(folderName);

  const exact = titles.find(
    (piece) => piece.title.toLowerCase().trim() === folderName.toLowerCase().trim(),
  );
  if (exact) {
    return exact.id;
  }

  const normalized = titles.find(
    (piece) => normalizeTitle(piece.title) === normalizedFolder,
  );
  if (normalized) {
    return normalized.id;
  }

  const fuse = new Fuse(titles, {
    includeScore: true,
    threshold: 0.32,
    keys: ["title"],
  });
  const [result] = fuse.search(folderName);
  if (!result || typeof result.score !== "number" || result.score > 0.32) {
    return null;
  }
  return result.item.id;
}
