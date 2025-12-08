import games from "@/routes/games/games.index";
import manga from "@/routes/manga/manga.index";

import createApp from "./libs/hono/create-app";
import configureOpenApi from "./libs/open-api/configure-open-api";

const app = createApp();

const routes = [
  games,
  manga,
];

configureOpenApi(app);

app.basePath("/api");

configureOpenApi(app);

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof app;

export default app;
