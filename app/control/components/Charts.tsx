import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function Charts({ jobs }: any) {
  const data = jobs.map((j: any, i: number) => ({
    name: i,
    score: j.score || 0,
  }))

  return (
    <div className="mb-8 bg-white/5 p-5 rounded-xl">
      <h2 className="mb-4 text-lg">📊 Job Score Trend</h2>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="score" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
