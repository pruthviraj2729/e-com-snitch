import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <section className="newsletter" id="newsletter">
      <div className="newsletter-copy">
        <p className="eyebrow">A little something, occasionally</p>
        <h2>Good things,<br /><em>in your inbox.</em></h2>
      </div>
      <div className="newsletter-form-wrap">
        <p>New pieces, thoughtful notes, and first access. Never noise.</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input id="newsletter-email" type="email" placeholder="Your email address" required disabled={subscribed} />
          <button type="submit" aria-label="Subscribe" disabled={subscribed}>
            {subscribed ? <Check size={18} /> : <ArrowRight size={18} />}
          </button>
        </form>
        <span className="newsletter-message" aria-live="polite">{subscribed ? 'You are on the list. Talk soon.' : 'By subscribing, you agree to our privacy policy.'}</span>
      </div>
    </section>
  )
}