import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const STAT_CARDS = [
  {
    key: "total",
    label: "Generated",
    color: "text-cyan-400",
    bg: "bg-cyan-400/5",
  },
  {
    key: "pending",
    label: "Pending",
    color: "text-yellow-400",
    bg: "bg-yellow-400/5",
  },
  {
    key: "published",
    label: "Published",
    color: "text-green-400",
    bg: "bg-green-400/5",
  },
  { key: "failed", label: "Failed", color: "text-red-400", bg: "bg-red-400/5" },
];

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
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-400">⚡ Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm">
          ReelForge AI — Live pipeline stats
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map(({ key, label, color, bg }) => (
          <div
            key={key}
            className={`rounded-2xl p-5 border border-gray-800 ${bg}`}
          >
            <p className={`text-5xl font-bold ${color}`}>
              {isLoading ? "…" : stats?.[key] ?? "0"}
            </p>
            <p className="text-gray-400 text-sm mt-2 font-medium">{label}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h2 className="text-base font-bold text-gray-300 mb-4">
          🔴 Live Activity
        </h2>
        {feed.length === 0 ? (
          <p className="text-gray-600 text-sm py-4">
            Waiting for pipeline events…
          </p>
        ) : (
          feed.map((j, i) => (
            <div
              key={i}
              className="py-3 border-b border-gray-800 last:border-0 flex items-center gap-3"
            >
              <span className="text-cyan-400 font-mono text-xs bg-cyan-400/10 px-2 py-1 rounded">
                {j.status}
              </span>
              <span className="text-gray-300 text-sm">{j.title || j.id}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
