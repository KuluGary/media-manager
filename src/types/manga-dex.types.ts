//
// Shared types
//

export interface MDRelationship {
  id: string;
  type:
    | "manga"
    | "chapter"
    | "cover_art"
    | "artist"
    | "author"
    | "scanlation_group"
    | "tag"
    | string;
  attributes?: any;
}

export interface MDTitles {
  [lang: string]: string;
}

export interface MDTag {
  id: string;
  type: "tag";
  attributes: {
    name: { [lang: string]: string };
    group: "genre" | "theme" | string;
    version: number;
  };
  relationships: MDRelationship[];
}

//
// 1. Auth Response
//

export interface MangaDexAuthResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  not_before_policy: number;
  session_state: string;
  scope: string;
}

//
// 2. Manga Object (partial – exactly what your script reads)
//

export interface MangaDexManga {
  id: string;
  type: "manga";
  attributes: {
    title: MDTitles;
    tags: MDTag[];
    contentRating: "safe" | "suggestive" | "erotica" | "pornographic";
    latestUploadedChapter: string | null;
    updatedAt: string;
    links?: {
      raw?: string;
      [key: string]: string | undefined;
    };
  };
  relationships: MDRelationship[];
}

//
// 3. Manga List Response
//

export interface MangaDexMangaList {
  result: "ok";
  response: "collection";
  data: MangaDexManga[];
  limit: number;
  offset: number;
  total: number;
}

//
// 4. User Followed Manga (/user/follows/manga)
//

export interface MangaDexUserFollowMangaList {
  result: "ok";
  response: "collection";
  data: MangaDexManga[];
  limit: number;
  offset: number;
  total: number;
}

//
// 5. /manga/status
//

export interface MangaDexStatuses {
  result: "ok";
  statuses: Record<string, "reading" | "completed" | "on_hold" | "dropped" | "plan_to_read">;
}

//
// 6. Chapter
//

export interface MangaDexChapter {
  id: string;
  type: "chapter";
  attributes: {
    title: string | null;
    volume: string | null;
    chapter: string | null;
    publishAt: string;
    readableAt: string;
    createdAt: string;
    updatedAt: string;
    version: number;
  };
  relationships: MDRelationship[];
}

export interface MangaDexMangaChapter {
  result: "ok";
  response: "entity";
  data: MangaDexChapter;
}

//
// 7. Manga List (/list/{id})
//

export interface MangaDexList {
  result: "ok";
  response: "entity";
  data: {
    id: string;
    type: "list";
    attributes: {
      name: string;
      visibility: "public" | "private";
      version: number;
    };
    relationships: MDRelationship[];
  };
}

//
// 8. Final formatted manga returned from formatManga()
//

export interface FormattedManga {
  mangaId: string;
  title: string;
  genres: string[];
  author: string;
  rating: string;
  link?: string;
  updatedAt: string;
}

export interface MangaWithStatus extends FormattedManga {
  status: string; // reading, completed, favourite, etc.
}
