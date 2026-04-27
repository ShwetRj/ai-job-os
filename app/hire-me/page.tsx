export default function HireMe() {
  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Why Hire Me</h1>

      <ul className="mt-6 space-y-3">
        <li>✔ 4.5+ years IAM/PIAM</li>
        <li>✔ Clients: Adobe, Wells Fargo, Fidelity</li>
        <li>✔ Improved workflows by 25%</li>
      </ul>

      <div className="mt-6">
        <p>📍 Open to Remote / India / Singapore</p>
        <p>⏳ Notice Period: &lt; 30 days</p>
      </div>

      <a
        href="mailto:your@email.com"
        className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded"
      >
        Contact Me
      </a>
    </div>
  )
}
