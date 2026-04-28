import './PageHeader.scss'

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="PageHeader">
      <h1 className="PageHeader__title">{title}</h1>
      {subtitle && <p className="PageHeader__subtitle">{subtitle}</p>}
    </div>
  )
}
