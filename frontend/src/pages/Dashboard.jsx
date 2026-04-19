import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io({ path: "/ws" });

export default function Dashboard() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    socket.on("job_update", (job) => setFeed((p) => [job, ...p.slice(0, 9)]));
    return () => socket.off("job_update");
  }, []);

  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: () => fetch("/api/stats").then((r) => r.json()),
    refetchInterval: 10_000,
  });

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
        {[
          {
            key: "total",
            label: "Generated",
            color: "#00d4ff",
            glow: "rgba(0,212,255,0.3)",
          },
          {
            key: "pending",
            label: "Pending",
            color: "#ffb300",
            glow: "rgba(255,179,0,0.3)",
          },
          {
            key: "published",
            label: "Published",
            color: "#00e5a0",
            glow: "rgba(0,229,160,0.3)",
          },
          {
            key: "failed",
            label: "Failed",
            color: "#ff4d6d",
            glow: "rgba(255,77,109,0.3)",
          },
        ].map((s) => (
          <div
            key={s.key}
            style={{
              background: "#0d0d14",
              border: "1px solid rgba(120,80,255,0.12)",
              borderRadius: 12,
              padding: "20px",
            }}
          >
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
              {isLoading ? "…" : stats?.[s.key] ?? "0"}
            </div>
          </div>
        ))}
      </div>

      {/* Live Activity Feed */}
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
            Live Activity
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
        {feed.length === 0 ? (
          <p style={{ color: "#6b6b8a", fontSize: 13 }}>
            Waiting for pipeline events…
          </p>
        ) : (
          feed.map((j, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 8px",
                borderBottom:
                  i < feed.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#00e5a0",
                  boxShadow: "0 0 8px #00e5a0",
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
                {j.title || j.id}
              </span>
              <span
                style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 5,
                  fontWeight: 500,
                  background: "#00e5a020",
                  border: "1px solid #00e5a050",
                  color: "#00e5a0",
                }}
              >
                {j.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
