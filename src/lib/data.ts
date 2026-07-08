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
const zipDownloadUrls: Record<string, string> = {
  control: "https://drive.google.com/file/d/1eqRAyh5TNK0S12uKkyMlN0ok6G5PQhkG/view?usp=drive_link",
  coverofme: "https://drive.google.com/file/d/1tbtIwANU9DHp26C4cOwU-Btuf4vuxWPk/view?usp=drive_link",
  disparateinseparable: "https://drive.google.com/file/d/13UX6CgdEqB5Fl0OwseMIilISDRkRbJfI/view?usp=drive_link",
  espinita: "https://drive.google.com/file/d/1gELIfiM9mYoIyioQJ1VlswWNFQJO6OT-/view?usp=drive_link",
  fallintome: "https://drive.google.com/file/d/1l_-zMB4pbV-7I7NQXvTzsg-RxCwn92zY/view?usp=drive_link",
  femaletrouble: "https://drive.google.com/file/d/1DWd7h_zAM3vlX9rIjr7nY0oRMbReiv9g/view?usp=drive_link",
  heighho: "https://drive.google.com/file/d/1Oz5OoReW39-57BOKmsm6yHyeTmkMfS73/view?usp=drive_link",
  hermysteriesandmemories: "https://drive.google.com/file/d/1Lgi5wUNUTRaFFbDXuVC4hKfw63HySP5N/view?usp=drive_link",
  infinitelove: "https://drive.google.com/file/d/1Y1EicrjmhAf1Unm9IYt9KtkkxnYQBVuf/view?usp=drive_link",
  inthewaves: "https://drive.google.com/file/d/1_f0Ole9SV_0rlTfdhvJ_iP0qx7PSAR6r/view?usp=drive_link",
  lamentation: "https://drive.google.com/file/d/1eOdRXF0KineTYk1dTKwEhc1X6YMyBtXX/view?usp=drive_link",
  loveinportofino: "https://drive.google.com/file/d/1mmN6onehx6fXCM2shp_4yd_DZceCV4xM/view?usp=drive_link",
  nobody01100011: "https://drive.google.com/file/d/1ckYKtEcQerlTvOXyUWGJhut7ZbtlCXII/view?usp=drive_link",
  plumb: "https://drive.google.com/file/d/1d89NkouzAeq1tLtzk956llKqiMfi3pv5/view?usp=drive_link",
  rage: "https://drive.google.com/file/d/11ALgzyKzXkWvwTjBgfWZ8XFBGW4wICUT/view?usp=drive_link",
  reflectionsofher: "https://drive.google.com/file/d/15qH4GI4OWVjq6ijQkPDkKggeKKMkoqbZ/view?usp=drive_link",
  skeptic: "https://drive.google.com/file/d/1byBnUltNy9mFDp4rdqRBq5ZpcOHLHqU5/view?usp=drive_link",
  songbird: "https://drive.google.com/file/d/143t1xiFJQfR0AXF0Ll6tmV_HlcARpmms/view?usp=drive_link",
  studiesinschmaltz: "https://drive.google.com/file/d/1B095Om7mp_XuxgcrMA2BS6vvd3m1lG67/view?usp=drive_link",
  tabletalk: "https://drive.google.com/file/d/1ARiXzdRTQL03W_Ja14n6k-H-buyfNVO9/view?usp=drive_link",
  thevisitors: "https://drive.google.com/file/d/1YdSqcXcsJljuuPr1uND7-WypnjlQJ8ce/view?usp=drive_link",
  trashed: "https://drive.google.com/file/d/1Gi84Z3CynYPP5VFk2-lTP1hW7U2RXQzt/view?usp=drive_link",
  typewriterlesson: "https://drive.google.com/file/d/1ab9mvORQ4WAYJrnCsY7Pt-PuSj4jBUpX/view?usp=drive_link",
};

export function getProgram(): DancePiece[] {
  return program;
}

export function getParticipatingCompanies(): string[] {
  return [...new Set(program.map((piece) => piece.company).filter((company) => hasRealContent(company)))]
    .sort((a, b) => a.localeCompare(b));
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

export function getZipDownloadUrl(pieceId: string): string | undefined {
  return zipDownloadUrls[pieceId];
}

export function hasRealContent(value?: string): boolean {
  return Boolean(value && value.trim() && value.trim().toLowerCase() !== REVIEW);
}

export function filterRealValues(values: string[]): string[] {
  return values.filter((value) => hasRealContent(value));
}
