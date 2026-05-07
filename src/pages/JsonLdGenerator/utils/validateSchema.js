import { SCHEMA_CONFIGS } from '../data/schemas'

export function validateSchema(type, values) {
  const config = SCHEMA_CONFIGS[type]
  if (!config) return { missing: [], warnings: [], isEligible: false }

  const missing  = []
  const warnings = []

  // Required fields from config
  config.fields.filter(f => f.required).forEach(f => {
    const val = values[f.key]
    if (val === undefined || val === null || val === '') {
      missing.push(f.label)
    }
  })

  // Special field validations
  if (config.specialField === 'faqItems') {
    const items = values.faqItems || []
    const valid = items.filter(i => i.question?.trim() && i.answer?.trim())
    if (!valid.length) missing.push('At least one question and answer')
  }

  if (config.specialField === 'breadcrumbItems') {
    const items = values.breadcrumbItems || []
    const valid = items.filter(i => i.name?.trim())
    if (valid.length < 2) missing.push('At least two breadcrumb items with names')
  }

  // Character limit warnings
  config.fields.filter(f => f.maxLength).forEach(f => {
    const len = values[f.key]?.length || 0
    if (len > f.maxLength) {
      warnings.push(`${f.label}: ${len} / ${f.maxLength} characters`)
    }
  })

  return {
    missing,
    warnings,
    isEligible: missing.length === 0,
  }
}
