import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDashboard } from '../../hooks/useDashboard.js'
import StatCard from '../components/StatCard.jsx'

export default function DashboardPage() {
  const summary = useDashboard()

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <Link className="wordmark" to="/">SEVEN<span>.</span></Link>
        <Link className="dashboard-store-link" to="/"><ArrowLeft size={15} /> Back to store</Link>
      </header>
      <section className="dashboard-content">
        <p className="eyebrow">Your account / Overview</p>
        <h1>A good day<br />to be <em>you.</em></h1>
        <p className="dashboard-intro">Your Seven account is ready to make getting dressed a little easier.</p>
        <div className="dashboard-stats">
          <StatCard label="Orders" value={summary.orders} detail="Your order history" />
          <StatCard label="Saved pieces" value={summary.savedItems} detail="The pieces you love" />
          <StatCard label="Studio rewards" value={summary.rewards} detail="Points to your next reward" />
        </div>
        <Link className="button button-dark" to="/">Find your next favorite <ArrowUpRight size={16} /></Link>
      </section>
      <footer className="dashboard-footer">SEVEN STUDIO <span>Made with intention.</span></footer>
    </main>
  )
}