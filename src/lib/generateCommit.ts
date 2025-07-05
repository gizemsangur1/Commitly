export async function generateCommitMessage(diff: string): Promise<string> {
  const prompt = `
You are a senior developer. Given the following code changes, generate a conventional Git commit message.

Format:
<type>: <short summary>

Example:
feat: add validation to login form

Code changes:
${diff}
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("OpenAI API error:", errorData);
    throw new Error(`OpenAI API error: ${res.statusText}`);
  }

  const data = await res.json();

  if (!data.choices || data.choices.length === 0) {
    throw new Error("No response from OpenAI");
  }

  return data.choices[0].message.content.trim();
}
