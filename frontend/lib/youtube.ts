import { NeedReloginError, QuotaExceededError, EmptyProfileError } from "./errors";

const YT = "https://www.googleapis.com/youtube/v3";

export interface YouTubeProfile {
  channelTitle: string;
  subs: number;
  totalViews: number;
  videoCount: number;
  subscriptions: string[];
  likedTitles: string[];
  likedCategories: string[];
  playlists: string[];
}

async function yt<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${YT}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) throw new NeedReloginError();
  if (res.status === 403) {
    const body = (await res.json().catch(() => ({}))) as {
      error?: { errors?: { reason?: string }[] };
    };
    const reasons = body.error?.errors?.map((e) => e.reason) ?? [];
    if (reasons.includes("quotaExceeded") || reasons.includes("dailyLimitExceeded")) {
      throw new QuotaExceededError();
    }
    throw new NeedReloginError();
  }
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  return (await res.json()) as T;
}

interface ListRes {
  items?: { snippet?: { title?: string; channelTitle?: string; categoryId?: string }; statistics?: { subscriberCount?: string; viewCount?: string; videoCount?: string } }[];
}

/**
 * 4 quota units per call (1 per endpoint — NEVER search.list at 100 units).
 * 10k daily project quota ≈ 2,500 roasts/day.
 */
export async function getYouTubeProfile(accessToken: string): Promise<YouTubeProfile> {
  const [channels, subs, liked, playlists] = await Promise.all([
    yt<ListRes>(`/channels?part=statistics,snippet&mine=true`, accessToken),
    yt<ListRes>(`/subscriptions?part=snippet&mine=true&maxResults=25&order=alphabetical`, accessToken),
    yt<ListRes>(`/videos?part=snippet,statistics&myRating=like&maxResults=25`, accessToken),
    yt<ListRes>(`/playlists?part=snippet&mine=true&maxResults=10`, accessToken),
  ]);

  const ch = channels.items?.[0];
  const subscriptions = (subs.items ?? []).map((s) => s.snippet?.title ?? "Unknown").filter(Boolean);
  const likedTitles = (liked.items ?? []).map((v) => v.snippet?.title ?? "Unknown").filter(Boolean);
  const likedCategories = [...new Set((liked.items ?? []).map((v) => v.snippet?.categoryId).filter((c): c is string => !!c))];
  const playlistNames = (playlists.items ?? []).map((p) => p.snippet?.title ?? "Unknown").filter(Boolean);

  if (!ch && subscriptions.length === 0 && likedTitles.length === 0) {
    throw new EmptyProfileError();
  }

  return {
    channelTitle: ch?.snippet?.title ?? "Unknown",
    subs: Number(ch?.statistics?.subscriberCount ?? 0),
    totalViews: Number(ch?.statistics?.viewCount ?? 0),
    videoCount: Number(ch?.statistics?.videoCount ?? 0),
    subscriptions,
    likedTitles,
    likedCategories,
    playlists: playlistNames,
  };
}
