import { useState } from "react";

const reels = [
  {
    id: 1,
    name: "viral_hook_v5.mp4",
    score: 91,
    duration: "0:32",
    status: "Done",
  },
  {
    id: 2,
    name: "trending_audio_v3.mp4",
    score: 88,
    duration: "0:45",
    status: "Done",
  },
  {
    id: 3,
    name: "product_launch_reel.mp4",
    score: 84,
    duration: "0:58",
    status: "Review",
  },
  {
    id: 4,
    name: "storytime_ugc_02.mp4",
    score: 76,
    duration: "1:12",
    status: "Done",
  },
  {
    id: 5,
    name: "brand_collab_clip.mp4",
    score: 79,
    duration: "0:22",
    status: "Review",
  },
];

const metadata = [
  { label: "Hook Score", value: "94/100", color: "#00e5a0" },
  { label: "Retention Drop", value: "12% @ 0:18", color: "#ffb300" },
  { label: "Virality Index", value: "High", color: "#7c4dff" },
  { label: "Recommended CTA", value: "Follow + Save", color: "#00d4ff" },
];

export default function Editor() {
  const [selected, setSelected] = useState(reels[0]);
  const [playing, setPlaying] = useState(false);

  return (
    <div
      style={{
        padding: "28px 32px",
        minHeight: "100vh",
        background: "#050508",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#f0eeff",
            letterSpacing: "-0.5px",
            marginBottom: 4,
          }}
        >
          Editor
        </h1>
        <p style={{ color: "#6b6b8a", fontSize: 14 }}>
          Preview and analyze your reels
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 16,
          height: "calc(100vh - 160px)",
        }}
      >
        <div
          style={{
            background: "#0d0d14",
            border: "1px solid rgba(120,80,255,0.12)",
            borderRadius: 12,
            padding: 16,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#6b6b8a",
              letterSpacing: "1.5px",
              marginBottom: 12,
            }}
          >
            REELS
          </div>
          {reels.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelected(r)}
              onMouseEnter={(e) => {
                if (selected.id !== r.id)
                  e.currentTarget.style.background = "rgba(124,77,255,0.06)";
              }}
              onMouseLeave={(e) => {
                if (selected.id !== r.id)
                  e.currentTarget.style.background = "transparent";
              }}
              style={{
                padding: 12,
                borderRadius: 8,
                marginBottom: 6,
                cursor: "pointer",
                background:
                  selected.id === r.id
                    ? "rgba(124,77,255,0.12)"
                    : "transparent",
                border: `1px solid ${
                  selected.id === r.id ? "rgba(124,77,255,0.35)" : "transparent"
                }`,
                boxShadow:
                  selected.id === r.id
                    ? "0 0 20px rgba(124,77,255,0.15)"
                    : "none",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  height: 56,
                  borderRadius: 6,
                  marginBottom: 8,
                  background:
                    "linear-gradient(135deg, rgba(124,77,255,0.25), rgba(0,212,255,0.1))",
                  border: "1px solid rgba(120,80,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: "#a78bfa",
                }}
              >
                ▶
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "#f0eeff",
                  marginBottom: 4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {r.name}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "#6b6b8a" }}>
                  {r.duration}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color:
                      r.score >= 85
                        ? "#00e5a0"
                        : r.score >= 75
                        ? "#ffb300"
                        : "#ff4d6d",
                  }}
                >
                  {r.score}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              flex: 1,
              background: "#0d0d14",
              border: "1px solid rgba(120,80,255,0.12)",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at center, rgba(124,77,255,0.08) 0%, transparent 70%)",
              }}
            />
            <div
              style={{
                width: 160,
                height: 260,
                borderRadius: 16,
                background:
                  "linear-gradient(160deg, rgba(124,77,255,0.2) 0%, rgba(0,212,255,0.08) 100%)",
                border: "1px solid rgba(124,77,255,0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <button
                onClick={() => setPlaying(!playing)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.12)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(124,77,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: playing
                    ? "rgba(255,77,109,0.15)"
                    : "rgba(124,77,255,0.2)",
                  border: `2px solid ${playing ? "#ff4d6d" : "#7c4dff"}`,
                  color: playing ? "#ff4d6d" : "#a78bfa",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                {playing ? "⏸" : "▶"}
              </button>
              <div
                style={{
                  fontSize: 11,
                  color: "#6b6b8a",
                  fontFamily: "monospace",
                  textAlign: "center",
                }}
              >
                {playing ? "Playing..." : "Click to Preview"}
                <br />
                <span style={{ color: "#a78bfa" }}>
                  {selected.name.split(".")[0]}
                </span>
              </div>
            </div>
            <div style={{ position: "absolute", top: 16, right: 16 }}>
              <span
                style={{
                  background: "rgba(0,229,160,0.1)",
                  border: "1px solid rgba(0,229,160,0.25)",
                  borderRadius: 6,
                  padding: "3px 10px",
                  fontSize: 11,
                  color: "#00e5a0",
                }}
              >
                {selected.status}
              </span>
            </div>
            <div
              style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}
            >
              <div
                style={{
                  height: 3,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 2,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: playing ? "40%" : "0%",
                    background: "#7c4dff",
                    borderRadius: 2,
                    transition: "width 0.5s",
                    boxShadow: "0 0 8px #7c4dff",
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
            }}
          >
            {metadata.map((m) => (
              <div
                key={m.label}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = m.color;
                  e.currentTarget.style.boxShadow = `0 4px 20px ${m.color}30`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(120,80,255,0.12)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "none";
                }}
                style={{
                  background: "#0d0d14",
                  border: "1px solid rgba(120,80,255,0.12)",
                  borderRadius: 8,
                  padding: "14px 16px",
                  transition: "all 0.2s",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "#6b6b8a",
                    letterSpacing: "1px",
                    marginBottom: 6,
                  }}
                >
                  {m.label.toUpperCase()}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: m.color }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
