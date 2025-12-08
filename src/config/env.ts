import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// eslint-disable-next-line no-console
console.log("🔐 Loading environment variables...");

const serverSchema = z.object({
  // Node
  NODE_ENV: z.string(),
  // Database
  DATABASE_URL: z.string().min(1),

  // Supabase
  SUPABASE_URL: z.string().min(1),
  SUPABASE_SERVICE_ROLE: z.string().min(1),
  SENTRY_DSN: z.string().optional(),

  // HLTB
  HLTB_USER: z.string().min(1),
  HLTB_USER_ID: z.string().min(1),

  // MANGADEX
  MANGADEX_FOLLOWS_LIST_ID: z.string().min(1),
  MANGADEX_USERNAME: z.string().min(1),
  MANGADEX_PASSWORD: z.string().min(1),
  MANGADEX_CLIENT_ID: z.string().min(1),
  MANGADEX_CLIENT_SECRET: z.string().min(1),

  // YOUTUBE
  YOUTUBE_PLAYLIST_ID: z.string().min(1),
  YOUTUBE_API_KEY: z.string().min(1),
});

// eslint-disable-next-line node/no-process-env
const _serverEnv = serverSchema.safeParse(process.env);

if (!_serverEnv.success) {
  console.error("❌ Invalid environment variables:\n");
  _serverEnv.error.issues.forEach((issue) => {
    console.error(issue);
  });
  throw new Error("Invalid environment variables");
}

const {
  NODE_ENV,
  DATABASE_URL,
  SUPABASE_SERVICE_ROLE,
  SUPABASE_URL,
  SENTRY_DSN,
  HLTB_USER,
  HLTB_USER_ID,
  MANGADEX_CLIENT_ID,
  MANGADEX_CLIENT_SECRET,
  MANGADEX_FOLLOWS_LIST_ID,
  MANGADEX_PASSWORD,
  MANGADEX_USERNAME,
  YOUTUBE_PLAYLIST_ID,
  YOUTUBE_API_KEY,
} = _serverEnv.data;

export const env = {
  NODE_ENV,
  DATABASE_URL,
  SUPABASE_SERVICE_ROLE,
  SUPABASE_URL,
  SENTRY_DSN,
  HLTB_USER,
  HLTB_USER_ID,
  MANGADEX_CLIENT_ID,
  MANGADEX_CLIENT_SECRET,
  MANGADEX_FOLLOWS_LIST_ID,
  MANGADEX_PASSWORD,
  MANGADEX_USERNAME,
  YOUTUBE_PLAYLIST_ID,
  YOUTUBE_API_KEY,
};
// eslint-disable-next-line no-console
console.log("✅ Environment variables loaded");
