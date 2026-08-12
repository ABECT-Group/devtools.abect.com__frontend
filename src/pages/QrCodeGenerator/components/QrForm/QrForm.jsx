import { useState } from 'react'
import Tooltip from '../../../../components/Tooltip/Tooltip'
import './QrForm.scss'

function FieldLabel({ field }) {
  return (
    <label className="QrForm__label" htmlFor={`qr-${field.key}`}>
      {field.label}
      {field.required && <span className="QrForm__required" aria-label="required">*</span>}
      {field.tooltip && <Tooltip>{field.tooltip}</Tooltip>}
    </label>
  )
}

function TextField({ field, value, onChange }) {
  const val = value || ''
  const inputType = field.inputType === 'url' ? 'url'
    : field.inputType === 'email' ? 'email'
      : field.inputType === 'tel' ? 'tel'
        : field.inputType === 'number' ? 'number'
          : field.inputType === 'date' ? 'date'
            : field.inputType === 'time' ? 'time'
              : 'text'

  return (
    <div className="QrForm__field">
      <div className="QrForm__label-row">
        <FieldLabel field={field} />
        {field.maxLength && (
          <span className={`QrForm__counter${val.length > field.maxLength ? ' QrForm__counter--warn' : ''}`}>
            {val.length}/{field.maxLength}
          </span>
        )}
      </div>
      {field.inputType === 'textarea' ? (
        <textarea
          id={`qr-${field.key}`}
          className="QrForm__textarea"
          value={val}
          onChange={e => onChange(field.key, e.target.value)}
          placeholder={field.placeholder || ''}
          rows={3}
        />
      ) : (
        <input
          id={`qr-${field.key}`}
          type={inputType}
          className="QrForm__input"
          value={val}
          onChange={e => onChange(field.key, e.target.value)}
          placeholder={field.placeholder || ''}
        />
      )}
      {field.hint && <p className="QrForm__hint">{field.hint}</p>}
    </div>
  )
}

function SelectField({ field, value, onChange }) {
  return (
    <div className="QrForm__field">
      <FieldLabel field={field} />
      <select
        id={`qr-${field.key}`}
        className="QrForm__select"
        value={value ?? field.options[0].value}
        onChange={e => onChange(field.key, e.target.value)}
      >
        {field.options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {field.hint && <p className="QrForm__hint">{field.hint}</p>}
    </div>
  )
}

function CheckboxField({ field, value, onChange }) {
  return (
    <div className="QrForm__field">
      <label className="QrForm__checkbox">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={e => onChange(field.key, e.target.checked)}
        />
        <span>{field.label}</span>
        {field.tooltip && <Tooltip>{field.tooltip}</Tooltip>}
      </label>
      {field.hint && <p className="QrForm__hint">{field.hint}</p>}
    </div>
  )
}

function renderField(field, values, onChange) {
  if (field.inputType === 'select') {
    return <SelectField key={field.key} field={field} value={values[field.key]} onChange={onChange} />
  }
  if (field.inputType === 'checkbox') {
    return <CheckboxField key={field.key} field={field} value={values[field.key]} onChange={onChange} />
  }
  return <TextField key={field.key} field={field} value={values[field.key]} onChange={onChange} />
}

/** Groups fields by their `group` key, preserving config order. */
function groupFields(fields) {
  const groups = []
  const index = new Map()

  for (const field of fields) {
    const name = field.group ?? null
    if (!index.has(name)) {
      index.set(name, { name, fields: [] })
      groups.push(index.get(name))
    }
    index.get(name).fields.push(field)
  }
  return groups
}

function FieldGroup({ group, values, onChange, defaultCollapsed }) {
  const [open, setOpen] = useState(!defaultCollapsed)

  if (!group.name) {
    return (
      <div className="QrForm__group">
        {group.fields.map(field => renderField(field, values, onChange))}
      </div>
    )
  }

  return (
    <div className="QrForm__group">
      <button
        type="button"
        className="QrForm__group-toggle"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <span className="QrForm__group-label">{group.name}</span>
        <svg
          className={`QrForm__group-chevron${open ? ' QrForm__group-chevron--open' : ''}`}
          viewBox="0 0 14 14" width="14" height="14" fill="none" aria-hidden="true"
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && group.fields.map(field => renderField(field, values, onChange))}
    </div>
  )
}

export default function QrForm({ config, values, onChange }) {
  const groups = groupFields(config.fields)
  const collapsed = new Set(config.collapsedGroups ?? [])

  return (
    <div className="QrForm">
      {groups.map((group, i) => (
        <FieldGroup
          key={group.name ?? `_${i}`}
          group={group}
          values={values}
          onChange={onChange}
          defaultCollapsed={collapsed.has(group.name)}
        />
      ))}
    </div>
  )
}
