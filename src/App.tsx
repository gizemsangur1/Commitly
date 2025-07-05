import { useState } from "react";
import DiffInput from "./components/DiffInput";
import { generateCommitMessage } from "./lib/generateCommit";

function App() {
  const [commitMessage, setCommitMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate(diff: string) {
    setLoading(true);
    try {
      const message = await generateCommitMessage(diff);
      setCommitMessage(message);
    } catch (err) {
      console.error("Error generating commit:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4 flex items-center justify-center gap-2">
        🧠{" "}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Commitly
        </span>
      </h1>
      <p className="text-center text-gray-500 text-sm mb-6">
        AI-powered commit message generator
      </p>

      <DiffInput onSubmit={handleGenerate} loading={loading} />

      {commitMessage && (
        <div className="mt-6 p-4 bg-gray-100 rounded border">
          <h2 className="font-semibold mb-2">💬 Suggested Commit:</h2>
          <pre className="text-sm whitespace-pre-wrap">{commitMessage}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
