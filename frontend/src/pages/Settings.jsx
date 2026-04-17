import { useState } from "react";

function Toggle({ value, onChange, color = "#7c4dff" }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        cursor: "pointer",
        position: "relative",
        background: value ? color : "rgba(255,255,255,0.08)",
        border: `1px solid ${value ? color : "rgba(120,80,255,0.12)"}`,
        boxShadow: value ? `0 0 12px ${color}60` : "none",
        flexShrink: 0,
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: value ? 22 : 2,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s",
        }}
      />
    </div>
  );
}

export default function Settings() {
  const [s, setS] = useState({
    autoApprove: false,
    notifications: true,
    aiReview: true,
    autoQueue: true,
    webhooks: false,
    quality: "1080p",
    batchSize: 5,
    threshold: 75,
  });
  const set = (k, v) => setS((p) => ({ ...p, [k]: v }));

  const Card = ({ title, icon, children }) => (
    <div
      style={{
        background: "#0d0d14",
        border: "1px solid rgba(120,80,255,0.12)",
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#f0eeff" }}>
          {title}
        </span>
      </div>
      <div
        style={{
          width: 32,
          height: 2,
          background: "#7c4dff",
          borderRadius: 1,
          marginBottom: 16,
          boxShadow: "0 0 8px #7c4dff",
        }}
      />
      {children}
    </div>
  );

  const Row = ({ label, sub, children }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "13px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#f0eeff",
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        {sub && <div style={{ fontSize: 12, color: "#6b6b8a" }}>{sub}</div>}
      </div>
      {children}
    </div>
  );

  return (
    <div
      style={{
        padding: "28px 32px",
        minHeight: "100vh",
        background: "#050508",
        fontFamily: "'Syne', sans-serif",
        maxWidth: 820,
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
          Settings
        </h1>
        <p style={{ color: "#6b6b8a", fontSize: 14 }}>
          Configure your ReelForge pipeline
        </p>
      </div>

      <Card title="Pipeline" icon="⬡">
        <Row
          label="Auto-Approve Reels"
          sub="Approve reels above threshold automatically"
        >
          <Toggle
            value={s.autoApprove}
            onChange={(v) => set("autoApprove", v)}
            color="#00e5a0"
          />
        </Row>
        <Row label="AI Review" sub="Enable AI-powered content analysis">
          <Toggle value={s.aiReview} onChange={(v) => set("aiReview", v)} />
        </Row>
        <Row label="Auto Queue" sub="Add new uploads to queue automatically">
          <Toggle value={s.autoQueue} onChange={(v) => set("autoQueue", v)} />
        </Row>
        <Row
          label="Approval Threshold"
          sub={`Min score to auto-approve: ${s.threshold}`}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="range"
              min={50}
              max={100}
              value={s.threshold}
              onChange={(e) => set("threshold", +e.target.value)}
              style={{ width: 100, accentColor: "#7c4dff" }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#a78bfa",
                minWidth: 30,
                fontFamily: "monospace",
              }}
            >
              {s.threshold}
            </span>
          </div>
        </Row>
        <Row label="Batch Size" sub="Reels processed per batch">
          <select
            value={s.batchSize}
            onChange={(e) => set("batchSize", +e.target.value)}
            style={{
              background: "#13131e",
              border: "1px solid rgba(120,80,255,0.2)",
              color: "#f0eeff",
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {[3, 5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n} reels
              </option>
            ))}
          </select>
        </Row>
      </Card>

      <Card title="Output Quality" icon="◈">
        <Row label="Export Resolution" sub="Resolution for processed reels">
          <div style={{ display: "flex", gap: 6 }}>
            {["720p", "1080p", "4K"].map((q) => (
              <button
                key={q}
                onClick={() => set("quality", q)}
                onMouseEnter={(e) => {
                  if (s.quality !== q)
                    e.currentTarget.style.borderColor = "rgba(124,77,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  if (s.quality !== q)
                    e.currentTarget.style.borderColor = "rgba(120,80,255,0.12)";
                }}
                style={{
                  padding: "5px 14px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  background:
                    s.quality === q ? "rgba(124,77,255,0.15)" : "transparent",
                  border: `1px solid ${
                    s.quality === q ? "#7c4dff" : "rgba(120,80,255,0.12)"
                  }`,
                  color: s.quality === q ? "#a78bfa" : "#6b6b8a",
                  cursor: "pointer",
                  boxShadow:
                    s.quality === q ? "0 0 16px rgba(124,77,255,0.2)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </Row>
      </Card>

      <Card title="Notifications" icon="⊛">
        <Row
          label="Push Notifications"
          sub="Get notified when reels are processed"
        >
          <Toggle
            value={s.notifications}
            onChange={(v) => set("notifications", v)}
            color="#00d4ff"
          />
        </Row>
        <Row label="Webhooks" sub="Send events to external endpoints">
          <Toggle
            value={s.webhooks}
            onChange={(v) => set("webhooks", v)}
            color="#ffb300"
          />
        </Row>
      </Card>

      <button
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(124,77,255,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(124,77,255,0.4)";
        }}
        style={{
          padding: "12px 32px",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          background: "linear-gradient(135deg, #7c4dff, #00d4ff)",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(124,77,255,0.4)",
          transition: "all 0.2s",
        }}
      >
        Save Settings
      </button>
    </div>
  );
}
