-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "games" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createDateTime" timestamp with time zone DEFAULT now() NOT NULL,
	"updateDateTime" timestamp DEFAULT now(),
	"gameId" numeric NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"genres" text[],
	"platform" text,
	"link" text,
	"updatedAt" timestamp,
	"addedAt" timestamp,
	"startedAt" timestamp,
	"completedAt" timestamp,
	"rating" numeric,
	"developer" text,
	"publisher" text,
	"status" text NOT NULL,
	"playtime" numeric,
	CONSTRAINT "games_gameId_key" UNIQUE("gameId")
);
--> statement-breakpoint
ALTER TABLE "games" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "manga" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"mangaId" text NOT NULL,
	"genres" text[] NOT NULL,
	"author" text,
	"rating" text,
	"link" text,
	"updatedAt" timestamp,
	"id" uuid DEFAULT gen_random_uuid(),
	"status" text NOT NULL,
	CONSTRAINT "manga_mangaId_key" UNIQUE("mangaId")
);
--> statement-breakpoint
ALTER TABLE "manga" ENABLE ROW LEVEL SECURITY;
*/