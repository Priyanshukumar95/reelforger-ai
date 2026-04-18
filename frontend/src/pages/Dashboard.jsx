import { useState, useEffect } from "react";

const stats = [
  {
    label: "Reels Today",
    value: "24",
    sub: "+12% vs yesterday",
    color: "#7c4dff",
    glow: "rgba(124,77,255,0.3)",
    icon: "⬡",
  },
  {
    label: "In Queue",
    value: "7",
    sub: "3 processing now",
    color: "#00d4ff",
    glow: "rgba(0,212,255,0.3)",
    icon: "▦",
  },
  {
    label: "Avg Score",
    value: "87%",
    sub: "+3pts this week",
    color: "#ffb300",
    glow: "rgba(255,179,0,0.3)",
    icon: "◎",
  },
  {
    label: "Uptime",
    value: "99.9%",
    sub: "Last 30 days",
    color: "#00e5a0",
    glow: "rgba(0,229,160,0.3)",
    icon: "✦",
  },
];

const activity = [
  {
    name: "viral_hook_reel_04.mp4",
    status: "Done",
    time: "2m ago",
    color: "#00e5a0",
  },
  {
    name: "trending_audio_mix_02.mp4",
    status: "Processing",
    time: "5m ago",
    color: "#ffb300",
  },
  {
    name: "product_demo_reel.mp4",
    status: "Queued",
    time: "8m ago",
    color: "#6b6b8a",
  },
  {
    name: "storytime_format_v3.mp4",
    status: "Done",
    time: "15m ago",
    color: "#00e5a0",
  },
  {
    name: "hook_test_b_variant.mp4",
    status: "Done",
    time: "22m ago",
    color: "#00e5a0",
  },
  {
    name: "ugc_style_clip_01.mp4",
    status: "Failed",
    time: "31m ago",
    color: "#ff4d6d",
  },
];

const perf = [
  { label: "Completion Rate", val: 78, color: "#7c4dff" },
  { label: "Avg Engagement", val: 54, color: "#00d4ff" },
  { label: "Queue Throughput", val: 91, color: "#ffb300" },
  { label: "Success Rate", val: 88, color: "#00e5a0" },
];

export default function Dashboard() {
  const [bars, setBars] = useState(perf.map(() => 0));
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setBars(perf.map((p) => p.val)), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        padding: "28px 32px",
        minHeight: "100vh",
        background: "#050508",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 4,
          }}
        >
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#f0eeff",
              letterSpacing: "-0.5px",
            }}
          >
            Dashboard
          </h1>
          <span
            style={{
              background: "rgba(0,229,160,0.1)",
              border: "1px solid rgba(0,229,160,0.25)",
              borderRadius: 20,
              padding: "3px 10px",
              fontSize: 11,
              color: "#00e5a0",
              fontWeight: 600,
            }}
          >
            ● LIVE
          </span>
        </div>
        <p style={{ color: "#6b6b8a", fontSize: 14 }}>
          Your ReelForge AI pipeline at a glance
        </p>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              background: hoveredCard === i ? "#13131e" : "#0d0d14",
              border: `1px solid ${
                hoveredCard === i ? s.color : "rgba(120,80,255,0.12)"
              }`,
              borderRadius: 12,
              padding: "20px",
              cursor: "default",
              transform: hoveredCard === i ? "translateY(-4px)" : "none",
              boxShadow: hoveredCard === i ? `0 8px 30px ${s.glow}` : "none",
              transition: "all 0.2s",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)`,
                opacity: hoveredCard === i ? 1 : 0.3,
              }}
            />
            <div
              style={{
                fontSize: 11,
                color: "#6b6b8a",
                letterSpacing: "1.5px",
                fontWeight: 500,
                marginBottom: 8,
              }}
            >
              {s.label.toUpperCase()}
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: s.color,
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: "#9898b8" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Bottom panels */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}
      >
        {/* Activity */}
        <div
          style={{
            background: "#0d0d14",
            border: "1px solid rgba(120,80,255,0.12)",
            borderRadius: 12,
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: "#f0eeff" }}>
              Recent Activity
            </span>
            <span
              style={{
                background: "rgba(124,77,255,0.12)",
                border: "1px solid rgba(124,77,255,0.25)",
                borderRadius: 6,
                padding: "3px 10px",
                fontSize: 11,
                color: "#a78bfa",
              }}
            >
              Live
            </span>
          </div>
          {activity.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 8px",
                borderBottom:
                  i < activity.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
                borderRadius: 6,
                transition: "background 0.15s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(124,77,255,0.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: a.color,
                  boxShadow: `0 0 8px ${a.color}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  flex: 1,
                  fontSize: 12,
                  color: "#9898b8",
                  fontFamily: "monospace",
                }}
              >
                {a.name}
              </span>
              <span
                style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 5,
                  fontWeight: 500,
                  background: `${a.color}20`,
                  border: `1px solid ${a.color}50`,
                  color: a.color,
                }}
              >
                {a.status}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#6b6b8a",
                  minWidth: 48,
                  textAlign: "right",
                }}
              >
                {a.time}
              </span>
            </div>
          ))}
        </div>

        {/* Performance */}
        <div
          style={{
            background: "#0d0d14",
            border: "1px solid rgba(120,80,255,0.12)",
            borderRadius: 12,
            padding: "20px",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#f0eeff",
              marginBottom: 20,
            }}
          >
            Performance
          </div>
          {perf.map((p, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 7,
                }}
              >
                <span style={{ fontSize: 12, color: "#9898b8" }}>
                  {p.label}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: p.color,
                    fontFamily: "monospace",
                  }}
                >
                  {p.val}%
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 3,
                    background: p.color,
                    width: `${bars[i]}%`,
                    transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
                    boxShadow: `0 0 8px ${p.color}80`,
                  }}
                />
              </div>
            </div>
          ))}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginTop: 8,
            }}
          >
            {[
              { l: "Errors Today", v: "2", c: "#ff4d6d" },
              { l: "Avg Time", v: "1.4s", c: "#00d4ff" },
            ].map((s) => (
              <div
                key={s.l}
                style={{
                  background: "#13131e",
                  borderRadius: 8,
                  padding: "10px 12px",
                  border: "1px solid rgba(120,80,255,0.12)",
                }}
              >
                <div
                  style={{ fontSize: 10, color: "#6b6b8a", marginBottom: 4 }}
                >
                  {s.l}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: s.c }}>
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
