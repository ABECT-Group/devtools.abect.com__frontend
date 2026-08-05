export const CREATORS = [
  {
    name: 'Roman Popovych',
    role: 'Full-Stack Software Engineer · Ukraine',
    avatar: '/image/about-avatar.webp',
    bio: [
      '3+ years building production-grade fintech systems where correctness and security are non-negotiable. I have shipped P2P lending platforms, KYC pipelines with biometric verification, banking API integrations (OAuth 2.0, PKCE), and hardened multi-instance infrastructure. Abect Dev Tools started in April 2026 as a practical fix to a frustrating afternoon — and turned into a project I keep building.',
    ],
    tags: [
      'Fintech Systems', 'P2P Lending', 'KYC & Biometrics', 'Node.js', 'MongoDB', 'Redis',
      'Banking APIs', 'OAuth 2.0 / PKCE', 'VPS Hardening', 'mTLS', 'Zero Trust',
      'Browser APIs', 'Canvas API',
    ],
    profiles: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/forze-dev/', icon: 'linkedin' },
      { label: 'GitHub', href: 'https://github.com/forze-dev', icon: 'github' },
    ],
  },
  {
    name: 'Belskyi Vadym',
    role: 'Full-Stack Developer · Founder & CEO of Gray Lynx Team · Ukraine',
    avatar: '/image/about-tester.webp',
    bio: [
      '4+ years building full-stack web applications and high-performance iGaming creatives, specializing in React, Node.js, Pixi.js, and WebGL. I ran the complete QA audit of Abect Dev Tools — testing all 50 pages for SEO compliance, Lighthouse scores, and functional accuracy across every converter. The frontend test report I wrote surfaced every functional bug and SEO issue addressed in this release.',
    ],
    tags: [
      'Full-Stack Development', 'Playable Ads', 'iGaming Creatives', 'React', 'Next.js',
      'Node.js', 'MongoDB', 'Express', 'JS/TS', 'Pixi.js', 'Matter.js',
      'GSAP', 'Three.js', 'WebGL', 'Telegram Bots', 'Discord Bots', 'Twitch Bots', 'Gray Lynx Team',
    ],
    profiles: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vadym-belskyi-69b7202a7/', icon: 'linkedin' },
      { label: 'GitHub', href: 'https://github.com/Ks1neee', icon: 'github' },
    ],
  },
]

export const PRINCIPLES = [
  {
    title: 'Privacy-first',
    desc: 'User data is processed locally whenever possible. Files never leave your device.',
  },
  {
    title: 'No mandatory backend',
    desc: 'All core tools work offline and in-browser. A backend may appear for optional advanced features — never for the basics.',
  },
  {
    title: 'No registration required',
    desc: 'Open a tool, use it, done. An account system may come later for optional features — using the tools will never require it.',
  },
  {
    title: 'No ads, no tracking by default',
    desc: 'Analytics load only if you explicitly accept cookies via the consent banner.',
  },
  {
    title: 'Predictable behavior',
    desc: 'Tools do exactly what they claim — no surprises, no hidden operations.',
  },
  {
    title: 'Specialized AI for narrow tasks',
    desc: 'General-purpose AI hallucinates on structured tasks — wrong schema properties, missing required fields, invalid formats. Our AI tools use constrained system prompts engineered for a specific task so the output is valid on the first try. Core browser tools remain free and account-free forever.',
  },
]

export const PROFILES = [
  {
    label: 'Project source on GitHub',
    href: 'https://github.com/ABECT-Group/devtools.abect.com__frontend',
    icon: 'github',
  },
]

export const FAQ = [
  {
    question: 'Is Abect Dev Tools completely free?',
    answer: 'All browser-based tools — image converters, compressors, text converters, schema form generators — are completely free with no limits, no paywalls, and no watermarks. AI-powered tools require a free account and use a token-based model: the free plan gives 100,000 tokens per month at no cost, which covers hundreds of schema generations. No credit card required.',
  },
  {
    question: 'Do my files get uploaded to any server?',
    answer: 'No. All processing happens entirely in your browser using the Canvas API and File API. Your files never leave your device. You can verify this by opening DevTools → Network tab while using any tool — no file transfer requests will appear. The tools also work offline after the page has loaded once.',
  },
  {
    question: 'Who built this and why?',
    answer: 'Abect Dev Tools was built by Roman Popovych and Belskyi Vadym — full-stack engineers from Ukraine. The project started in April 2026 after a frustrating afternoon converting client photos: the first tool was buried in ads and renamed every downloaded file to its own domain, the next had a 5-file free tier limit. The goal was a unified toolkit that works instantly, locally, and without any of those friction points.',
  },
  {
    question: 'How can I contribute a new tool?',
    answer: 'The project is open source. Contribution guidelines are defined in the repository — each tool must be browser-based, free, focused on a single task, and must not upload user data. Open an issue first if you are unsure whether a tool fits, then submit a pull request following the contribution guide.',
  },
  {
    question: 'What technologies power the tools?',
    answer: 'All tools use modern browser APIs with no third-party processing services. Core APIs: Canvas API for image transformations and exports, File API for reading files locally, Blob URL API for in-memory downloads, Web Crypto API for unique ID generation, and TypedArrays for binary file construction (ICO format). JSZip handles in-browser batch ZIP archives.',
  },
  {
    question: 'How can I verify that my files really are not uploaded?',
    answer: 'Open your browser DevTools, switch to the Network panel, and use any of the browser tools. No request carrying image or text data will appear — you will see the page assets load once and nothing after that. A stronger test: load the page, disconnect from the network entirely, and keep using the tool. It continues to work, because there is no server for it to reach.',
  },
  {
    question: 'Will the browser tools ever require an account or start charging?',
    answer: 'No. Every browser-based tool is free, account-free, and stays that way — there is no server cost behind them to recover, because they run on your own device. The Lora AI assistant is a separate product with its own economics: it calls a paid AI API, so it needs an account and a token allowance. That distinction is deliberate and permanent, not a step towards putting the converters behind a login.',
  },
  {
    question: 'Why are the pages so fast even though this is a React site?',
    answer: 'Every page is prerendered to static HTML at build time. The server sends a fully formed document with all the text, headings and structured data already in it, so the browser paints immediately and search engines index the content without executing any JavaScript. React then hydrates on top to make the tool interactive. There is no server rendering at request time and no database query in the critical path.',
  },
  {
    question: 'What happens to my data if I use Lora, the AI assistant?',
    answer: 'Lora is the only part of the site that sends anything to a server. Your messages and conversation history go to the DeepSeek API to generate a reply, and are stored in our database linked to your account so you can return to the conversation. They are never used for training or advertising. You can delete individual conversations, or delete your account to remove everything permanently. The full detail is in the Privacy Policy.',
  },
  {
    question: 'Can I use the generated files commercially?',
    answer: 'Yes. Anything the tools produce — converted images, compressed files, favicon packages, meta tags, JSON-LD schema — is yours, with no attribution requirement, no watermark and no licence attached. The tools only transform files you already own; we never see them, so we could not claim anything over them even if we wanted to.',
  },
]
