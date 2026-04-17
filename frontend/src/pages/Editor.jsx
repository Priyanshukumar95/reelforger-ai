import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Editor() {
  const [selected, setSelected] = useState(null);

  const { data: jobs = [] } = useQuery({
    queryKey: ["queue"],
    queryFn: () => fetch("/api/queue").then((r) => r.json()),
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-400">✂️ Editor</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Preview and review generated reels
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-3">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-4">
            Reels
          </p>
          {jobs.length === 0 && (
            <p className="text-gray-600 text-sm">No reels in queue yet.</p>
          )}
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelected(job)}
              className={`cursor-pointer rounded-xl p-4 border transition-all ${
                selected?.id === job.id
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-gray-800 bg-gray-900 hover:border-gray-600"
              }`}
            >
              <p className="text-sm font-semibold text-white truncate">
                {job.id}
              </p>
              <p className="text-xs text-gray-500 mt-1">{job.status}</p>
            </div>
          ))}
        </div>
        <div className="col-span-2">
          {!selected ? (
            <div className="h-full flex items-center justify-center text-gray-600">
              <div className="text-center">
                <p className="text-5xl mb-3">✂️</p>
                <p>Select a reel to preview</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="font-bold text-lg mb-4">{selected.id}</h2>
              <video
                src={selected.video_url || ""}
                controls
                className="w-full max-h-96 rounded-xl bg-black object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
