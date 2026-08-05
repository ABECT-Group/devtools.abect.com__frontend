import { buildPageUrl } from '../../../config/site.js'

const URL = buildPageUrl('ai')

export function buildJsonLdApp() {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebApplication',
    name:       'Lora — Skill-Guided AI Assistant | Abect Dev Tools',
    url:        URL,
    applicationCategory: 'DeveloperApplication',
    operatingSystem:     'Any',
    browserRequirements: 'Requires JavaScript',
    description: 'Lora is a skill-guided AI assistant for developers — describe your task in plain English and get accurate, validated output. No hallucinated fields, no generic guessing.',
    featureList: [
      'Natural-language input — no forms to fill',
      'Skill-guided output — validated, no hallucinated fields',
      'Multi-turn conversations with full context memory',
      'Copy-ready output, instantly',
      'Conversation history saved to your account',
    ],
    offers: {
      '@type':        'Offer',
      price:          '0',
      priceCurrency:  'USD',
      description:    'Free plan: 100,000 tokens/month. No credit card required.',
    },
    provider: {
      '@type': 'Organization',
      name:    'Abect Dev Tools',
      url:     'https://devtools.abect.com',
    },
  }
}

// BreadcrumbList is generated site-wide in Layout from tools.js — see config/schema.js

export function buildJsonLdFaq(faq) {
  return {
    '@context':   'https://schema.org',
    '@type':      'FAQPage',
    mainEntity:   faq.map(item => ({
      '@type': 'Question',
      name:    item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
