const WORKER_URL = 'https://gemini-worker.readingjournal.workers.dev';

interface Prompt {
  promptMessage: string;
}

export const askAi = async ({ promptMessage }: Prompt) => {
  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: promptMessage }),
  });

  const data = await response.json();

  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response from AI'
  );
};
