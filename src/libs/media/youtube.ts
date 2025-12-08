import type { YoutubePlaylistItem, YoutubePlaylistItemResponse, YoutubeVideosResponse } from "@/types/youtube.types";

import { env } from "@/config/env";

export default class YouTube {
  playlistId: string;
  youtubePlaylistURL: string = "https://www.googleapis.com/youtube/v3/playlistItems";

  constructor() {
    this.playlistId = env.YOUTUBE_PLAYLIST_ID;
  }

  async getVideos() {
    const videos = [];
    try {
      videos.push(...await this.fetchPlaylist(this.playlistId));
    }
    catch (error) {
      console.error(error);
    }

    return videos;
  }

  private async fetchPlaylist(playlistId: string) {
    const videos = [];

    const url = new URL(this.youtubePlaylistURL);
    url.searchParams.append("part", "snippet");
    url.searchParams.append("part", "contentDetails");
    url.searchParams.append("maxResults", "50");
    url.searchParams.append("playlistId", playlistId);
    url.searchParams.append("key", env.YOUTUBE_API_KEY);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as YoutubePlaylistItemResponse;

    const items = data.items || [];
    const videoDetails = await this.fetchAllVideoDetails(items);

    try {
      for (const video of items) {
        const videoDetail = videoDetails.find(detail => detail.id === video.contentDetails.videoId);

        videos.push({
          videoId: video.contentDetails.videoId,
          title: video.snippet.title,
          description: video.snippet.description,
          link: `https://youtube.com/watch?v=${video.contentDetails.videoId}`,
          createdAt: video.contentDetails.videoPublishedAt,
          updatedAt: video.snippet.publishedAt,
          author: video.snippet.videoOwnerChannelTitle,
          channel: `https://youtube.com/channel/${video.snippet.videoOwnerChannelId}`,
          rating: videoDetail?.rate,
          views: videoDetail?.views,
          duration: videoDetail?.duration,
          tags: videoDetail?.tags,
        });
      }
    }
    catch (error) {
      console.error(error);
    }

    return videos;
  }

  private async fetchAllVideoDetails(videos: YoutubePlaylistItem[]) {
    const videoIds = videos.map(video => video.contentDetails.videoId).join(",");

    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.append("part", "contentDetails");
    url.searchParams.append("part", "snippet");
    url.searchParams.append("part", "statistics");
    url.searchParams.append("id", videoIds);
    url.searchParams.append("key", env.YOUTUBE_API_KEY);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as YoutubeVideosResponse;

    return data.items.map(item => ({
      id: item?.id,
      rate: item?.statistics?.likeCount,
      views: item?.statistics?.viewCount,
      duration: item?.contentDetails?.duration,
      tags: item?.snippet?.tags,
    }));
  }
}
