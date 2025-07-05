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
        placeholder="Paste your code diff or describe your changes..."
        rows={10}
        className="w-full p-3 border rounded bg-white text-sm text-black"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Commit Message"}
      </button>
    </form>
  );
}
