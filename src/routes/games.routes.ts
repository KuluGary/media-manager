import { getAllGames, getGamesByStatus, syncGamesFromHLTB } from "@/controllers/games.controllers";
import { Hono } from "hono";

const gamesRoutes = new Hono()
  .get("/", async (c) => {
    const data = await getAllGames();

    return c.json(data);
  })
  .get("/list/:status", async (c) => {
    const status = c.req.param("status");
    const data = await getGamesByStatus(status);

    return c.json(data);
  })
  .post("/sync", async (c) => {
    const insertedGamesAmount = await syncGamesFromHLTB();

    return c.json({ inserted: insertedGamesAmount });
  });

export default gamesRoutes;
