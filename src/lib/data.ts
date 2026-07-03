import programData from "@/data/program.json";
import photoIndexData from "@/data/photoIndex.json";
import artistInfoData from "@/data/artistInfo.json";
import type {
  ArtistInfo,
  ArtistInfoEntry,
  DancePiece,
  DayKey,
  PhotoIndexEntry,
} from "@/lib/types";

const REVIEW = "needs review";

export const DAY_LABELS: Record<Exclude<DayKey, "unknown">, string> = {
  friday: "Friday · June 26",
  saturday: "Saturday · June 27",
  sunday: "Sunday · June 28",
};

const program = programData as DancePiece[];
const photoMap = new Map(
  (photoIndexData.pieces as PhotoIndexEntry[]).map((entry) => [entry.pieceId, entry]),
);
const artistInfoMap = artistInfoData as ArtistInfo;

export function getProgram(): DancePiece[] {
  return program;
}

export function getPiecesForDay(day: DayKey): DancePiece[] {
  return program.filter((piece) => piece.day === day);
}

export function getPieceBySlug(slug: string): DancePiece | undefined {
  return program.find((piece) => piece.id === slug);
}

export function getPiecePhotos(pieceId: string): PhotoIndexEntry["photos"] {
  const piece = program.find((entry) => entry.id === pieceId);
  if (!piece) {
    return [];
  }
  return photoMap.get(pieceId)?.photos ?? [];
}

export function getArtistInfo(pieceId: string): ArtistInfoEntry | undefined {
  return artistInfoMap[pieceId];
}

export function hasRealContent(value?: string): boolean {
  return Boolean(value && value.trim() && value.trim().toLowerCase() !== REVIEW);
}

export function filterRealValues(values: string[]): string[] {
  return values.filter((value) => hasRealContent(value));
}
