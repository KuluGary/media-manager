import { env } from "@/config/env";

import type { HTLBGameList } from "../../types/how-long-to-beat.types";

type ListType = "playing" | "backlog" | "custom" | "custom2" | "completed" | "retired";

export default class HowLongToBeat {
  endpoints = {
    gamesList: `https://howlongtobeat.com/api/user/:userId/games/list`,
  };

  lists: ListType[] = ["playing", "backlog", "custom", "custom2", "completed", "retired"];

  constructor() { }

  async getGameList(list: ListType): Promise<HTLBGameList | undefined> {
    try {
      const endpoint = this.endpoints.gamesList.replace(":userId", env.HLTB_USER_ID);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Host": "howlongtobeat.com",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0",
          "Accept": "*/*",
          "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Referer": `https://howlongtobeat.com/user/${env.HLTB_USER}/games/${list}/1`,
          "Content-Type": "application/json",
          "Origin": "https://howlongtobeat.com",
          "Sec-GPC": "1",
          "Alt-Used": "howlongtobeat.com",
          "Connection": "keep-alive",
          "Cookie":
            "OptanonConsent=isGpcEnabled=0&datestamp=Sat+Dec+06+2025+21%3A35%3A01+GMT%2B0100+(hora+est%C3%A1ndar+de+Europa+central)&version=202509.1.0&genVendors=&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A1%2CV2STACK42%3A1&landingPath=NotLandingPage; zdconsent=optin; OptanonAlertBoxClosed=2025-12-06T20:34:23.826Z; eupubconsent-v2=CQcAedgQcAedgAcABBENCIFsAP_gAEPgACiQLaNR_G__bWlr-bb3aftkeYxP9_hr7sQxBgbJk24FzLvW7JwWx2E5NAzatqIKmRIAu3TBIQNlHJDURVCgKIgFryDMaEyUoTNKJ6BkiFMRI2JYCFxvm4pjWQCY5vr99lc1mB-N7dr82dzyy4hHn3a5_2S1WJCdIYetDfn8ZBKT-9IEd_x8v4v4_F7pE2-eS1n_pGvp4j9-YnM_dBmxt-bSffzPn__rl_e7X_vd_n37v94XH77v____f8FsAATDQqIIyyIEAgUDCCBAAoKwgAoEAQAAJA0QEAJgwKcgYALrCZACAFAAMEAIAAQYAAgAAEgAQiACgAgEAIEAgUAAYAEAQEADAwABgAsRAIAAQHQMUwIIBAsAEjMqg0wJQAEggJbKhBIAgQVwhCLPAIIERMFAAACAAUAAAA8FgISSAlYkEAXEE0AABAAAFECBAikLMAQVBmi0FYEnEZGmAYPmCZJToMgCYIyMk2ITfhMPFIUQoIcgAAAA.f_wACHwAAAAA",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "Priority": "u=4",
          "Pragma": "no-cache",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          user_id: Number(env.HLTB_USER_ID),
          toggleType: "Single List",
          lists: [list],
          set_playstyle: "comp_all",
          name: "",
          platform: "",
          storefront: "",
          sortBy: "",
          sortFlip: 0,
          view: "",
          random: 0,
          limit: 500,
          currentUserHome: false,
        }),
      });

      const json = (await response.json()) as HTLBGameList;

      return json;
    }
    catch (error) {
      console.error(error);
    }
  }

  getGameDescription() {
    this.parseGameDescriptionFromHTML();
  }

  getGameGenres() {
    this.parseGameGenresFromHTML();
  }

  private parseGameDescriptionFromHTML(): string {
    return "";
  }

  private parseGameGenresFromHTML(): string[] {
    return [];
  }
}
