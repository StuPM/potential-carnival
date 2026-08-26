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
  type: "manga" | "film";
  title: string;
  director: string; // TODO
};

export type filterTag = "All" | "film" | "book";

export type apiStats = {
  firstCreated: number;
  lastCreated: string;
  totalEntries: number;
  prefix: string;
  daysAgo: number;
  suffix: string;
};
