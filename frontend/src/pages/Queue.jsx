import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const api = (path, opts) => fetch(`/api${path}`, opts).then((r) => r.json());

export default function Queue() {
  const qc = useQueryClient();

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["queue"],
    queryFn: () => api("/queue"),
    refetchInterval: 5_000,
  });

  const approve = useMutation({
    mutationFn: (id) => api(`/jobs/${id}/approve`, { method: "POST" }),
    onSuccess: () => qc.invalidateQueries(["queue"]),
  });

  const reject = useMutation({
    mutationFn: (id) => api(`/jobs/${id}/reject`, { method: "POST" }),
    onSuccess: () => qc.invalidateQueries(["queue"]),
  });

  if (isLoading) return <div className="p-8 text-gray-500">Loading queue…</div>;

  if (jobs.length === 0)
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🎬</p>
          <p className="text-gray-400 text-lg">No reels awaiting review</p>
          <p className="text-gray-600 text-sm mt-2">
            Trigger the pipeline from Settings
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-400">🎬 Review Queue</h1>
        <p className="text-gray-500 mt-1 text-sm">
          {jobs.length} reel(s) awaiting review
        </p>
      </div>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-gray-900 rounded-2xl p-5 border border-gray-800 flex gap-4"
          >
            <video
              src={job.video_url || ""}
              controls
              className="w-28 h-48 rounded-xl object-cover bg-black flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-base truncate">
                {job.id}
              </p>
              <p className="text-gray-500 text-xs mt-2">{job.status}</p>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={() => approve.mutate(job.id)}
                disabled={approve.isPending}
                className="bg-green-600 hover:bg-green-500 disabled:opacity-40 px-4 py-2 rounded-xl text-sm font-semibold"
              >
                ✓ Approve
              </button>
              <button
                onClick={() => reject.mutate(job.id)}
                disabled={reject.isPending}
                className="bg-gray-800 hover:bg-red-900/50 border border-red-800/50 px-4 py-2 rounded-xl text-sm font-semibold"
              >
                ✗ Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
