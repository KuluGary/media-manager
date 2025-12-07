import { Hono } from "hono";
import errorHandler from "@/middleware/error.middleware";
import authRoutes from "@/routes/auth.routes";
import gamesRoutes from "./routes/games.routes";
import mangaRoutes from "./routes/manga.routes";

const app = new Hono()
	.basePath("/api")
	.route("/auth", authRoutes)
	.route("/games", gamesRoutes)
	.route("/manga", mangaRoutes)
	.onError(errorHandler);

export type AppType = typeof app;

export default app;
