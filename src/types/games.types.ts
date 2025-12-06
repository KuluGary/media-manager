import type { Entity } from "./entity.types";

export type GameList = Game[];

export type Game = Entity<{
  title: string;
  description: string;
  genres: string[];
  platform: string;
  link: string;
  playtime: number;
  rate: number;
  author: { name: string };
  completedAt: string;
  startedAt: string;
  addedAt: string;
  updatedAt: string;
}>;
