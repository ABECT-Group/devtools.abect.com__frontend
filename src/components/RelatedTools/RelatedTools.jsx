import { Link } from 'react-router-dom'
import './RelatedTools.scss'

export default function RelatedTools({ items }) {
  return (
    <nav className="RelatedTools">
      <h2 className="RelatedTools__title">Related tools</h2>
      <div className="RelatedTools__grid">
        {items.map(({ to, name, desc }) => (
          <Link key={to} to={to} className="RelatedTools__card">
            <span className="RelatedTools__name">{name}</span>
            <span className="RelatedTools__desc">{desc}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
