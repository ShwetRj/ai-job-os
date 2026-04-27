export default function AISuggestions({ jobs }: any) {
  const top = jobs
    .filter((j: any) => !j.applied)
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 3)

  return (
    <div className="mb-8 bg-gradient-to-r from-blue-900 to-purple-900 p-5 rounded-xl">
      <h2 className="text-lg mb-3">🧠 AI Suggestions</h2>

      {top.map((j: any) => (
        <p key={j.id} className="text-sm">
          👉 Apply to <b>{j.company}</b> (Score: {j.score})
        </p>
      ))}
    </div>
  )
}
