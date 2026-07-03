export type DayKey = "friday" | "saturday" | "sunday" | "unknown";
export type PhotoStatus = "complete" | "partial" | "coming_soon";

export type DancePiece = {
  id: string;
  title: string;
  company: string;
  event: string;
  performance_date: string;
  day: DayKey;
  venue: string;
  choreographer: string[];
  dancers: string[];
  music: string[];
  costumes: string[];
  program_note: string;
  folder_name: string;
  photo_status: PhotoStatus;
  photos: string[];
};

export type IndexedPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataUrl: string;
};

export type PhotoIndexEntry = {
  pieceId: string;
  title: string;
  folderName: string;
  photos: IndexedPhoto[];
};

export type PhotoIndex = {
  generatedAt: string;
  pieces: PhotoIndexEntry[];
};

export type ArtistInfoEntry = {
  headline: string;
  summary: string;
};

export type ArtistInfo = Record<string, ArtistInfoEntry>;

export type UnmatchedData = {
  generatedAt: string;
  unmatchedFolders: string[];
  unmatchedProgramPieces: string[];
  warnings: string[];
};
