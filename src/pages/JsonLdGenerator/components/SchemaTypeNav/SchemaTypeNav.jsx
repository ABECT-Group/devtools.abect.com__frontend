import { Link } from 'react-router-dom'
import { SCHEMA_CONFIGS, SCHEMA_TYPE_KEYS } from '../../data/schemas'
import { TYPE_TO_SLUG } from '../../data/helmet'
import './SchemaTypeNav.scss'

export default function SchemaTypeNav({ activeType }) {
  return (
    <div className="SchemaTypeNav">
      <div className="SchemaTypeNav__tabs">
        {SCHEMA_TYPE_KEYS.map(key => (
          <Link
            key={key}
            to={`/${TYPE_TO_SLUG[key]}`}
            className={`SchemaTypeNav__tab${activeType === key ? ' SchemaTypeNav__tab--active' : ''}`}
          >
            {SCHEMA_CONFIGS[key].label}
          </Link>
        ))}
      </div>
      <p className="SchemaTypeNav__desc">{SCHEMA_CONFIGS[activeType].description}</p>
    </div>
  )
}
