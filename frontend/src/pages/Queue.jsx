import { useState } from "react";

const initialQueue = [
  {
    id: 1,
    name: "viral_hook_v5.mp4",
    duration: "0:32",
    score: 91,
    status: "Processing",
    progress: 67,
    tags: ["hook", "trending"],
  },
  {
    id: 2,
    name: "product_launch_reel.mp4",
    duration: "0:58",
    score: 84,
    status: "Queued",
    progress: 0,
    tags: ["product", "promo"],
  },
  {
    id: 3,
    name: "storytime_ugc_02.mp4",
    duration: "1:12",
    score: 76,
    status: "Queued",
    progress: 0,
    tags: ["ugc", "story"],
  },
  {
    id: 4,
    name: "trending_audio_v3.mp4",
    duration: "0:45",
    score: 88,
    status: "Review",
    progress: 100,
    tags: ["audio", "viral"],
  },
  {
    id: 5,
    name: "brand_collab_clip.mp4",
    duration: "0:22",
    score: 79,
    status: "Review",
    progress: 100,
    tags: ["brand"],
  },
  {
    id: 6,
    name: "tutorial_short_01.mp4",
    duration: "0:55",
    score: 82,
    status: "Queued",
    progress: 0,
    tags: ["tutorial"],
  },
];

const statusColors = {
  Processing: "#ffb300",
  Queued: "#6b6b8a",
  Review: "#00d4ff",
  Approved: "#00e5a0",
  Rejected: "#ff4d6d",
};

export default function Queue() {
  const [items, setItems] = useState(initialQueue);
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState(null);

  const filters = ["All", "Processing", "Queued", "Review"];
  const filtered =
    filter === "All" ? items : items.filter((i) => i.status === filter);
  const updateStatus = (id, status) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));

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
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#f0eeff",
            letterSpacing: "-0.5px",
            marginBottom: 4,
          }}
        >
          Queue
        </h1>
        <p style={{ color: "#6b6b8a", fontSize: 14 }}>
          Manage and review your video pipeline
        </p>
      </div>
      <div
        style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              border:
                filter === f
                  ? "1px solid #7c4dff"
                  : "1px solid rgba(120,80,255,0.12)",
              background:
                filter === f ? "rgba(124,77,255,0.12)" : "transparent",
              color: filter === f ? "#a78bfa" : "#6b6b8a",
              cursor: "pointer",
              boxShadow:
                filter === f ? "0 0 20px rgba(124,77,255,0.2)" : "none",
              transition: "all 0.2s",
            }}
          >
            {f}
          </button>
        ))}
        <span
          style={{
            marginLeft: "auto",
            fontSize: 12,
            color: "#6b6b8a",
            alignSelf: "center",
          }}
        >
          {filtered.length} items
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === item.id ? "#13131e" : "#0d0d14",
              border: `1px solid ${
                hovered === item.id
                  ? "rgba(124,77,255,0.35)"
                  : "rgba(120,80,255,0.12)"
              }`,
              borderRadius: 12,
              padding: "16px 20px",
              transform: hovered === item.id ? "translateX(4px)" : "none",
              boxShadow:
                hovered === item.id ? "0 0 20px rgba(124,77,255,0.15)" : "none",
              transition: "all 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 72,
                  height: 44,
                  borderRadius: 6,
                  flexShrink: 0,
                  background:
                    "linear-gradient(135deg, rgba(124,77,255,0.2), rgba(0,212,255,0.1))",
                  border: "1px solid rgba(120,80,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: "#a78bfa",
                }}
              >
                ▶
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "monospace",
                      color: "#f0eeff",
                    }}
                  >
                    {item.name}
                  </span>
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 10,
                        padding: "2px 7px",
                        borderRadius: 4,
                        background: "rgba(124,77,255,0.1)",
                        border: "1px solid rgba(124,77,255,0.2)",
                        color: "#a78bfa",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#6b6b8a" }}>
                    ⏱ {item.duration}
                  </span>
                  <span style={{ fontSize: 12, color: "#6b6b8a" }}>
                    Score:{" "}
                    <span
                      style={{
                        color:
                          item.score >= 85
                            ? "#00e5a0"
                            : item.score >= 75
                            ? "#ffb300"
                            : "#ff4d6d",
                        fontWeight: 600,
                      }}
                    >
                      {item.score}
                    </span>
                  </span>
                  {item.status === "Processing" && (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <div
                        style={{
                          width: 80,
                          height: 4,
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: 2,
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${item.progress}%`,
                            background: "#ffb300",
                            borderRadius: 2,
                            boxShadow: "0 0 6px #ffb300",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 11, color: "#ffb300" }}>
                        {item.progress}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontSize: 11,
                    padding: "4px 10px",
                    borderRadius: 6,
                    fontWeight: 600,
                    background: `${statusColors[item.status]}20`,
                    border: `1px solid ${statusColors[item.status]}50`,
                    color: statusColors[item.status],
                  }}
                >
                  {item.status}
                </span>
                {item.status === "Review" && (
                  <>
                    <button
                      onClick={() => updateStatus(item.id, "Approved")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(0,229,160,0.25)";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(0,229,160,0.1)";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        background: "rgba(0,229,160,0.1)",
                        border: "1px solid rgba(0,229,160,0.3)",
                        color: "#00e5a0",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => updateStatus(item.id, "Rejected")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,77,109,0.25)";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,77,109,0.1)";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        background: "rgba(255,77,109,0.1)",
                        border: "1px solid rgba(255,77,109,0.3)",
                        color: "#ff4d6d",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      ✕ Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
