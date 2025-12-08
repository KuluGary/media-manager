import { v4 as uuidv4 } from "uuid";

import type { GamesList } from "@/types/how-long-to-beat.types";

export function mapHLTBToDB(g: GamesList, status: string) {
  return {
    id: uuidv4(),
    gameId: String(g.game_id),
    title: g.custom_title,
    description: null,
    genres: null,
    platform: g.platform,
    link: null,
    developer: null,
    publisher: null,
    status,
    playtime: String(g.invested_pro),
    rating: String(g.review_score),
    createDateTime: new Date().toISOString(),
    updateDateTime: new Date().toISOString(),
    updatedAt: parseHLTBDate(g.date_updated),
    addedAt: parseHLTBDate(g.date_added),
    startedAt: parseHLTBDate(g.date_start),
    completedAt: parseHLTBDate(g.date_complete),
  };
}

function parseHLTBDate(date?: Date | string) {
  if (!date)
    return null;

  if (typeof date === "string") {
    if (date === "0000-00-00")
      return null;

    return date;
  }
  else {
    return date.toISOString();
  }
}
