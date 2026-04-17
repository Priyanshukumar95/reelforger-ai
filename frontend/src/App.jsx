import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Queue from "./pages/Queue";
import Settings from "./pages/Settings";
import Editor from "./pages/Editor";

const NAV = [
  { label: "⚡ Dashboard", path: "/" },
  { label: "🎬 Queue", path: "/queue" },
  { label: "✂️ Editor", path: "/editor" },
  { label: "⚙️ Settings", path: "/settings" },
];

export default function App() {
  const location = useLocation();
  return (
    <div className="flex bg-gray-950 min-h-screen">
      <nav className="w-52 bg-gray-900 border-r border-gray-800 p-5 flex flex-col gap-2">
        <p className="text-cyan-400 font-bold text-lg mb-6 tracking-tight">
          ReelForge
        </p>
        {NAV.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className={`text-sm py-2 px-3 rounded-lg transition-all ${
              location.pathname === path
                ? "bg-cyan-500/10 text-cyan-400 font-semibold"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <main className="flex-1 ml-52 overflow-auto min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
