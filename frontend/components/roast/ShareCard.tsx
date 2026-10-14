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

/**
 * Share card rendered with INLINE STYLES ONLY (hex/rgba, no Tailwind):
 * html-to-image snapshots computed styles, and Tailwind v4's color-mix/oklab
 * values break the export. Keep this component utility-class-free.
 */
export function ShareCard({ data, variant }: { data: ShareData; variant: ShareVariant }) {
  const { w, h } = SHARE_SIZES[variant];
  const s = variant === "story" ? 1.6 : 1;

  const wrap: CSSProperties = {
    width: w,
    height: h,
    background: "#0A0A0A",
    color: "#fff",
    fontFamily: BODY,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
  };
  const tape: CSSProperties = {
    height: 14 * s,
    background: "repeating-linear-gradient(-45deg,#FFD400 0 28px,#0A0A0A 28px 56px)",
  };
  const glow: CSSProperties = {
    position: "absolute",
    top: -200,
    left: "50%",
    width: 900,
    height: 500,
    marginLeft: -450,
    background: "radial-gradient(closest-side,rgba(255,0,51,0.35),transparent)",
  };
  const body: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: variant === "post" ? "row" : "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 48 * s,
    padding: `${44 * s}px ${56 * s}px`,
    position: "relative",
  };
  const scoreStyle: CSSProperties = {
    fontFamily: MONO,
    fontSize: (variant === "post" ? 150 : 190) * s,
    fontWeight: 700,
    lineHeight: 1,
    color: "#FFD400",
    textShadow: "0 0 60px rgba(255,212,0,0.4)",
  };

  return (
    <div style={wrap}>
      <div style={tape} />
      <div style={glow} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${22 * s}px ${56 * s}px 0`,
          position: "relative",
        }}
      >
        <span style={{ fontFamily: MONO, fontSize: 22 * s, letterSpacing: 5, color: "#A1A1AA" }}>
          ROASTMYTUBE • CERTIFIED ROAST
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 20 * s,
            fontWeight: 700,
            color: "#0A0A0A",
            background: "#FFD400",
            padding: `${6 * s}px ${18 * s}px`,
            borderRadius: 999,
          }}
        >
          {data.rank.toUpperCase()}
        </span>
      </div>

      <div style={body}>
        <div style={{ textAlign: variant === "post" ? "left" : "center" }}>
          <div style={scoreStyle}>{data.brainRotScore}</div>
          <div style={{ fontFamily: MONO, fontSize: 24 * s, letterSpacing: 8, color: "#A1A1AA", marginTop: 8 * s }}>
            BRAIN-ROT / 100
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: (variant === "post" ? 56 : 64) * s,
              lineHeight: 1.05,
            }}
          >
            “{data.personalityTitle}”
          </div>
          <div style={{ fontSize: (variant === "post" ? 24 : 28) * s, lineHeight: 1.5, color: "rgba(255,255,255,0.82)", marginTop: 20 * s }}>
            {data.roast.length > 220 ? data.roast.slice(0, 220).trimEnd() + "…" : data.roast}
          </div>
          <div style={{ display: "flex", gap: 14 * s, marginTop: 22 * s, flexWrap: "wrap" }}>
            {data.redFlags.map((f, i) => (
              <span
                key={i}
                style={{
                  fontFamily: MONO,
                  fontSize: 19 * s,
                  color: "#FFD400",
                  border: "2px solid rgba(255,212,0,0.5)",
                  borderRadius: 10 * s,
                  padding: `${8 * s}px ${16 * s}px`,
                }}
              >
                🚩 {f.length > 60 ? f.slice(0, 60).trimEnd() + "…" : f}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `0 ${56 * s}px ${26 * s}px`,
          position: "relative",
        }}
      >
        <span style={{ fontFamily: MONO, fontSize: 20 * s, color: "#A1A1AA" }}>
          Get roasted → roastmytube
        </span>
        <span style={{ fontFamily: MONO, fontSize: 20 * s, color: "#FF0033", fontWeight: 700 }}>
          NO SURVIVORS
        </span>
      </div>
      <div style={tape} />
    </div>
  );
}
