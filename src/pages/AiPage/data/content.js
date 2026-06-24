export function buildContent() {
  return {
    howToSteps: [
      'Create a free account — get 100,000 tokens per month at no cost. No credit card required.',
      'Describe what you need in plain English — no forms to fill, no dropdowns to configure. The AI understands context.',
      'Select a skill below the input for specialized output — Product Schema, Article Schema, and more coming soon.',
      'Copy the result and paste it directly into your page or codebase.',
    ],
    sections: [
      {
        heading: 'Why Lora produces better structured data than general AI',
        blocks: [
          {
            type: 'p',
            text: 'General-purpose AI models (ChatGPT, Gemini, Claude) hallucinate on structured tasks — wrong property names, missing required fields, incorrect price formats, properties that do not exist in the schema.org spec. Paste the result into Google\'s Rich Results Test and it fails.',
          },
          {
            type: 'p',
            text: 'The reason is that large language models are optimized for breadth — they handle millions of tasks reasonably well, but the tradeoff is precision on structured, rule-bound output. A model trained on everything from poetry to Python cannot reliably follow the exact field names, URI formats, and validation rules of a specific standard like schema.org.',
          },
          {
            type: 'ul',
            items: [
              '**No hallucinated fields** — the AI only outputs properties that actually exist in the spec',
              '**Google-compliant output** — structured data passes Rich Results Test validation',
              '**Multi-turn refinement** — describe your content, then refine it in follow-up messages',
              '**Free to start** — 100K tokens/month on the free plan, no credit card required',
            ],
          },
          {
            type: 'table',
            columns: ['', 'Lora', 'ChatGPT', 'Gemini', 'Claude'],
            rows: [
              { cells: ['Skill-oriented assistant', '✓ Skill-guided output', '✗ Generic only', '✗ Generic only', '✗ Generic only'], highlight: true },
              { cells: ['Skill validation', '✓ Server-enforced', '✗', '✗', '✗'], highlight: true },
              { cells: ['Specialized skills', '✓ Schema, SEO (growing)', '✗ Generic prompting only', '✗ Generic prompting only', '✗ Generic prompting only'], highlight: true },
              { cells: ['Free plan', '100K tokens/month', 'GPT-3.5 limited', 'Basic tier', 'Very limited'], highlight: true },
              { cells: ['Image generation', '✗', '✓ DALL-E 3', '✓ Imagen', '✗'], highlight: false },
              { cells: ['Web / real-time search', '✗', '✓', '✓ Google Search', '✗'], highlight: false },
              { cells: ['Code', 'Basic', 'Strong', 'Good', '✓ Best-in-class'], highlight: false },
              { cells: ['Cost for heavy use', 'Low', 'High', 'Medium', 'High'], highlight: false },
            ],
            note: '✓ = strength for that category  ✗ = not available or not the right tool',
          },
          {
            type: 'p',
            text: 'Use **Lora** when you need structured, validated output from a task-specific skill — no hallucinated fields, no generic guessing. Use **ChatGPT** for image generation or plugin-extended workflows. Use **Gemini** when your task requires real-time web research and Google data. Use **Claude** for complex code review, long-document analysis, or high-quality content writing.',
          },
        ],
      },
      {
        heading: 'Available AI skills',
        blocks: [
          {
            type: 'p',
            text: 'Select a skill chip below the input to activate specialized mode. Each skill loads a custom AI model and a precise system prompt built for that specific task — the AI stays focused on the task instead of guessing from a generic instruction.',
          },
          {
            type: 'ul',
            items: [
              '**Product Schema** — guided conversation that collects product data step by step and outputs a complete, valid schema.org/Product JSON-LD block. Covers name, price, availability, brand, ratings, shipping, and return policy. Minimum required for Google Rich Results eligibility: name + price + currency + availability.',
              '**JSX ↔ HTML** — converts React JSX to plain HTML and HTML back to JSX. Auto-detects direction from your input. Handles className/class, camelCase props, style objects, SVG attributes, boolean attributes, fragments, and event handlers. Outputs the full conversion with notes on anything that needed special handling.',
            ],
          },
        ],
      },
      {
        heading: 'Privacy',
        blocks: [
          {
            type: 'p',
            text: 'Your input is sent to the **DeepSeek API** for processing. Do not include personal data, internal pricing strategy, confidential sourcing, or employee information. Treat Lora like a public search engine — describe your content as it would appear publicly.',
          },
        ],
      },
      {
        heading: 'Token usage',
        blocks: [
          {
            type: 'p',
            text: 'Token usage is based on actual DeepSeek processing — both your input and the AI\'s output count. A typical product schema generation uses **300–600 tokens** per turn. Free accounts receive **100,000 tokens per month** — enough for hundreds of generations. Tokens reset monthly. Check your balance in **Profile → Usage**.',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'What AI skills are available?',
        answer: 'Currently: Product Schema (generates valid schema.org/Product JSON-LD). Article Schema, FAQ Schema, and LocalBusiness Schema AI skills are in development. Select a skill via the chips below the input.',
      },
      {
        question: 'What are tokens and how are they counted?',
        answer: 'Tokens are units of text processed by the AI. Both your input and the AI\'s output count toward your monthly balance. On average, 1 token ≈ 0.75 words. A typical schema generation uses 300–800 tokens.',
      },
      {
        question: 'Do I need an account to use Lora?',
        answer: 'Yes — Lora requires a free account because it consumes server-side compute. The free plan gives you 100,000 tokens per month at no cost. No credit card required. All image converters, text converters, and form-based schema generators work without an account.',
      },
      {
        question: 'Does my token balance reset every month?',
        answer: 'Yes. Your token balance resets to your plan limit on the same calendar day each month. Unused tokens do not roll over.',
      },
      {
        question: 'Can I refine the output by replying in chat?',
        answer: 'Yes. Each conversation keeps history. After the initial generation, reply with adjustments: "change availability to out of stock", "add brand: Samsung", "include free shipping to the US". Each reply updates the result based on the full conversation context.',
      },
      {
        question: 'What happens to my conversations after I close the browser?',
        answer: 'Conversations are saved to your account and accessible via the sidebar in AI mode. You can resume any previous conversation or start a new one at any time.',
      },
      {
        question: 'Is the generated schema valid?',
        answer: 'The model is prompted to produce schema.org-compliant JSON-LD. Always validate with the Google Rich Results Test or Schema.org Validator before deploying to confirm field accuracy and Rich Results eligibility.',
      },
      {
        question: 'Is my content sent to a third party?',
        answer: 'AI inference is handled server-side by our backend via the DeepSeek API. Your input is processed to generate the response. We do not sell, share, or log your content for advertising or training purposes.',
      },
      {
        question: 'What happens if I run out of tokens?',
        answer: 'AI generation is blocked until your monthly token balance resets. Check your remaining balance and reset date in Profile → Usage.',
      },
      {
        question: 'How does the AI avoid hallucinating schema fields?',
        answer: 'Each skill is built around a detailed system prompt that defines exactly which fields exist in the spec, what values are valid, and the required format for every property — including all schema.org enum URIs. The AI operates within these constraints and cannot invent a field that does not exist. For Product Schema, the system prompt includes the full schema.org/Product definition, all valid enum values with their exact URI format, and validation rules that match Google\'s Rich Results Test requirements.',
      },
    ],
    relatedTools: [
      { to: '/product-schema-generator',   name: 'Product Schema Generator',   desc: 'Form-based generator — precise control over every Product schema field' },
      { to: '/article-schema-generator',   name: 'Article Schema Generator',   desc: 'Generate Article JSON-LD with author, publisher and date signals' },
      { to: '/faq-schema-generator',       name: 'FAQ Schema Generator',       desc: 'Show expandable Q&A answers directly in Google Search results' },
      { to: '/meta-tags-generator',        name: 'Meta Tag Generator',         desc: 'Generate title, description, OG and Twitter Card tags with live preview' },
    ],
  }
}
