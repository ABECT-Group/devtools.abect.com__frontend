import { buildPageUrl } from '../../../config/site.js'

export const OG_IMAGE = 'https://devtools.abect.com/seo/ai-og.jpg'

export function buildHelmet() {
  return {
    title:       'Lora — Skill-Guided AI Assistant for Developers | Abect',
    description: 'Lora is a skill-guided AI assistant for developers. Plain English in — accurate, structured output out. Free plan: 100K tokens/month, no credit card.',
    subtitle:    'Type in plain English — Lora\'s developer skills turn it into accurate, structured output. Ready to copy.',
    url:          buildPageUrl('ai'),
  }
}
