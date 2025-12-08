export interface HTLBGameList {
  data: Data;
}

export interface Data {
  count: number;
  gamesList: GamesList[];
  total: number;
  cookies: Cookies;
  platformList: PlatformList[];
  summaryData: SummaryData;
}

export interface Cookies {
  playing: string;
  backlog: string;
  replays: string;
  custom: string;
  custom2: string;
  custom3: string;
  completed: string;
  retired: string;
}

export interface GamesList {
  id: number;
  custom_title: string; // -> title as show in the game list.
  platform: string; // -> platform as shown in the game list.
  play_storefront: string;
  list_playing: number;
  list_backlog: number;
  list_replay: number;
  list_custom: number;
  list_custom2: number;
  list_custom3: number;
  list_comp: number;
  list_retired: number;
  comp_main: number;
  comp_plus: number;
  comp_100: number;
  comp_speed: number;
  comp_speed100: number;
  comp_main_notes: null | string;
  comp_plus_notes: null | string;
  comp_100_notes: null | string;
  comp_speed_notes: null | string;
  comp_speed100_notes: null | string;
  invested_pro: number; // -> playtime as shown in the game list.
  invested_sp: number;
  invested_spd: number;
  invested_co: number;
  invested_mp: number;
  play_count: number;
  play_dlc: number;
  review_score: number; // -> user score as shown in the game list.
  review_notes: null | string;
  retired_notes: null | string;
  date_start: string;
  date_complete: string;
  date_updated: Date;
  date_added: Date;
  play_video: null | string;
  play_notes: null | string;
  game_id: number; // -> you can create a link with https://howlongtobeat.com/game/:game_id
  game_image: string;
  game_type: string;
  release_world: Date;
  comp_all: number;
  comp_all_g: number;
  review_score_g: number;
}

export interface PlatformList {
  platform: string;
  count_total: number;
}

export interface SummaryData {
  playCount: number;
  dlcCount: number;
  reviewTotal: number;
  reviewCount: number;
  totalPlayedSp: number;
  totalPlayedMp: number;
  toBeatListed: number;
  uniqueGameCount: number;
}
