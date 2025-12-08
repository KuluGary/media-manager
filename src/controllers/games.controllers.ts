import { eq } from "drizzle-orm";

import { db } from "@/libs/database/db";
import { games } from "@/libs/database/schema";
import HowLongToBeat from "@/libs/media/how-long-to-beat";
import { mapHLTBToDB } from "@/utils/games";

export async function getAllGames() {
  const data = await db.select().from(games);

  return data;
}

export async function getGamesByStatus(status: string) {
  const data = await db.select().from(games).where(eq(games.status, status));

  return data;
}

export async function syncGamesFromHLTB() {
  const hltb = new HowLongToBeat();

  const hltbResponses = await Promise.all(
    hltb.lists.map(async listType => ({
      listType,
      result: await hltb.getGameList(listType),
    })),
  );

  const gameList = hltbResponses
    .flatMap(entry =>
      entry.result?.data.gamesList.map(game => ({
        game,
        status: entry.listType,
      })),
    )
    .filter(g => g !== undefined)
    .map(({ game, status }) => mapHLTBToDB(game, status));

  await db.insert(games).values(gameList).onConflictDoNothing();

  return gameList.length;
}
