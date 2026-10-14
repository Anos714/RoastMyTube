import { NeedReloginError, QuotaExceededError, EmptyProfileError } from "./errors";

const YT = "https://www.googleapis.com/youtube/v3";

export interface ObscureLike {
  title: string;
  views: number;
}

export interface YouTubeProfile {
  channelTitle: string;
  subs: number;
  totalViews: number;
  videoCount: number;
  subscriptions: string[];
  likedTitles: string[];
  likedCategories: string[];
  playlists: string[];
  /** Liked videos with suspiciously low view counts — prime roast ammo. */
  obscureLikes: ObscureLike[];
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
 * 5 quota units per roast (1 per endpoint — NEVER search.list at 100 units).
 * maxResults 50 costs the same 1 unit as 25, so we take the full buffet.
 * 10k daily project quota ≈ 2,000 roasts/day.
 */
export async function getYouTubeProfile(accessToken: string): Promise<YouTubeProfile> {
  const [channels, subsAlpha, subsRel, liked, playlists] = await Promise.all([
    yt<ListRes>(`/channels?part=statistics,snippet&mine=true`, accessToken),
    yt<ListRes>(`/subscriptions?part=snippet&mine=true&maxResults=50&order=alphabetical`, accessToken),
    yt<ListRes>(`/subscriptions?part=snippet&mine=true&maxResults=50&order=relevance`, accessToken),
    yt<ListRes>(`/videos?part=snippet,statistics&myRating=like&maxResults=50`, accessToken),
    yt<ListRes>(`/playlists?part=snippet&mine=true&maxResults=25`, accessToken),
  ]);

  const ch = channels.items?.[0];
  const subscriptions = [
    ...new Set(
      [...(subsAlpha.items ?? []), ...(subsRel.items ?? [])]
        .map((s) => s.snippet?.title ?? "Unknown")
        .filter(Boolean)
    ),
  ];
  const likedTitles = (liked.items ?? []).map((v) => v.snippet?.title ?? "Unknown").filter(Boolean);
  const likedCategories = [...new Set((liked.items ?? []).map((v) => v.snippet?.categoryId).filter((c): c is string => !!c))];
  const playlistNames = (playlists.items ?? []).map((p) => p.snippet?.title ?? "Unknown").filter(Boolean);
  const obscureLikes = (liked.items ?? [])
    .map((v) => ({
      title: v.snippet?.title ?? "Unknown",
      views: Number(v.statistics?.viewCount ?? 0),
    }))
    .filter((v) => v.views > 0)
    .sort((a, b) => a.views - b.views)
    .slice(0, 10);

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
    obscureLikes,
  };
}
