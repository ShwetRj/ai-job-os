export default function CRMPanel({ jobs }: any) {
  const recruiters = jobs.filter((j: any) => j.recruiter_email)

  return (
    <div className="bg-white/5 p-6 rounded-xl">
      <h2 className="text-xl mb-4">📩 Recruiter CRM</h2>

      {recruiters.map((j: any) => (
        <div key={j.id} className="border-b border-gray-700 py-3">
          <p className="font-semibold">{j.company}</p>
          <p className="text-sm text-gray-400">{j.recruiter_email}</p>
        </div>
      ))}
    </div>
  )
}
