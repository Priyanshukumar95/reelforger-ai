import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Settings() {
  const qc = useQueryClient();
  const [time, setTime] = useState("18:00");
  const [max, setMax] = useState("3");

  useQuery({
    queryKey: ["schedule"],
    queryFn: () => fetch("/api/schedule").then((r) => r.json()),
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

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-400">⚙️ Settings</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Configure publish schedule and pipeline
        </p>
      </div>
      <div className="max-w-lg space-y-4">
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 space-y-4">
          <h2 className="font-bold text-gray-300">Publish Schedule</h2>
          <div>
            <label className="text-gray-400 text-sm block mb-2">
              Daily Publish Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white w-full"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-2">
              Max Reels Per Day
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white w-full"
            />
          </div>
          <button
            onClick={() => save.mutate()}
            disabled={save.isPending}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 py-3 rounded-xl font-semibold"
          >
            {save.isPending ? "Saving…" : "💾 Save Settings"}
          </button>
          {save.isSuccess && (
            <p className="text-green-400 text-sm text-center">
              Settings saved ✅
            </p>
          )}
        </div>
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="font-bold text-gray-300 mb-4">Pipeline Control</h2>
          <button
            onClick={() => trigger.mutate()}
            disabled={trigger.isPending}
            className="w-full bg-purple-700 hover:bg-purple-600 disabled:opacity-50 py-3 rounded-xl font-semibold"
          >
            {trigger.isPending ? "Triggering…" : "▶ Trigger Pipeline Now"}
          </button>
          {trigger.isSuccess && (
            <p className="text-green-400 text-sm text-center mt-3">
              Pipeline triggered ✅
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
