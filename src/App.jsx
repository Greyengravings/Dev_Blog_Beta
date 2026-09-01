import { useState } from 'react'
import './App.css'

const endpoint = import.meta.env.VITE_GOOGLE_SHEET_ENDPOINT || 'https://script.google.com/macros/s/AKfycbwNEGKfVrm-aJtQAkrOydiXrscHA8DuCSO8n7itpnWHrur1-fuOVBa3TLfkj_LjTHdV/exec'
const testAreas = [
  { id: 'ui', label: 'Interface & UI', note: 'Visual polish, navigation, accessibility' },
  { id: 'speed', label: 'Speed', note: 'Load times, interactions, responsiveness' },
  { id: 'backend', label: 'Backend', note: 'APIs, auth, error handling' },
  { id: 'database', label: 'Database', note: 'Data integrity, edge cases, scale' },
]
const previewFeatures = [
  { icon: '↯', title: 'Performance', note: 'Loading speed and image responsiveness.' },
  { icon: '▣', title: 'Design', note: 'Consistency, readability, and dark mode.' },
  { icon: '▯', title: 'Responsive', note: 'A perfect experience on every device.' },
]

function App() {
  const [showForm, setShowForm] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ username: '', email: '', phone: '', areas: [], consent: false })

  const updateField = (event) => {
    const { name, value, checked, type } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const toggleArea = (id) => setForm((current) => ({ ...current, areas: current.areas.includes(id) ? current.areas.filter((area) => area !== id) : [...current.areas, id] }))

  const submitForm = async (event) => {
    event.preventDefault()
    setError('')
    if (!form.areas.length) return setError('Choose at least one area you would like to test.')
    if (!endpoint) return setError('The sheet connection is not configured yet. Add VITE_GOOGLE_SHEET_ENDPOINT to your .env file.')
    try {
      await fetch(endpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ ...form, areas: form.areas.join(', '), submittedAt: new Date().toISOString() }) })
      setSubmitted(true)
    } catch { setError('Something went wrong while sending your details. Please try again.') }
  }

  return (
    <main><nav className="nav shell"><a className="brand" href="#top"><span className="brand-mark">b.</span><span>the developer's blog</span></a><div className="nav-links"><a href="#why">Why beta?</a><a href="#focus">Test areas</a><a href="#footer">About</a></div><button className="nav-cta" type="button" onClick={() => setShowForm(true)}>Join beta <span>↗</span></button></nav>
      <section className="hero shell" id="top"><div className="hero-copy"><p className="eyebrow"><span className="live-dot" /> private preview · 2026</p><h1>Beta testing,<br /><em>with intent.</em></h1><p className="hero-text">Help shape the next version of a space built for curious builders. Find the rough edges, test the good stuff, and make it yours.</p><button className="primary-cta" type="button" onClick={() => setShowForm(true)}>Join the beta <span>↗</span></button><p className="microcopy">Takes 2 minutes · No spam, ever</p></div><div className="hero-art"><div className="art-label">BUILD / OBSERVE / REFINE</div><div className="terminal-window"><div className="window-bar"><span /><span /><span /><b>beta.log</b></div><div className="terminal-content"><p><i>01</i> <strong>const</strong> <b>nextVersion</b> = <mark>'in progress'</mark></p><p><i>02</i> </p><p><i>03</i> <strong>await</strong> <b>yourFeedback</b>({'{'}</p><p><i>04</i> &nbsp;&nbsp;makeIt <mark>useful</mark>,</p><p><i>05</i> &nbsp;&nbsp;makeIt <mark>fast</mark>,</p><p><i>06</i> &nbsp;&nbsp;makeIt <mark>yours</mark></p><p><i>07</i> {'}'})</p><p><i>08</i> <span className="cursor" /></p></div></div><div className="art-stamp">EST.<br /><strong>2026</strong></div></div></section>
      <section className="preview-addition shell" id="preview"><p className="eyebrow">A better way to build</p><h2>Help us build <em>smarter content<br />systems.</em></h2><p className="preview-copy">You're among the first people getting access to our upcoming platform. Before we launch publicly, we're inviting a small group of users to experience the product and help us create something genuinely loved.</p><div className="preview-actions"><button className="primary-cta" type="button" onClick={() => setShowForm(true)}>Join Beta <span>↗</span></button><a className="secondary-cta" href="#why">Learn More</a></div><div className="preview-features">{previewFeatures.map((feature) => <article key={feature.title}><span className="feature-icon">{feature.icon}</span><h3>{feature.title}</h3><p>{feature.note}</p></article>)}</div></section>
      <section className="ticker"><div className="shell ticker-inner"><span>FEATURED</span><span>THE DEVELOPER'S BLOG</span><span>FEATURED</span><span>THE DEVELOPER'S BLOG</span></div></section>
      <section className="why shell" id="why"><div className="section-intro"><p className="eyebrow">01 / the why</p><h2>Good products are<br /><em>made in public.</em></h2></div><div className="why-copy"><p>We are opening the doors early because the best ideas get better when they meet real people. Your perspective helps us turn a promising build into a dependable daily tool.</p><div className="stats"><div><strong>01</strong><span>Early access<br />to every release</span></div><div><strong>02</strong><span>A direct line<br />to the builders</span></div></div></div></section>
      <section className="focus shell" id="focus"><div className="section-intro"><p className="eyebrow">02 / your brief</p><h2>Test what<br /><em>matters.</em></h2></div><div className="focus-grid">{testAreas.map((area, index) => <article className="focus-item" key={area.id}><span>0{index + 1}</span><h3>{area.label}</h3><p>{area.note}</p><b>→</b></article>)}</div></section>
      <footer className="footer shell" id="footer"><div className="footer-brand"><span className="brand-mark">b.</span><p>A dedicated space for<br />modern software thinking.</p></div><div><p className="eyebrow">Stay in the loop</p><a href="mailto:hello@thedevelopersblog.dev">hello@thedevelopersblog.dev ↗</a></div><div className="footer-note">© 2026 The Developer's Blog<br /><a href="#terms" onClick={(event) => { event.preventDefault(); setShowTerms(true) }}>Terms & privacy</a></div></footer>
      {showForm && <div className="modal-backdrop"><div className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title"><button className="close-button" type="button" aria-label="Close form" onClick={() => setShowForm(false)}>×</button>{submitted ? <div className="success"><span>✓</span><h2>You're on the list.</h2><p>Thanks for helping us make the next version better. We will be in touch soon.</p><button className="primary-cta" type="button" onClick={() => setShowForm(false)}>Close</button></div> : <><p className="eyebrow">03 / join the preview</p><h2 id="form-title">Let's build it<br /><em>together.</em></h2><form onSubmit={submitForm}><label>Username<input name="username" value={form.username} onChange={updateField} placeholder="your-handle" required /></label><label>Email address<input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" required /></label><label>Phone number<input name="phone" type="tel" value={form.phone} onChange={updateField} placeholder="+91 00000 00000" required /></label><fieldset><legend>What would you like to test?</legend><div className="area-options">{testAreas.map((area) => <button className={form.areas.includes(area.id) ? 'area-option selected' : 'area-option'} type="button" key={area.id} onClick={() => toggleArea(area.id)}>{area.label}<span>{form.areas.includes(area.id) ? '✓' : '+'}</span></button>)}</div></fieldset><label className="consent"><input name="consent" type="checkbox" checked={form.consent} onChange={updateField} required /><span>I agree to the <button type="button" onClick={() => setShowTerms(true)}>terms and privacy policy</button>.</span></label>{error && <p className="form-error">{error}</p>}<button className="primary-cta submit" type="submit">Send my details <span>↗</span></button></form></>}</div></div>}
      {showTerms && <div className="modal-backdrop"><div className="modal terms" role="dialog" aria-modal="true" aria-labelledby="terms-title"><button className="close-button" type="button" aria-label="Close terms" onClick={() => setShowTerms(false)}>×</button><p className="eyebrow">Terms / privacy</p><h2 id="terms-title">A clear<br /><em>understanding.</em></h2><p>By joining the beta, you agree that we may use the details you submit to contact you about beta access, feedback sessions, and product updates. We will not sell your information or use it for unrelated marketing.</p><p>You can request removal of your details at any time by emailing hello@thedevelopersblog.dev. Beta access may change as the product evolves.</p><button className="primary-cta" type="button" onClick={() => setShowTerms(false)}>Back to form</button></div></div>}
    </main>
  )
}

export default App
