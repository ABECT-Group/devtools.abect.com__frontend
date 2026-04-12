import './FAQ.scss'

export default function FAQ({ items }) {
  return (
    <section className="FAQ">
      <h2 className="FAQ__title">Frequently Asked Questions</h2>
      <div className="FAQ__list">
        {items.map((item, i) => (
          <details key={i} className="FAQ__item">
            <summary className="FAQ__question">
              <span>{item.question}</span>
              <svg className="FAQ__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="FAQ__body">
              <div className="FAQ__answer">{item.answer}</div>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
