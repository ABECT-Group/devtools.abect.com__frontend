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
]
