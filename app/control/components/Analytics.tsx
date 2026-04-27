export default function Analytics({ jobs }: any) {
  const total = jobs.length
  const applied = jobs.filter((j: any) => j.applied).length
  const conversion = total ? ((applied / total) * 100).toFixed(1) : 0

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <Card title="Total Jobs" value={total} />
      <Card title="Applied" value={applied} color="green" />
      <Card title="Conversion" value={`${conversion}%`} color="blue" />
    </div>
  )
}

function Card({ title, value, color = "white" }: any) {
  return (
    <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-center">
      <p className="text-gray-400">{title}</p>
      <p className={`text-2xl text-${color}-400 font-bold`}>{value}</p>
    </div>
  )
}
