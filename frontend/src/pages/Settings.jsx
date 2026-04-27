import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Settings() {
  const qc = useQueryClient();
  const [time, setTime] = useState("18:00");
  const [max, setMax] = useState("3");

  useQuery({
    queryKey: ["schedule"],
    queryFn: () => fetch("/api/schedule").then((r) => r.json()),
    onSuccess: (d) => {
      setTime(d.publish_time || "18:00");
      setMax(String(d.max_per_day || "3"));
    },
  });

  const save = useMutation({
    mutationFn: () =>
      fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publish_time: time,
          max_per_day: parseInt(max),
        }),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries(["schedule"]),
  });

  const trigger = useMutation({
    mutationFn: () =>
      fetch("/api/pipeline/trigger", { method: "POST" }).then((r) => r.json()),
  });

  const hours = time.split(":")[0];
  const minutes = time.split(":")[1];
  const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
  const displayHour = parseInt(hours) % 12 || 12;

  return (
    <div
      style={{
        padding: "28px 32px",
        minHeight: "100vh",
        background: "#050508",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#f0eeff",
            letterSpacing: "-0.5px",
          }}
        >
          ⚙️ Settings
        </h1>
        <p style={{ color: "#6b6b8a", fontSize: 14, marginTop: 4 }}>
          Configure your pipeline and publish schedule
        </p>
      </div>

      <div
        style={{
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Clock Display */}
        <div
          style={{
            background: "#0d0d14",
            border: "1px solid rgba(120,80,255,0.15)",
            borderRadius: 16,
            padding: "32px 24px",
            textAlign: "center",
          }}
        >
          {/* Big Clock */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              marginBottom: 24,
            }}
          >
            {/* Hour */}
            <div
              style={{
                background: "#13131e",
                border: "1px solid rgba(124,77,255,0.3)",
                borderRadius: 12,
                padding: "16px 24px",
                minWidth: 80,
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#a78bfa",
                  fontFamily: "monospace",
                  lineHeight: 1,
                }}
              >
                {String(displayHour).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#6b6b8a",
                  marginTop: 6,
                  letterSpacing: "1px",
                }}
              >
                HOUR
              </div>
            </div>

            {/* Colon */}
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: "#7c4dff",
                marginBottom: 16,
              }}
            >
              :
            </div>

            {/* Minutes */}
            <div
              style={{
                background: "#13131e",
                border: "1px solid rgba(124,77,255,0.3)",
                borderRadius: 12,
                padding: "16px 24px",
                minWidth: 80,
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#a78bfa",
                  fontFamily: "monospace",
                  lineHeight: 1,
                }}
              >
                {minutes}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#6b6b8a",
                  marginTop: 6,
                  letterSpacing: "1px",
                }}
              >
                MIN
              </div>
            </div>

            {/* AM/PM */}
            <div
              style={{
                background: "#13131e",
                border: "1px solid rgba(124,77,255,0.3)",
                borderRadius: 12,
                padding: "16px 16px",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#00e5a0",
                  fontFamily: "monospace",
                }}
              >
                {ampm}
              </div>
            </div>
          </div>

          {/* Hidden time input */}
          <div style={{ marginBottom: 8 }}>
            <label
              style={{
                color: "#6b6b8a",
                fontSize: 12,
                display: "block",
                marginBottom: 10,
                letterSpacing: "1px",
              }}
            >
              SET PUBLISH TIME
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                background: "#13131e",
                border: "1px solid rgba(124,77,255,0.3)",
                borderRadius: 10,
                padding: "12px 20px",
                color: "#f0eeff",
                fontSize: 16,
                width: "100%",
                cursor: "pointer",
                outline: "none",
              }}
            />
          </div>

          <p style={{ color: "#6b6b8a", fontSize: 12, marginTop: 8 }}>
            Videos will auto-publish daily at this time
          </p>
        </div>

        {/* Max Reels */}
        <div
          style={{
            background: "#0d0d14",
            border: "1px solid rgba(120,80,255,0.12)",
            borderRadius: 16,
            padding: "24px",
          }}
        >
          <label
            style={{
              color: "#9898b8",
              fontSize: 13,
              display: "block",
              marginBottom: 12,
            }}
          >
            Max Reels Per Day
          </label>

          {/* Number selector */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => setMax(String(Math.max(1, parseInt(max) - 1)))}
              style={{
                width: 40,
                height: 40,
                background: "#13131e",
                border: "1px solid rgba(124,77,255,0.3)",
                borderRadius: 10,
                color: "#a78bfa",
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              −
            </button>

            <div
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 36,
                fontWeight: 700,
                color: "#a78bfa",
                fontFamily: "monospace",
              }}
            >
              {max}
            </div>

            <button
              onClick={() => setMax(String(Math.min(10, parseInt(max) + 1)))}
              style={{
                width: 40,
                height: 40,
                background: "#13131e",
                border: "1px solid rgba(124,77,255,0.3)",
                borderRadius: 10,
                color: "#a78bfa",
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>

          <p
            style={{
              color: "#6b6b8a",
              fontSize: 12,
              marginTop: 12,
              textAlign: "center",
            }}
          >
            reels per day maximum
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={() => save.mutate()}
          disabled={save.isPending}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #7c4dff, #00d4ff)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "14px",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            opacity: save.isPending ? 0.5 : 1,
            letterSpacing: "0.5px",
          }}
        >
          {save.isPending ? "Saving…" : "💾 Save Settings"}
        </button>

        {save.isSuccess && (
          <p style={{ color: "#00e5a0", fontSize: 13, textAlign: "center" }}>
            ✅ Settings saved successfully!
          </p>
        )}

        {/* Pipeline Trigger */}
        <div
          style={{
            background: "#0d0d14",
            border: "1px solid rgba(120,80,255,0.12)",
            borderRadius: 16,
            padding: "24px",
          }}
        >
          <p style={{ fontWeight: 600, color: "#f0eeff", marginBottom: 8 }}>
            Pipeline Control
          </p>
          <p style={{ color: "#6b6b8a", fontSize: 12, marginBottom: 16 }}>
            Fetch trends → generate script → render video → add to queue
          </p>
          <button
            onClick={() => trigger.mutate()}
            disabled={trigger.isPending}
            style={{
              width: "100%",
              background: trigger.isPending
                ? "#13131e"
                : "linear-gradient(135deg, #4a0080, #7c4dff)",
              color: "#fff",
              border: "1px solid rgba(124,77,255,0.3)",
              borderRadius: 12,
              padding: "14px",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              opacity: trigger.isPending ? 0.7 : 1,
              letterSpacing: "0.5px",
            }}
          >
            {trigger.isPending
              ? "⏳ Pipeline Running…"
              : "▶ Trigger Pipeline Now"}
          </button>
          {trigger.isSuccess && (
            <p
              style={{
                color: "#00e5a0",
                fontSize: 13,
                textAlign: "center",
                marginTop: 12,
              }}
            >
              ✅ Pipeline triggered successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
