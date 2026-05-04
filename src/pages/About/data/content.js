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
    title: 'Optional AI features',
    desc: 'Advanced features may use a backend someday, but the core tools never will.',
  },
]

export const CREATOR_TAGS = [
  'Fintech Systems',
  'P2P Lending',
  'KYC & Biometrics',
  'Node.js',
  'MongoDB',
  'Redis',
  'Banking APIs',
  'OAuth 2.0 / PKCE',
  'VPS Hardening',
  'mTLS',
  'Zero Trust',
  'Browser APIs',
  'Canvas API',
]

export const PROFILES = [
  {
    label: 'Roman Popovych on LinkedIn',
    href: 'https://www.linkedin.com/in/forze-dev/',
    icon: 'linkedin',
  },
  {
    label: 'forze-dev on GitHub',
    href: 'https://github.com/forze-dev',
    icon: 'github',
  },
  {
    label: 'Project source on GitHub',
    href: 'https://github.com/ABECT-Group/devtools.abect.com__frontend',
    icon: 'github',
  },
]

export const FAQ = [
  {
    question: 'Is Abect Dev Tools completely free?',
    answer: 'Yes — all tools are free with no usage limits, no paywalled tiers, and no watermarks. The site has no subscription model. Some future AI-powered features may require a backend, but every core tool will remain free and browser-based.',
  },
  {
    question: 'Do my files get uploaded to any server?',
    answer: 'No. All processing happens entirely in your browser using the Canvas API and File API. Your files never leave your device. You can verify this by opening DevTools → Network tab while using any tool — no file transfer requests will appear. The tools also work offline after the page has loaded once.',
  },
  {
    question: 'Who built this and why?',
    answer: 'Abect Dev Tools was built by Roman Popovych, a full-stack software engineer from Ukraine. The project started in April 2026 after a frustrating afternoon converting client photos: the first tool was buried in ads and renamed every downloaded file to its own domain, the next had a 5-file free tier limit. The goal was a unified toolkit that works instantly, locally, and without any of those friction points.',
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
