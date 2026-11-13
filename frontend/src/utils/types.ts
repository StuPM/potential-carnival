export type mediaRecord = {
  created: string;
  finished: string;
  id: string;
  location: "cinema" | "home";
  media: innerMediaRecord;
  mediaId: string;
  rating: number;
  review: string;
};

type innerMediaRecord = {
  type: MediaType;
  title: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  genres: string[];
  // director: string; // TODO
};

type MediaType = "film" | "manga" | "book";

export type filterTag = "All" | "film" | "book";

export type apiStats = {
  firstCreated: number;
  lastCreated: string;
  totalEntries: number;
  prefix: string;
  daysAgo: number;
  suffix: string;
};
