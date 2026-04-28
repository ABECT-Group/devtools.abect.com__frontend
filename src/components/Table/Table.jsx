import './Table.scss'

export default function Table({ columns, note, children }) {
  return (
    <div className="Table">
      <div className="Table__wrap">
        <table className="Table__table">
          <thead>
            <tr>
              {columns.map((col, i) => <th key={i}>{col}</th>)}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {note && <p className="Table__note">{note}</p>}
    </div>
  )
}
