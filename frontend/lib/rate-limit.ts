const WINDOW_MS = 60_000;
const MAX_HITS = 10;

const hits = new Map<string, number[]>();

export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "local"
  );
}

/** Sliding-window throttle: 10 req/min per IP. Returns true if allowed. */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (window.length >= MAX_HITS) {
    hits.set(ip, window);
    return false;
  }
  window.push(now);
  hits.set(ip, window);
  return true;
}
