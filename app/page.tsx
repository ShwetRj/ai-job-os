import Link from "next/link"

export default function Home() {
  return (
    <div className="text-center mt-20">

      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        🚀 Career OS
      </h1>

      <p className="mt-4 text-gray-400 max-w-xl mx-auto">
        Automate your job search with AI, track applications,
        and maximize your success rate.
      </p>

      <div className="mt-10 flex justify-center gap-4 flex-wrap">
        <Link href="/control">
          <button className="bg-blue-600 px-6 py-3 rounded-lg">
            Open Dashboard
          </button>
        </Link>

        <Link href="/hire/google">
          <button className="border px-6 py-3 rounded-lg">
            View Sample Page
          </button>
        </Link>
      </div>

      {/* 🔥 FEATURES */}
      <div className="mt-20 grid md:grid-cols-3 gap-6 px-6">
        <Card title="AI Job Scoring" desc="Get best jobs ranked automatically" />
        <Card title="Auto Apply" desc="Apply to top jobs automatically" />
        <Card title="CRM Tracking" desc="Track recruiters and responses" />
      </div>
    </div>
  )
}

function Card({ title, desc }: any) {
  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-400 text-sm mt-2">{desc}</p>
    </div>
  )
}
