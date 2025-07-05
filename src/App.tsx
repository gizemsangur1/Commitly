import { useState } from "react";
import { generateCommitMessage } from "./lib/generateCommit";
import "./App.css"; 

export default function App() {
  const [commitMessage, setCommitMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate(diff: string) {
    setLoading(true);
    try {
      const message = await generateCommitMessage(diff);
      setCommitMessage(message);
    } catch (err) {
      console.error("Error generating commit:", err);
      setCommitMessage("Error generating commit. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="body">
      <div className="container">
        <div className="text-center">
          <h1 className="heading">🧠 Commitly</h1>
          <p className="subtext">AI-powered Git commit message assistant</p>
        </div>

        <div className="grid">
          <div className="card">
            <h2>📝 Describe Changes</h2>
            <textarea className="output"
              placeholder="E.g. added validation, fixed button bug..."
              onChange={(e) => setCommitMessage("")}
              rows={10}
              disabled={loading}
              onBlur={(e) => handleGenerate(e.target.value)}
            />
            <button
              onClick={() =>
                handleGenerate(
                  (document.querySelector("textarea") as HTMLTextAreaElement)
                    .value
                )
              }
              disabled={loading}
            >
              {loading ? "Generating..." : "⚡ Generate Commit Message"}
            </button>
          </div>

          <div className="card">
            <h2>💬 Suggested Commit</h2>
            <div className="output">
              {commitMessage ? (
                <pre>{commitMessage}</pre>
              ) : (
                <p className="output-placeholder">
                  Your AI suggestion will appear here.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
