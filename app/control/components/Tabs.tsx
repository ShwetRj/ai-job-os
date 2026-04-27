export default function Tabs({ tab, setTab, jobs }: any) {
  return (
    <div className="flex gap-4 mb-6">
      <button onClick={() => setTab("new")}>New</button>
      <button onClick={() => setTab("applied")}>Applied</button>
      <button onClick={() => setTab("crm")}>CRM</button>
    </div>
  )
}
