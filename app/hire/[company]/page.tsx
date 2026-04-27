export default async function CompanyPage({ params }: any) {
  const resolved = await params
  const company = resolved.company

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold">
        Company: {company}
      </h1>

      <p className="mt-4">
        IAM / PIAM Business Analyst
      </p>
    </div>
  )
}
