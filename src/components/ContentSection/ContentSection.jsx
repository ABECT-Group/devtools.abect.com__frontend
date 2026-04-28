import './ContentSection.scss'

export default function ContentSection({ title, children }) {
  return (
    <section className="ContentSection">
      <h2 className="ContentSection__title">{title}</h2>
      {children}
    </section>
  )
}
