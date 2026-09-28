import { ArrowUpRight } from 'lucide-react'

export default function Editorial() {
  return (
    <section className="editorial" id="story" aria-labelledby="story-title">
      <div className="editorial-image-wrap">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85"
          alt="Friends exploring the city in everyday, considered outfits"
          loading="lazy"
        />
        <span className="image-caption">A slower kind of getting dressed. / 07:14 AM</span>
      </div>
      <div className="editorial-copy">
        <p className="eyebrow">Our point of view / 001</p>
        <h2 id="story-title">Good clothes<br />make room for<br /><em>your life.</em></h2>
        <p>We make the things you reach for without thinking. Cut with intention, made in considered batches, and designed to stay long after the season moves on.</p>
        <a className="button button-outline" href="#newsletter">The Seven standard <ArrowUpRight size={16} /></a>
        <div className="editorial-note"><span>01</span><span>Fewer, better things. Always.</span></div>
      </div>
    </section>
  )
}