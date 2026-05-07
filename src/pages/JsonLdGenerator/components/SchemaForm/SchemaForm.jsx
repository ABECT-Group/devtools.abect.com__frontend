import { useState, useEffect } from 'react'
import Tooltip from '../../../../components/Tooltip/Tooltip'
import './SchemaForm.scss'

// ─── Primitive field renderers ─────────────────────────────────────────────────

function TextField({ field, value, onChange }) {
  const val = value || ''
  return (
    <div className="SchemaForm__field">
      <div className="SchemaForm__label-row">
        <label className="SchemaForm__label">
          {field.label}
          {field.required && <span className="SchemaForm__required" aria-label="required">*</span>}
          {field.tooltip && <Tooltip>{field.tooltip}</Tooltip>}
        </label>
        {field.maxLength && (
          <span className={`SchemaForm__counter${val.length > field.maxLength ? ' SchemaForm__counter--warn' : ''}`}>
            {val.length}/{field.maxLength}
          </span>
        )}
      </div>
      {field.inputType === 'textarea' ? (
        <textarea
          className="SchemaForm__textarea"
          value={val}
          onChange={e => onChange(field.key, e.target.value)}
          placeholder={field.placeholder || ''}
          rows={3}
        />
      ) : (
        <input
          type={field.inputType === 'url' ? 'url' : field.inputType === 'number' ? 'number' : field.inputType === 'date' ? 'date' : 'text'}
          className="SchemaForm__input"
          value={val}
          onChange={e => onChange(field.key, e.target.value)}
          placeholder={field.placeholder || ''}
          min={field.min}
          max={field.max}
          step={field.step}
        />
      )}
      {field.hint && <p className="SchemaForm__hint">{field.hint}</p>}
    </div>
  )
}

function SelectField({ field, value, onChange }) {
  return (
    <div className="SchemaForm__field">
      <label className="SchemaForm__label">
        {field.label}
        {field.required && <span className="SchemaForm__required" aria-label="required">*</span>}
        {field.tooltip && <Tooltip>{field.tooltip}</Tooltip>}
      </label>
      <select
        className="SchemaForm__select"
        value={value || ''}
        onChange={e => onChange(field.key, e.target.value)}
      >
        <option value="">— select —</option>
        {field.options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {field.hint && <p className="SchemaForm__hint">{field.hint}</p>}
    </div>
  )
}

function ArrayField({ field, value, onChange }) {
  const items = value || ['']

  function handleItemChange(i, v) {
    const next = [...items]
    next[i] = v
    onChange(field.key, next)
  }

  function addItem() {
    onChange(field.key, [...items, ''])
  }

  function removeItem(i) {
    onChange(field.key, items.filter((_, j) => j !== i))
  }

  return (
    <div className="SchemaForm__field">
      <label className="SchemaForm__label">
        {field.label}
        {field.tooltip && <Tooltip>{field.tooltip}</Tooltip>}
      </label>
      <div className="SchemaForm__array">
        {items.map((item, i) => (
          <div key={i} className="SchemaForm__array-row">
            <input
              type={field.key.includes('url') || field.key === 'sameAs' ? 'url' : 'text'}
              className="SchemaForm__input SchemaForm__input--array"
              value={item}
              onChange={e => handleItemChange(i, e.target.value)}
              placeholder={field.placeholder || ''}
            />
            {items.length > 1 && (
              <button
                type="button"
                className="SchemaForm__array-remove"
                onClick={() => removeItem(i)}
                aria-label="Remove"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button type="button" className="SchemaForm__array-add" onClick={addItem}>
          + Add
        </button>
      </div>
      {field.hint && <p className="SchemaForm__hint">{field.hint}</p>}
    </div>
  )
}

// ─── Special: FAQ items ────────────────────────────────────────────────────────

function FaqItemsField({ value, onChange }) {
  const items = value || [{ id: crypto.randomUUID(), question: '', answer: '' }]

  function updateItem(id, key, val) {
    onChange('faqItems', items.map(i => i.id === id ? { ...i, [key]: val } : i))
  }

  function addItem() {
    onChange('faqItems', [...items, { id: crypto.randomUUID(), question: '', answer: '' }])
  }

  function removeItem(id) {
    if (items.length <= 1) return
    onChange('faqItems', items.filter(i => i.id !== id))
  }

  return (
    <div className="SchemaForm__faq">
      <label className="SchemaForm__label">
        FAQ Items
        <span className="SchemaForm__required" aria-label="required">*</span>
      </label>
      <div className="SchemaForm__faq-list">
        {items.map((item, idx) => (
          <div key={item.id} className="SchemaForm__faq-item">
            <div className="SchemaForm__faq-item-header">
              <span className="SchemaForm__faq-item-num">Q{idx + 1}</span>
              {items.length > 1 && (
                <button
                  type="button"
                  className="SchemaForm__faq-remove"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove question"
                >
                  ×
                </button>
              )}
            </div>
            <input
              type="text"
              className="SchemaForm__input"
              value={item.question}
              onChange={e => updateItem(item.id, 'question', e.target.value)}
              placeholder="What is the question?"
            />
            <textarea
              className="SchemaForm__textarea SchemaForm__textarea--faq"
              value={item.answer}
              onChange={e => updateItem(item.id, 'answer', e.target.value)}
              placeholder="Write the full answer..."
              rows={2}
            />
          </div>
        ))}
      </div>
      <button type="button" className="SchemaForm__add-btn" onClick={addItem}>
        + Add question
      </button>
      <p className="SchemaForm__hint">Minimum 1 question + answer required. The content must be visible on the page — Google rejects FAQ schema if questions are not displayed to users.</p>
    </div>
  )
}

// ─── Special: Breadcrumb items ─────────────────────────────────────────────────

function BreadcrumbItemsField({ value, onChange }) {
  const defaults = [
    { id: crypto.randomUUID(), name: 'Home', url: '' },
    { id: crypto.randomUUID(), name: '', url: '' },
  ]
  const items = value || defaults

  function updateItem(id, key, val) {
    onChange('breadcrumbItems', items.map(i => i.id === id ? { ...i, [key]: val } : i))
  }

  function addItem() {
    onChange('breadcrumbItems', [...items, { id: crypto.randomUUID(), name: '', url: '' }])
  }

  function removeItem(id) {
    if (items.length <= 2) return
    onChange('breadcrumbItems', items.filter(i => i.id !== id))
  }

  return (
    <div className="SchemaForm__breadcrumb">
      <label className="SchemaForm__label">
        Breadcrumb items
        <span className="SchemaForm__required" aria-label="required">*</span>
      </label>
      <div className="SchemaForm__breadcrumb-list">
        {items.map((item, idx) => (
          <div key={item.id} className="SchemaForm__breadcrumb-item">
            <span className="SchemaForm__breadcrumb-pos">{idx + 1}</span>
            <div className="SchemaForm__breadcrumb-fields">
              <input
                type="text"
                className="SchemaForm__input"
                value={item.name}
                onChange={e => updateItem(item.id, 'name', e.target.value)}
                placeholder="Name (e.g. Home)"
              />
              <input
                type="url"
                className="SchemaForm__input"
                value={item.url}
                onChange={e => updateItem(item.id, 'url', e.target.value)}
                placeholder={idx === items.length - 1 ? 'URL (optional for last item)' : 'https://example.com/...'}
              />
            </div>
            {items.length > 2 && (
              <button
                type="button"
                className="SchemaForm__array-remove"
                onClick={() => removeItem(item.id)}
                aria-label="Remove"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      <button type="button" className="SchemaForm__add-btn" onClick={addItem}>
        + Add item
      </button>
      <p className="SchemaForm__hint">Minimum 2 items required. Position is set automatically. URL is optional for the last (current) item.</p>
    </div>
  )
}

// ─── Field dispatcher ──────────────────────────────────────────────────────────

function renderField(field, values, onChange) {
  if (field.inputType === 'select') return <SelectField key={field.key} field={field} value={values[field.key]} onChange={onChange} />
  if (field.inputType === 'array')  return <ArrayField  key={field.key} field={field} value={values[field.key]} onChange={onChange} />
  return <TextField key={field.key} field={field} value={values[field.key]} onChange={onChange} />
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function SchemaForm({ config, values, onChange }) {
  const [collapsed, setCollapsed] = useState(() => new Set(config.collapsedGroups || []))

  useEffect(() => {
    setCollapsed(new Set(config.collapsedGroups || []))
  }, [config])

  function toggleGroup(name) {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const groups = []
  const seen = new Set()

  config.fields.forEach(field => {
    const g = field.group || '__root__'
    if (!seen.has(g)) {
      seen.add(g)
      groups.push({ name: g, fields: [] })
    }
    groups.find(gr => gr.name === g).fields.push(field)
  })

  return (
    <div className="SchemaForm">
      {config.specialField === 'faqItems' && (
        <div className="SchemaForm__group">
          <FaqItemsField value={values.faqItems} onChange={onChange} />
        </div>
      )}

      {config.specialField === 'breadcrumbItems' && (
        <div className="SchemaForm__group">
          <BreadcrumbItemsField value={values.breadcrumbItems} onChange={onChange} />
        </div>
      )}

      {groups.map(group => {
        const isCollapsible = config.collapsedGroups?.includes(group.name)
        const isCollapsed = isCollapsible && collapsed.has(group.name)

        return (
          <div key={group.name} className={`SchemaForm__group${isCollapsed ? ' SchemaForm__group--collapsed' : ''}`}>
            {group.name !== '__root__' && (
              isCollapsible ? (
                <button
                  type="button"
                  className="SchemaForm__group-toggle"
                  onClick={() => toggleGroup(group.name)}
                  aria-expanded={!isCollapsed}
                >
                  <span className="SchemaForm__group-label">{group.name}</span>
                  <svg
                    className={`SchemaForm__group-chevron${!isCollapsed ? ' SchemaForm__group-chevron--open' : ''}`}
                    width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                  >
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ) : (
                <div className="SchemaForm__group-label">{group.name}</div>
              )
            )}
            {!isCollapsed && group.fields.map(field => renderField(field, values, onChange))}
          </div>
        )
      })}
    </div>
  )
}
