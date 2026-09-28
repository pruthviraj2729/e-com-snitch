import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import { useAuthForm } from '../../hooks/useAuthForm.js'

export default function LoginPage() {
  const { message, handleSubmit } = useAuthForm()

  return (
    <AuthLayout title="Welcome back." eyebrow="Your Seven account">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
        <label>Password<input type="password" name="password" autoComplete="current-password" placeholder="Your password" required /></label>
        <button className="button button-dark" type="submit">Log in <span>↗</span></button>
        <p className="auth-message" aria-live="polite">{message}</p>
      </form>
      <p className="auth-switch">New to Seven? <Link to="/signup">Create an account</Link></p>
    </AuthLayout>
  )
}