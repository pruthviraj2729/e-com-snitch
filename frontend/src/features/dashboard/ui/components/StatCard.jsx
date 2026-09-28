export default function StatCard({ label, value, detail }) {
  return (
    <article className="dashboard-stat">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  )
}