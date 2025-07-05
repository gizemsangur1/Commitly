import { useState } from "react";

type DiffInputProps = {
  onSubmit: (diff: string) => void;
  loading: boolean;
};

export default function DiffInput({ onSubmit, loading }: DiffInputProps) {
  const [diff, setDiff] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!diff.trim()) return;
    onSubmit(diff.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <textarea
        value={diff}
        onChange={(e) => setDiff(e.target.value)}
        placeholder="Paste code diff or describe the change..."
        className="w-full p-4 rounded-lg shadow border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        rows={8}
      />

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded shadow transition"
        disabled={loading}
      >
        {loading ? "Thinking..." : "💡 Generate Commit Message"}
      </button>
    </form>
  );
}
