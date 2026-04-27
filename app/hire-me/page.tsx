"use client"

export default function HireMe() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 text-center">

      {/* HEADER */}
      <h1 className="text-5xl font-bold">🚀 Hire Me</h1>

      <p className="text-gray-400">
        Senior Technical Business Analyst | IAM | Product & Delivery
      </p>

      {/* PROFILE */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-left">
        <h2 className="text-xl mb-2">📌 Profile Summary</h2>

        <p className="text-gray-300">
          I bring 4.5+ years of experience in IAM/PIAM, working with enterprise
          clients like Adobe, Wells Fargo, and Fidelity. I specialize in
          bridging business needs with technical execution and driving
          end-to-end delivery.
        </p>
      </div>

      {/* SKILLS */}
      <div className="grid md:grid-cols-2 gap-6 text-left">

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="mb-3">🧠 Core Skills</h3>

          <ul className="space-y-2 text-gray-300">
            <li>✔ Business Analysis (BRD, FRD, FDD)</li>
            <li>✔ Stakeholder Management</li>
            <li>✔ Agile / Scrum</li>
            <li>✔ UAT & Delivery</li>
          </ul>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="mb-3">🔐 IAM Expertise</h3>

          <ul className="space-y-2 text-gray-300">
            <li>✔ RBAC / ABAC</li>
            <li>✔ JML Lifecycle</li>
            <li>✔ Access Governance</li>
            <li>✔ Okta / PIAM</li>
          </ul>
        </div>

      </div>

      {/* IMPACT */}
      <div className="bg-white/5 p-6 rounded-xl text-left">
        <h3 className="mb-3">📈 Impact</h3>

        <ul className="space-y-2 text-gray-300">
          <li>🚀 Improved workflow efficiency by 20–25%</li>
          <li>📊 Increased reporting accuracy by 30%</li>
          <li>🏆 Maintained 95%+ client satisfaction</li>
        </ul>
      </div>

      {/* CTA */}
      <div>
        <a
          href="mailto:shwetraj67@gmail.com"
          className="bg-blue-600 px-6 py-3 rounded text-lg"
        >
          📩 Contact Me
        </a>

        <p className="text-gray-400 mt-2 text-sm">
          Open to Senior BA / IAM / Product roles
        </p>
      </div>

    </div>
  )
}
