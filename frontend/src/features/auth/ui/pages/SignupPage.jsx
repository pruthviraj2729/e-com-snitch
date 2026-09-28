import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import { useAuthForm } from '../../hooks/useAuthForm.js'

export default function SignupPage() {
  const { message, handleSubmit, isSubmitting } = useAuthForm('signup')

  return (
    <AuthLayout title="Make yourself at home." eyebrow="Create your customer account">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Your name<input type="text" name="name" autoComplete="name" placeholder="First and last name" required /></label>
        <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
        <label>Password<input type="password" name="password" autoComplete="new-password" placeholder="At least 8 characters" minLength={8} required /></label>
        <button className="button button-dark" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating account…' : 'Create account'} <span>↗</span></button>
        <p className="auth-message" aria-live="polite">{message}</p>
      </form>
      <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
    </AuthLayout>
  )
}