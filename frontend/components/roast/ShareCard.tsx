"use client";

import type { CSSProperties } from "react";

export type ShareVariant = "post" | "square" | "story";

export interface ShareData {
  personalityTitle: string;
  brainRotScore: number;
  rank: string;
  roast: string;
  redFlags: string[];
}

export const SHARE_SIZES: Record<ShareVariant, { w: number; h: number; label: string }> = {
  post: { w: 1200, h: 675, label: "Post 1200×675" },
  square: { w: 1080, h: 1080, label: "Square 1080×1080" },
  story: { w: 1080, h: 1920, label: "Story 1080×1920" },
};

const DISPLAY = "'Space Grotesk Variable','Space Grotesk',Arial,sans-serif";
const MONO = "'JetBrains Mono Variable','JetBrains Mono',monospace";
const BODY = "'Inter Variable','Inter',Arial,sans-serif";

/** Inlined logo mark with explicit pixel size (no external CSS allowed here). */
function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <defs>
        <linearGradient id="share-mark-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF0033" />
          <stop offset="1" stopColor="#FF6A00" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="url(#share-mark-g)" />
      <path d="M12.5 10.2 21.8 15.8l-9.3 5.6z" fill="#fff" />
      <rect x="11.3" y="20.4" width="2.4" height="3.6" rx="1.2" fill="#fff" />
      <circle cx="12.5" cy="25.7" r="1.1" fill="#fff" />
    </svg>
  );
}

/**
 * Share card rendered with INLINE STYLES ONLY (hex/rgba, no Tailwind):
 * html-to-image snapshots computed styles, and Tailwind v4's color-mix/oklab
 * values break the export. Keep this component utility-class-free.
 */
export function ShareCard({ data, variant }: { data: ShareData; variant: ShareVariant }) {
  const { w, h } = SHARE_SIZES[variant];
  const story = variant === "story";
  const pad = story ? 72 : 52;
  const excerpt =
    data.roast.length > (story ? 320 : 200)
      ? data.roast.slice(0, story ? 320 : 200).trimEnd() + "…"
      : data.roast;

  const wrap: CSSProperties = {
    width: w,
    height: h,
    background: "#0A0A0A",
    color: "#FFFFFF",
    fontFamily: BODY,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
  };
  const frame: CSSProperties = {
    position: "absolute",
    inset: 18,
    border: "2px solid rgba(255,212,0,0.35)",
    borderRadius: 18,
    pointerEvents: "none",
  };
  const dots: CSSProperties = {
    position: "absolute",
    top: 40,
    right: 48,
    width: 240,
    height: 160,
    backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1.5px, transparent 1.5px)",
    backgroundSize: "20px 20px",
  };
  const glow: CSSProperties = {
    position: "absolute",
    top: -220,
    left: "50%",
    width: 1000,
    height: 560,
    marginLeft: -500,
    background: "radial-gradient(closest-side,rgba(255,0,51,0.32),transparent)",
  };
  const tape: CSSProperties = {
    height: story ? 18 : 12,
    background: "repeating-linear-gradient(-45deg,#FFD400 0 26px,#0A0A0A 26px 52px)",
    flexShrink: 0,
  };
  const scoreText: CSSProperties = {
    fontFamily: MONO,
    fontWeight: 700,
    lineHeight: 1,
    background: "linear-gradient(180deg,#FFD400 20%,#FF6A00 75%,#FF0033 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };

  const threatBar = (
    <div style={{ marginTop: story ? 26 : 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: MONO,
          fontSize: story ? 22 : 15,
          letterSpacing: 3,
          color: "#A1A1AA",
          marginBottom: 10,
        }}
      >
        <span>THREAT LEVEL</span>
        <span style={{ color: "#FF0033", fontWeight: 700 }}>CRITICAL</span>
      </div>
      <div style={{ height: story ? 18 : 12, background: "#222222", borderRadius: 999 }}>
        <div
          style={{
            width: `${data.brainRotScore}%`,
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg,#FF0033,#FF6A00,#FFD400)",
          }}
        />
      </div>
    </div>
  );

  const stamp = (
    <div
      style={{
        display: "inline-block",
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: story ? 30 : 19,
        letterSpacing: 4,
        color: "#FFD400",
        border: `${story ? 4 : 3}px solid #FFD400`,
        borderRadius: 10,
        padding: `${story ? 12 : 7}px ${story ? 26 : 16}px`,
        transform: "rotate(-7deg)",
      }}
    >
      CERTIFIED COOKED ✓
    </div>
  );

  const flags = (
    <div style={{ display: "flex", flexDirection: "column", gap: story ? 16 : 10, marginTop: story ? 30 : 18 }}>
      {data.redFlags.slice(0, 3).map((f, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: story ? 18 : 12 }}>
          <span
            style={{
              flexShrink: 0,
              width: story ? 44 : 30,
              height: story ? 44 : 30,
              borderRadius: 8,
              background: "#FF0033",
              color: "#fff",
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: story ? 26 : 17,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            !
          </span>
          <span style={{ fontSize: story ? 27 : 18, color: "rgba(255,255,255,0.88)", lineHeight: 1.4 }}>
            {f.length > (story ? 90 : 70) ? f.slice(0, story ? 90 : 70).trimEnd() + "…" : f}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div style={wrap}>
      <div style={frame} />
      <div style={dots} />
      <div style={glow} />
      <div style={tape} />

      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${story ? 34 : 20}px ${pad}px 0`,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: story ? 20 : 14 }}>
          <Mark size={story ? 64 : 44} />
          <div>
            <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: story ? 38 : 26 }}>
              Roast<span style={{ color: "#FF0033" }}>My</span>Tube
            </div>
            <div style={{ fontFamily: MONO, fontSize: story ? 19 : 13, letterSpacing: 4, color: "#A1A1AA" }}>
              CERTIFIED ROAST REPORT
            </div>
          </div>
        </div>
        <span
          style={{
            fontFamily: MONO,
            fontSize: story ? 26 : 18,
            fontWeight: 700,
            color: "#0A0A0A",
            background: "#FFD400",
            padding: `${story ? 12 : 7}px ${story ? 26 : 18}px`,
            borderRadius: 999,
          }}
        >
          {data.rank.toUpperCase()}
        </span>
      </div>

      {/* body */}
      {variant === "post" ? (
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 56, padding: `10px ${pad}px`, position: "relative" }}>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ ...scoreText, fontSize: 190 }}> {data.brainRotScore}</div>
            <div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: 6, color: "#A1A1AA", marginTop: 6 }}>
              BRAIN-ROT / 100
            </div>
            <div style={{ width: 300, margin: "14px auto 0" }}>{threatBar}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 54, lineHeight: 1.05 }}>
              “{data.personalityTitle}”
            </div>
            <div style={{ fontSize: 23, lineHeight: 1.5, color: "rgba(255,255,255,0.82)", marginTop: 14 }}>
              {excerpt}
            </div>
            {flags}
          </div>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: `10px ${pad}px`,
            position: "relative",
          }}
        >
          <div style={{ ...scoreText, fontSize: story ? 300 : 210 }}>{data.brainRotScore}</div>
          <div style={{ fontFamily: MONO, fontSize: story ? 28 : 22, letterSpacing: 8, color: "#A1A1AA", marginTop: 8 }}>
            BRAIN-ROT / 100
          </div>
          <div style={{ width: story ? "100%" : 560, marginTop: 6 }}>{threatBar}</div>
          <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: story ? 72 : 58, lineHeight: 1.05, marginTop: story ? 44 : 26 }}>
            “{data.personalityTitle}”
          </div>
          <div style={{ fontSize: story ? 31 : 25, lineHeight: 1.5, color: "rgba(255,255,255,0.82)", marginTop: story ? 30 : 16, maxWidth: story ? 880 : 760 }}>
            {excerpt}
          </div>
          <div style={{ marginTop: story ? 36 : 20, textAlign: "left", width: story ? "100%" : 640 }}>{flags}</div>
          <div style={{ marginTop: story ? 48 : 28 }}>{stamp}</div>
        </div>
      )}

      {/* footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `0 ${pad}px ${story ? 34 : 20}px`,
          position: "relative",
        }}
      >
        <span style={{ fontFamily: MONO, fontSize: story ? 24 : 17, color: "#A1A1AA" }}>
          Get roasted → roastmytube
        </span>
        {variant === "post" && <div>{stamp}</div>}
        <span style={{ fontFamily: MONO, fontSize: story ? 24 : 17, color: "#FF0033", fontWeight: 700 }}>
          NO SURVIVORS
        </span>
      </div>
      <div style={tape} />
    </div>
  );
}
