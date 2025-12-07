import { db } from "@/libs/database/db";
import { games } from "@/libs/database/schema";
import HowLongToBeat from "@/libs/media/HowLongToBeat";
import { mapHLTBToDB } from "@/utils/games";
import { eq } from "drizzle-orm";

export const getAllGames = async () => {
  const data = await db.select().from(games);

  return data;
};

export const getGamesByStatus = async (status: string) => {
  const data = await db.select().from(games).where(eq(games.status, status));

  return data;
};

export const syncGamesFromHLTB = async () => {
  const hltb = new HowLongToBeat();

  const hltbResponses = await Promise.all(
    hltb.lists.map(async (listType) => ({
      listType,
      result: await hltb.getGameList(listType),
    }))
  );

  const gameList = hltbResponses
    .flatMap((entry) =>
      entry.result?.data.gamesList.map((game) => ({
        game,
        status: entry.listType,
      }))
    )
    .filter((g) => g !== undefined)
    .map(({ game, status }) => mapHLTBToDB(game, status));

  await db.insert(games).values(gameList).onConflictDoNothing();

  return gameList.length;
};
