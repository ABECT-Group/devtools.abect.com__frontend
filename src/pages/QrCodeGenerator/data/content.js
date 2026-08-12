// All user-visible copy for the QR family. Block types match the shared
// renderer: 'p' | 'h3' | 'ul' | 'table' | 'code'. Inline **bold** and
// [text](url) are parsed by renderText in the page component.

// ─── URL / LINK ───────────────────────────────────────────────────────────────

const URL_PAGE = {
  howToTitle: 'How to generate a QR code',
  howToSteps: [
    'Paste the URL you want the code to open. Include https:// so phones treat it as a link rather than plain text.',
    'Pick your colors. Keep the foreground dark and the background light — scanners rely on that contrast, not on the specific hue.',
    'Optionally upload a logo. Error correction is raised to level H automatically so the code still scans with the center covered.',
    'Choose a module style — square is the most reliable, rounded and dots trade a little scan margin for a softer look.',
    'Download as PNG for screens and messaging, or as SVG for anything that will be printed.',
  ],
  sections: [
    {
      heading: 'Free forever, unlimited scans, no watermark',
      blocks: [
        {
          type: 'p',
          text: 'Every code this generator produces is yours outright. There is no account to create, no trial that runs out and no plan to upgrade to — the free tier is the only tier, because there is nothing to bill for.',
        },
        {
          type: 'table',
          headers: ['', 'This generator'],
          rows: [
            ['Sign-up required', 'No — the tool works before you have an account, and there is no account'],
            ['Expiry date', 'None. The code cannot stop working'],
            ['Scan limit', 'Unlimited — nobody is counting, because nothing phones home'],
            ['Watermark', 'None on any export'],
            ['Commercial use', 'Free. The QR standard is open (ISO/IEC 18004) and its patent rights were waived'],
            ['Vector output', 'SVG included, at any resolution you need for print'],
            ['Your data', 'Never leaves the browser tab'],
          ],
        },
        {
          type: 'p',
          text: 'Those claims are worth checking rather than trusting. Most of them follow from one architectural fact — there is no server in this product — and you can verify it yourself in about ten seconds, as described two sections below.',
        },
      ],
    },
    {
      heading: 'Static vs dynamic QR codes — why this one never expires',
      blocks: [
        {
          type: 'p',
          text: 'This is the single most important distinction in the whole category, and the one most generators are quietest about. It decides whether your printed code still works in five years.',
        },
        {
          type: 'table',
          headers: ['', 'Static (what this tool makes)', 'Dynamic'],
          rows: [
            ['What is encoded', 'Your actual destination', 'A short link to a third-party redirect'],
            ['Depends on a service', 'No', 'Yes — that company must stay in business'],
            ['Stops working if the plan lapses', 'Never', 'Yes, typically within days'],
            ['Destination editable after printing', 'No', 'Yes'],
            ['Scan analytics', 'No', 'Yes'],
            ['Cost', 'Free', 'Almost always a subscription'],
            ['Code density', 'Grows with your URL length', 'Always short'],
          ],
        },
        {
          type: 'p',
          text: 'A **dynamic** code is genuinely useful when the destination will change or you need scan counts — a campaign landing page, a menu that gets replaced each season. You are paying for a redirect service, and that is a fair trade as long as you keep paying.',
        },
        {
          type: 'p',
          text: 'A **static** code is the right default for everything else. Signage, packaging, business cards, equipment labels, anything printed once and expected to last: the destination is baked into the pattern, so there is no middleman that can vanish, rebrand, get acquired or decide your free tier is over. If you need the editability later, put a short URL you control in the static code and change what sits behind it — that gives you the same flexibility without renting it.',
        },
      ],
    },
    {
      heading: 'Everything happens in your browser — nothing is uploaded',
      blocks: [
        {
          type: 'p',
          text: 'This generator has no backend. The URL you type, the logo you pick and the finished code never leave your device — there is no server to send them to. Open your browser DevTools, switch to the Network tab and generate a code: you will see no requests at all. The page keeps working with the network disconnected.',
        },
        {
          type: 'p',
          text: 'That matters more than it sounds. Most free QR services route your link through their own domain so they can count scans, and a **dynamic QR code** stops working the moment that service shuts down, changes its pricing, or decides your account has expired. The codes generated here are **static**: the destination is encoded directly into the pattern, so the code works forever and depends on nobody.',
        },
        {
          type: 'code',
          label: 'JavaScript',
          code: `// The whole pipeline, start to finish
const { create } = await import('qrcode')
const qr = create('https://example.com', { errorCorrectionLevel: 'M' })

// qr.modules.size — matrix side in modules
// qr.modules.data — Uint8Array, 1 = dark module

const ctx = canvas.getContext('2d')
for (let row = 0; row < qr.modules.size; row++) {
  for (let col = 0; col < qr.modules.size; col++) {
    if (qr.modules.data[row * qr.modules.size + col] !== 1) continue
    ctx.fillRect(offset + col * m, offset + row * m, m, m)
  }
}`,
        },
      ],
    },
    {
      heading: 'Scanning on iPhone and Android — no app needed',
      blocks: [
        {
          type: 'p',
          text: 'A recurring worry when printing codes is whether people will need to install something. They will not. Both mobile platforms have read QR codes from the stock camera for years, and a dedicated scanner app has been unnecessary since roughly 2019.',
        },
        { type: 'h3', text: 'iPhone and iPad' },
        {
          type: 'ul',
          items: [
            '**iOS 11 and later** — open the Camera app and point it at the code. A notification banner appears at the top; tap it to act',
            '**Control Center** — a Code Scanner button can be added in Settings → Control Center, which skips the banner entirely',
            '**Photos app** — since iOS 15, Live Text reads codes inside a screenshot or a saved photo',
            'The common failure is not technical: the banner disappears after a few seconds and people assume the code did not work',
          ],
        },
        { type: 'h3', text: 'Android' },
        {
          type: 'ul',
          items: [
            '**Android 9 and later** — the stock camera reads codes on most devices, with Google Lens as the fallback on some manufacturer skins',
            '**Google Lens** — built into the Google app, Photos and Assistant, and reads codes from saved images too',
            'Samsung, Xiaomi and OnePlus all expose it slightly differently, which is why a short "scan with your camera" caption under a printed code removes a lot of hesitation',
          ],
        },
        { type: 'h3', text: 'Test before you print' },
        {
          type: 'p',
          text: 'Print or display the code at the **actual final size**, then scan it with two different phones — ideally one iPhone and one Android — from the distance people will really stand at. Nearly every failed QR campaign would have been caught by this one-minute check, because a code that scans perfectly at 100% zoom on a monitor can be unreadable at 2 cm on matte paper.',
        },
      ],
    },
    {
      heading: 'QR versions and capacity — why longer links make denser codes',
      blocks: [
        {
          type: 'p',
          text: 'A QR code is not a fixed grid. It has 40 **versions**, from a 21×21 matrix up to 177×177, and the encoder picks the smallest one that fits your data at the chosen error-correction level. More characters means a higher version, which means more modules squeezed into the same physical square — and smaller modules are harder for a camera to resolve.',
        },
        {
          type: 'table',
          headers: ['Version', 'Matrix', 'Bytes at level M', 'Practical use'],
          rows: [
            ['1', '21×21', '14', 'A very short link or code'],
            ['2', '25×25', '26', 'A typical short URL'],
            ['5', '37×37', '106', 'A URL with a few parameters'],
            ['10', '57×57', '311', 'A short vCard'],
            ['20', '97×97', '1 062', 'A full vCard with address'],
            ['40', '177×177', '2 331', 'Maximum — hard to scan from print'],
          ],
        },
        {
          type: 'p',
          text: 'The practical takeaway: **shorten the URL before you generate the code, not after**. A link under 40 characters lands around version 2 or 3, giving you fat, forgiving modules that scan from across a room. The same destination behind a 200-character tracking URL produces a dense version 10 code that needs the phone held close and steady.',
        },
      ],
    },
    {
      heading: 'Error correction — how much damage a code survives',
      blocks: [
        {
          type: 'p',
          text: 'Every QR code carries redundant data so it still reads when part of the pattern is dirty, torn, or covered. There are four levels, and picking one is a trade between resilience and density.',
        },
        {
          type: 'table',
          headers: ['Level', 'Recoverable', 'Effect on size', 'When to use it'],
          rows: [
            ['L', '~7%', 'Smallest code', 'Clean digital display, long payload'],
            ['M', '~15%', 'Slightly larger', 'Default — screens and ordinary printing'],
            ['Q', '~25%', 'Noticeably larger', 'Printed on textured or curved surfaces'],
            ['H', '~30%', 'Largest code', 'Required when a logo covers the center'],
          ],
        },
        {
          type: 'p',
          text: 'Level H is what makes center logos possible at all. Covering roughly a fifth of the matrix destroys modules, and only the 30% redundancy of level H reliably absorbs that loss. This tool switches to H automatically as soon as you add a logo, so you cannot accidentally ship a code that scans on your monitor and fails on a printed flyer.',
        },
      ],
    },
    {
      heading: 'Color, contrast and the mistakes that break scanning',
      blocks: [
        {
          type: 'p',
          text: 'A scanner does not see color. It converts the camera image to greyscale and looks for a contrast edge, which is why the rule is about **luminance**, not hue. A dark blue code on white scans perfectly. A yellow code on white does not, even though a human sees the pattern clearly.',
        },
        { type: 'h3', text: 'Safe choices' },
        {
          type: 'ul',
          items: [
            '**Dark foreground, light background** — the contrast ratio should be at least 4:1, and higher is always better',
            '**Keep the quiet zone** — the empty margin around the code is part of the specification, not decoration. Four modules is the minimum',
            '**Leave the three corner squares square** — those finder patterns are what a scanner locks onto first. This tool keeps them square even in dots mode for exactly that reason',
          ],
        },
        { type: 'h3', text: 'What breaks codes in the wild' },
        {
          type: 'ul',
          items: [
            '**Inverted codes** — light modules on a dark background. Some scanners handle it, many do not. Not worth the risk on printed material',
            '**Low-contrast pairs** — grey on white, yellow on cream, pastel on pastel',
            '**Cropping the margin** to make the code fit a layout — this is the single most common print failure',
            '**Printing too small** — below about 2 cm even a low-version code becomes unreliable at arm\'s length',
          ],
        },
      ],
    },
    {
      heading: 'PNG or SVG — which export to use',
      blocks: [
        {
          type: 'p',
          text: 'Both exports come from the same matrix, so they are pixel-for-pixel equivalent in geometry. The difference is what happens when someone resizes them.',
        },
        {
          type: 'table',
          headers: ['', 'PNG', 'SVG'],
          rows: [
            ['Scales without quality loss', 'No — fixed pixel grid', 'Yes — vector geometry'],
            ['Best for', 'Websites, email, chat, slides', 'Print, stickers, signage, packaging'],
            ['Opens everywhere', 'Yes', 'Yes, but some old tools need conversion'],
            ['File size', 'Grows with dimensions', 'Constant, usually smaller'],
            ['Editable in design tools', 'No', 'Yes — Illustrator, Figma, Inkscape'],
          ],
        },
        {
          type: 'p',
          text: 'The rule of thumb: **anything that will be printed should be SVG**. A printer works at 300 DPI or more, so a 512 px PNG blown up to a poster becomes visibly soft-edged, and soft edges are exactly what confuses a scanner. Vector output has no such ceiling — the same file works on a business card and a billboard.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is this QR code generator really free?',
      answer: 'Yes. There is no signup, no watermark, no scan limit and no paid tier. The tool runs entirely in your browser, so it costs nothing to operate beyond hosting a static page.',
    },
    {
      question: 'Do my QR codes expire?',
      answer: 'No. These are static QR codes — the destination is encoded directly into the pattern. There is no redirect service in the middle that could shut down, so a printed code keeps working indefinitely.',
    },
    {
      question: 'Is my data uploaded anywhere?',
      answer: 'No. There is no backend. The URL you enter, any logo you upload and the generated image are processed entirely on your device. You can verify this by opening DevTools and watching the Network tab — there are no requests.',
    },
    {
      question: 'Can I use these QR codes commercially?',
      answer: 'Yes, at no cost. The QR Code specification is an open ISO standard (ISO/IEC 18004) and Denso Wave has waived its patent rights for use of the standard. Codes you generate here carry no watermark and are yours to use in any commercial context.',
    },
    {
      question: 'Is there a limit on how many times a QR code can be scanned?',
      answer: 'No. Scans are unlimited, and that is not a generous policy — it is a consequence of how static codes work. Nothing contacts a server when someone scans, so there is no counter anywhere and no threshold to cross.',
    },
    {
      question: 'Do people need an app to scan my QR code?',
      answer: 'No. The stock camera reads QR codes on iOS 11 and later and on Android 9 and later, which covers effectively every phone in use. A dedicated scanner app has been unnecessary since around 2019, though some Android skins route the result through Google Lens.',
    },
    {
      question: 'Why does my QR code stop scanning when I add a logo?',
      answer: 'A logo destroys the modules it covers. This tool raises error correction to level H automatically when you add one, which recovers up to 30% of lost data, and it punches the covered modules out rather than painting over them. If it still fails, the logo is likely too large — keep it under about a fifth of the code area.',
    },
    {
      question: 'What size should I print a QR code?',
      answer: 'A practical minimum is 2 × 2 cm for a short URL scanned from arm\'s length. The general rule is that scanning distance should be about ten times the code width, so a code read from 1 metre away needs to be roughly 10 cm across. Longer payloads produce denser codes and need more size.',
    },
    {
      question: 'Can I change the colors of a QR code?',
      answer: 'Yes, but the constraint is contrast rather than color. Scanners convert the image to greyscale, so the foreground must be significantly darker than the background — aim for a contrast ratio of at least 4:1. Dark navy, deep green or maroon on white all work; yellow or pastel foregrounds do not.',
    },
    {
      question: 'What is the quiet zone and why does it matter?',
      answer: 'The quiet zone is the blank margin around the code, specified as at least four modules wide. It tells the scanner where the pattern ends. Cropping it to fit a tight layout is the most common reason a code that worked on screen fails in print.',
    },
    {
      question: 'How much data can a single QR code hold?',
      answer: 'The maximum is 2 953 bytes at error correction level L, which drops to 1 273 bytes at level H. In practice you should stay far below that — codes near the limit reach version 40, a 177×177 grid that is very difficult to scan from printed material.',
    },
    {
      question: 'What is the difference between static and dynamic QR codes?',
      answer: 'A static code encodes the destination directly and works forever. A dynamic code encodes a link to a third-party redirect service, which can then change the destination and count scans — but the code stops working if that service disappears or your subscription lapses. This tool generates static codes only.',
    },
    {
      question: 'Why choose SVG over PNG?',
      answer: 'SVG is vector, so it scales to any size without softening the module edges. Anything destined for print — stickers, packaging, signage, business cards — should use SVG. PNG is the better choice for screens, email and messaging apps.',
    },
    {
      question: 'Do rounded or dot module styles affect scanning?',
      answer: 'Slightly. Rounded and dot styles shrink the effective dark area of each module, which reduces the margin for error on a low-quality camera or a poor print. This tool keeps the three corner finder patterns square in every style, since those are what scanners detect first. For critical print work, square modules remain the safest choice.',
    },
  ],
  relatedTools: [
    { to: '/text-to-qr-code-generator', name: 'Text to QR Code Generator', desc: 'Encode the message itself instead of a link — works with no internet at all' },
    { to: '/wifi-qr-code-generator', name: 'WiFi QR Code Generator', desc: 'Let guests join your network by scanning — handles WPA3 and special characters' },
    { to: '/vcard-qr-code-generator', name: 'vCard QR Code Generator', desc: 'Put a full contact card on a business card — one scan saves it to the phone' },
    { to: '/og-image-generator', name: 'OG Image Generator', desc: 'Crop and export Open Graph images at exactly 1200×630' },
  ],
}

// ─── TEXT ─────────────────────────────────────────────────────────────────────
//
// Deliberately NOT an angle on links. A text code carries its payload instead of
// pointing at one, so the whole page is about working without infrastructure:
// no domain, no hosting, no network on the scanning phone.

const TEXT_PAGE = {
  howToTitle: 'How to turn text into a QR code',
  howToSteps: [
    'Type or paste the text you want the code to display. It appears on the phone exactly as written — nothing is opened and nothing is loaded.',
    'Keep it short. Text is stored inside the pattern itself, so every character makes the code denser and harder to scan.',
    'Pick your colors and module style, and add a logo if the code is going on branded material.',
    'Check the byte counter under the preview — it warns before the payload grows dense enough to fail in print.',
    'Download as PNG for screens, or as SVG for labels, packaging and signage.',
  ],
  sections: [
    {
      heading: 'Text codes carry the message — link codes only point at it',
      blocks: [
        {
          type: 'p',
          text: 'This is the whole difference, and everything else follows from it. A link QR code stores a web address; the phone still has to reach the internet and the site still has to be online. A text QR code stores **the message itself**, so scanning it displays the content immediately — no browser, no server, no signal.',
        },
        {
          type: 'table',
          headers: ['', 'Text QR code', 'Link QR code'],
          rows: [
            ['Needs internet on the phone', 'No', 'Yes'],
            ['Needs a website to exist', 'No', 'Yes'],
            ['Still works in 10 years', 'Yes', 'Only if the URL still resolves'],
            ['Content visible before scanning', 'To anyone who decodes the image', 'Only the URL is visible'],
            ['Can be edited after printing', 'No', 'No, unless it points at a redirect'],
            ['Can count scans', 'No', 'Only through a redirect service'],
          ],
        },
        {
          type: 'p',
          text: 'That independence is the reason to choose text. A code on a machine in a factory basement, on a shipping crate, in a lift shaft or on a hiking trail sign has to work where there is no reception at all — and a link code simply does not.',
        },
      ],
    },
    {
      heading: 'The generator itself works offline too',
      blocks: [
        {
          type: 'p',
          text: 'Plenty of sites will tell you that text QR codes work without the internet. Almost all of them build the code **on their server**, which means the text you typed travelled across the network before it became an image.',
        },
        {
          type: 'p',
          text: 'This page has no backend at all. The text is encoded into the matrix inside your browser tab, drawn onto a canvas and handed to you as a file. Load the page once, switch your machine to airplane mode, and keep generating codes — it keeps working, because there is nothing to call.',
        },
        {
          type: 'code',
          label: 'JavaScript',
          code: `// The entire pipeline. No fetch, no upload, no analytics on your input.
const { create } = await import('qrcode')
const qr = create(text, { errorCorrectionLevel: 'M' })

const ctx = canvas.getContext('2d')
for (let row = 0; row < qr.modules.size; row++) {
  for (let col = 0; col < qr.modules.size; col++) {
    if (qr.modules.data[row * qr.modules.size + col] !== 1) continue
    ctx.fillRect(offset + col * m, offset + row * m, m, m)
  }
}`,
        },
        {
          type: 'p',
          text: 'Open DevTools, switch to the Network tab and generate something. You will see the page assets load once and then nothing else. That is worth knowing before you encode an internal batch number or a maintenance note.',
        },
      ],
    },
    {
      heading: 'How much text actually fits — and why the usual number is wrong',
      blocks: [
        {
          type: 'p',
          text: 'Nearly every QR guide quotes **4 296 characters**. That figure is real but it applies to a narrow case: the alphanumeric encoding mode, which covers only digits, **uppercase** A–Z, space and nine punctuation marks. The moment your text contains a single lowercase letter, the encoder falls back to byte mode and the ceiling drops.',
        },
        {
          type: 'table',
          headers: ['Encoding mode', 'What it covers', 'Max at level L', 'Max at level H'],
          rows: [
            ['Numeric', 'Digits only', '7 089', '3 057'],
            ['Alphanumeric', 'Digits, UPPERCASE, space, $%*+-./:', '4 296', '1 852'],
            ['Byte', 'Anything else, including lowercase', '2 953', '1 273'],
            ['Kanji', 'Shift-JIS Japanese', '1 817', '784'],
          ],
        },
        {
          type: 'p',
          text: 'Non-Latin text costs more still. In UTF-8 a Cyrillic, Greek or Arabic letter takes **two bytes**, and most CJK characters take **three** — so 500 characters of Ukrainian is roughly 1 000 bytes, not 500. The counter under the preview measures actual bytes for exactly this reason, which is why it can disagree with the 4 296 figure you will read elsewhere.',
        },
        {
          type: 'p',
          text: 'The practical limit is much lower than any of these numbers. Around **300 characters** is where a code stays comfortably scannable on a printed label at normal size. Past that the matrix grows dense enough that a phone needs to be held close and steady, which defeats the point.',
        },
      ],
    },
    {
      heading: 'Where plain text codes are the right tool',
      blocks: [
        { type: 'h3', text: 'Places with no reliable signal' },
        {
          type: 'ul',
          items: [
            '**Machines and equipment** — setup steps, torque values or a troubleshooting note on the panel itself, readable in a basement plant room',
            '**Shipping crates and pallets** — batch number, contents, handling instructions that survive without a warehouse system',
            '**Trail and park signage** — route notes and distances where there is no reception for kilometres',
            '**Lift and plant rooms** — service dates and emergency contacts',
          ],
        },
        { type: 'h3', text: 'Places where a link would be overkill' },
        {
          type: 'ul',
          items: [
            '**Product packaging** — best-before dates, storage temperature, allergen notes',
            '**Shelf edge labels** — promotion terms that are too long to print in full',
            '**Event badges** — table number, session track, dietary requirement',
            '**Classrooms** — emergency contacts, quiz answers revealed after the exercise',
            '**Museum and gallery labels** — extended captions without building a mobile site',
          ],
        },
        {
          type: 'p',
          text: 'The common thread is that none of these justify owning a URL, hosting a page and keeping it alive for years. The text code is the page.',
        },
      ],
    },
    {
      heading: 'What not to put in a text QR code',
      blocks: [
        {
          type: 'p',
          text: 'A plain text code offers **no protection whatsoever**. The content is not encrypted, not obfuscated and not hidden — anyone who photographs the code, or finds the image online, can decode it in seconds with any free decoder. Treat it exactly like text printed in the open.',
        },
        {
          type: 'ul',
          items: [
            '**Passwords and access codes** — a photograph of the code is a photograph of the password',
            '**Personal data** — names, addresses, dates of birth or medical details on anything publicly visible',
            '**Licence keys or serials** — trivially harvested at scale from photos',
            '**Anything you would not print in large type on the same surface** — that is the honest test',
          ],
        },
        { type: 'h3', text: 'The scanning risk, briefly' },
        {
          type: 'p',
          text: 'There is also a risk in the other direction. **Quishing** — QR phishing — works because a printed code gives no preview of where it leads, and a sticker placed over a legitimate code is invisible to the eye. Text codes are the safer half of that equation: they display content rather than navigating anywhere, so a scanner shows you the message and nothing happens on its own. If you place codes in public, check periodically that nobody has covered them.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is a text QR code?',
      answer: 'It is a QR code that stores plain text directly inside the pattern instead of a web address. Scanning it displays the text immediately on the phone screen — nothing opens, nothing loads and no website is involved.',
    },
    {
      question: 'Does a text QR code work without internet?',
      answer: 'Yes, completely. The content lives inside the code itself, so the scanning phone needs no signal, no data plan and no working website at the other end. This is the main reason to choose text over a link.',
    },
    {
      question: 'How is this different from a URL QR code?',
      answer: 'A URL code stores an address and the phone has to fetch it, which needs internet and a live site. A text code carries the message itself. Use a link when the content changes or lives online; use text when the message is short, fixed and has to work anywhere.',
    },
    {
      question: 'How many characters can a text QR code hold?',
      answer: 'The theoretical maximum is 2 953 bytes for ordinary mixed-case text at error correction level L, dropping to 1 273 bytes at level H. The widely quoted 4 296 figure applies only to uppercase letters, digits and a few punctuation marks. In practice, stay near 300 characters — beyond that the code becomes too dense to scan reliably in print.',
    },
    {
      question: 'Why does the byte counter disagree with 4 296 characters?',
      answer: 'Because those are different encoding modes. QR codes switch to byte mode as soon as text contains lowercase letters, and byte mode holds 2 953 bytes. Accented, Cyrillic and Greek characters cost two bytes each in UTF-8, and most CJK characters cost three — so the byte count is what actually matters, not the character count.',
    },
    {
      question: 'Can I use other languages and emoji?',
      answer: 'Yes. Text is encoded as UTF-8, so any language and emoji work. Just remember that each non-Latin character consumes two or three bytes rather than one, so a code in Ukrainian, Greek or Japanese holds noticeably fewer characters than the same code in English.',
    },
    {
      question: 'Is my text sent to your server?',
      answer: 'No. There is no server. The text is encoded into the QR matrix inside your browser and never leaves the device. You can verify it by opening DevTools and watching the Network tab, or by disconnecting from the internet — the page keeps generating codes.',
    },
    {
      question: 'Can I edit the text after printing the code?',
      answer: 'No. The text is baked into the pattern, so a change means generating a new code and reprinting. If the content will change, put a short URL in the code instead and update the page behind it.',
    },
    {
      question: 'Is it safe to put a password in a text QR code?',
      answer: 'No. The content is stored in plain form with no encryption, so anyone who photographs or downloads the code can decode it instantly. Treat a text QR code exactly like text printed openly on the same surface.',
    },
    {
      question: 'Does the code expire or need a subscription?',
      answer: 'Neither. These are static codes with no redirect service in the middle, so nothing can lapse, shut down or start charging. A printed code keeps working indefinitely.',
    },
    {
      question: 'Why does my text code look denser than a link code?',
      answer: 'Because it usually holds more data. A short URL is 20 to 40 characters, while a useful text note is often several hundred, and more data means a higher QR version with smaller modules. Shortening the text is the most effective way to make the code easier to scan.',
    },
    {
      question: 'Can I add a logo to a text QR code?',
      answer: 'Yes. Error correction switches to level H automatically when you add one, which recovers up to 30% of the covered pattern. Note that level H also cuts capacity to 1 273 bytes, so a long text plus a logo can exceed the limit — the counter will warn you before it does.',
    },
    {
      question: 'What size should I print it?',
      answer: 'At least 2 × 2 cm for a short note, and larger for anything over 100 characters, since more text means a denser grid. Export as SVG for print so the module edges stay sharp, and never crop the quiet zone around the code.',
    },
  ],
  relatedTools: [
    { to: '/qr-code-generator', name: 'QR Code Generator', desc: 'Encode a link instead — opens the page in the phone browser on scan' },
    { to: '/wifi-qr-code-generator', name: 'WiFi QR Code Generator', desc: 'Let guests join your network by scanning — handles WPA3 and special characters' },
    { to: '/vcard-qr-code-generator', name: 'vCard QR Code Generator', desc: 'Put a full contact card on a business card — one scan saves it to the phone' },
  ],
}

// ─── WI-FI ────────────────────────────────────────────────────────────────────

const WIFI_PAGE = {
  howToTitle: 'How to create a WiFi QR code',
  howToSteps: [
    'Type the network name exactly as it appears in the WiFi list — SSIDs are case-sensitive and a single wrong character makes the code useless.',
    'Choose the security type. WPA covers WPA, WPA2 and WPA3 — they all share one keyword in the QR format.',
    'Enter the password. Semicolons, colons, commas, quotes and backslashes are escaped automatically, so type it exactly as it is.',
    'Tick "Hidden network" only if the router does not broadcast its SSID.',
    'Download as PNG for a screen, or SVG if you are printing a sign for a café, office or rental.',
  ],
  sections: [
    {
      heading: 'The escaping bug that breaks most WiFi QR codes',
      blocks: [
        {
          type: 'p',
          text: 'The WiFi QR format is a single delimited string, and it reserves five characters: backslash, semicolon, comma, colon and double quote. If any of them appear in your SSID or password, they **must** be escaped with a backslash. Most free generators do not do this — they concatenate your input and hope for the best.',
        },
        {
          type: 'p',
          text: 'The failure is silent and specific: a password like `p@ss;word` gets cut at the semicolon, and the phone tries to join with `p@ss`. The code scans fine, the WiFi dialog appears, and the connection simply fails with a wrong-password error that nobody traces back to the sticker on the wall.',
        },
        {
          type: 'code',
          label: 'WiFi QR format',
          code: `WIFI:T:WPA;S:MyNetwork;P:mypassword;;

# Password containing a semicolon — wrong, truncates at the ;
WIFI:T:WPA;S:MyNetwork;P:p@ss;word;;

# Correct — the semicolon is escaped
WIFI:T:WPA;S:MyNetwork;P:p@ss\\;word;;

# Hidden network adds H:true
WIFI:T:WPA;S:MyNetwork;P:secret;H:true;;

# Open network omits P: entirely
WIFI:T:nopass;S:GuestWiFi;;`,
        },
        {
          type: 'p',
          text: 'This tool escapes all five characters in both the SSID and the password, following the format specification. You can paste a password containing any punctuation and it will encode correctly.',
        },
      ],
    },
    {
      heading: 'WPA, WPA2, WPA3 and WEP — which to pick',
      blocks: [
        {
          type: 'p',
          text: 'The WiFi QR format predates WPA3 and only defines three security keywords. This confuses people who look for a WPA3 option and do not find one.',
        },
        {
          type: 'table',
          headers: ['Your router setting', 'QR keyword', 'Notes'],
          rows: [
            ['WPA3-Personal', 'WPA', 'One keyword covers all WPA generations'],
            ['WPA2-Personal', 'WPA', 'The most common home setup'],
            ['WPA/WPA2 mixed', 'WPA', 'Works without further configuration'],
            ['WEP', 'WEP', 'Legacy and insecure — replace the router if possible'],
            ['Open / no password', 'nopass', 'The password field is omitted entirely'],
            ['WPA2/WPA3-Enterprise', '—', 'Not supported by the QR format; needs a certificate profile'],
          ],
        },
        {
          type: 'p',
          text: 'The important omission is **Enterprise**. Networks using 802.1X with individual usernames — most corporate and university WiFi — cannot be represented in a WiFi QR code at all. Those need a configuration profile pushed by the IT department, not a QR sticker.',
        },
      ],
    },
    {
      heading: 'How iOS and Android differ when scanning',
      blocks: [
        {
          type: 'p',
          text: 'WiFi QR support is built into both platforms now, but the behaviour is not identical and knowing the difference saves a lot of guessing when something does not work.',
        },
        { type: 'h3', text: 'iOS 11 and later' },
        {
          type: 'ul',
          items: [
            'The **native Camera app** recognises WiFi codes — no third-party scanner needed',
            'A notification banner appears at the top; tapping it opens the join prompt',
            'If you ignore the banner it disappears, and people often assume the code failed',
            'Hidden networks work, but iOS sometimes takes noticeably longer to complete the join',
          ],
        },
        { type: 'h3', text: 'Android 10 and later' },
        {
          type: 'ul',
          items: [
            'The native camera handles it on most devices; some skins require Google Lens',
            'Android also **generates** WiFi QR codes — Settings → WiFi → tap the network → Share',
            'That built-in sharing produces exactly the same format this tool does',
            'Older Android 9 and below need a dedicated scanner app',
          ],
        },
        {
          type: 'p',
          text: 'A practical note for printed signs: add a short line of text like "Scan with your camera to join" under the code. A surprising number of people still assume a QR code needs a special app, and the label removes the hesitation.',
        },
      ],
    },
    {
      heading: 'Where WiFi QR codes actually earn their keep',
      blocks: [
        {
          type: 'ul',
          items: [
            '**Cafés and restaurants** — a small card on each table beats writing the password on a chalkboard where it gets misread',
            '**Short-term rentals** — put it in the welcome binder; guests arriving late at night will thank you',
            '**Offices with guest networks** — a code at reception avoids the receptionist reciting a 20-character key',
            '**Conference rooms** — laminated on the table, updated whenever the guest key rotates',
            '**Home** — a card in the hallway means never dictating your password to a visitor again',
          ],
        },
        { type: 'h3', text: 'One security consideration' },
        {
          type: 'p',
          text: 'A WiFi QR code contains the password in **plain text**. Anyone who photographs the code has your key, and anyone who can decode a QR image can read it. That is fine for a guest network, and a bad idea for the network your NAS and security cameras sit on. If your router supports a separate guest SSID, generate the code for that one and keep the main network private.',
        },
      ],
    },
    {
      heading: 'Troubleshooting a WiFi QR code that will not connect',
      blocks: [
        {
          type: 'table',
          headers: ['Symptom', 'Likely cause', 'Fix'],
          rows: [
            ['Code scans, join fails', 'Unescaped character in the password', 'Regenerate here — escaping is automatic'],
            ['Nothing happens on scan', 'Old Android, or a scanner app without WiFi support', 'Use the native camera or Google Lens'],
            ['Wrong password error', 'SSID case mismatch', 'Copy the name exactly as the router shows it'],
            ['Works on Android, not iOS', 'Notification banner dismissed too fast', 'Scan again and tap the banner promptly'],
            ['Never connects on any phone', 'Enterprise network', 'Not supported by the format — ask IT for a profile'],
            ['Blurry code will not scan', 'PNG scaled up after export', 'Re-export as SVG, or as a larger PNG'],
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'How does a WiFi QR code actually work?',
      answer: 'It encodes a short plain-text string in the format WIFI:T:WPA;S:NetworkName;P:password;; — the phone parses that string and offers to join the network with those credentials. There is no magic and no server involved.',
    },
    {
      question: 'Does this work with WPA3?',
      answer: 'Yes. The WiFi QR format defines one keyword, WPA, that covers WPA, WPA2 and WPA3. Select WPA regardless of which generation your router runs.',
    },
    {
      question: 'My password contains special characters. Will it work?',
      answer: 'Yes. Semicolons, colons, commas, double quotes and backslashes are escaped automatically per the format specification. This is exactly where most free generators fail silently — they pass the password through unescaped and it gets truncated at the first reserved character.',
    },
    {
      question: 'Can I make a QR code for a hidden network?',
      answer: 'Yes — tick the "Hidden network" option and the code will include the H:true flag. Note that joining a hidden network from a QR code can take noticeably longer, particularly on iOS.',
    },
    {
      question: 'Is my WiFi password sent to your server?',
      answer: 'No. There is no server. The password is turned into a QR pattern entirely inside your browser tab and never transmitted. You can confirm this by watching the Network tab in DevTools while generating.',
    },
    {
      question: 'Can someone steal my WiFi password from the QR code?',
      answer: 'Yes — the password is stored in plain text inside the code, so anyone who photographs it can decode it. Treat a printed WiFi QR code exactly like a password written on paper: fine for a guest network, unwise for the network your private devices sit on.',
    },
    {
      question: 'Does it work with corporate or university WiFi?',
      answer: 'Usually not. Networks using WPA2/WPA3-Enterprise authenticate each user individually via 802.1X, and the WiFi QR format has no way to express that. Those networks need a configuration profile from the IT department.',
    },
    {
      question: 'Which phones can scan a WiFi QR code?',
      answer: 'iOS 11 and later scan it with the built-in Camera app. Android 10 and later handle it natively on most devices, with some manufacturer skins routing it through Google Lens. Android 9 and older need a dedicated scanner app.',
    },
    {
      question: 'Can I print the code on a sticker or table card?',
      answer: 'Yes, and SVG is the right export for that. It is vector, so it prints crisply at any size. Keep the code at least 2 cm across and never crop the white margin around it — that quiet zone is part of the specification.',
    },
    {
      question: 'Do I need to regenerate the code when I change my password?',
      answer: 'Yes. The credentials are baked into the pattern, so a password change makes every printed copy obsolete. If you rotate a guest key regularly, keep the code somewhere easy to reprint.',
    },
    {
      question: 'Why does my code work on one phone but not another?',
      answer: 'The usual causes are an older Android version without native support, a scanner app that reads the text but does not act on WiFi payloads, or an iOS notification banner that was dismissed before being tapped. Try the device\'s native camera app first.',
    },
    {
      question: 'Can I add my café logo to the WiFi code?',
      answer: 'Yes. Upload it and error correction switches to level H automatically, which recovers up to 30% of the pattern. Keep the logo under about a fifth of the code area and test the result with two different phones before printing a batch.',
    },
    {
      question: 'Does the code expire or need a subscription?',
      answer: 'Neither. It is a static code — the credentials are encoded directly into the pattern with no redirect service in between. It works as long as the network name and password stay the same.',
    },
  ],
  relatedTools: [
    { to: '/qr-code-generator', name: 'QR Code Generator', desc: 'Generate a QR code for any link with custom colors, a logo and SVG export' },
    { to: '/vcard-qr-code-generator', name: 'vCard QR Code Generator', desc: 'Put a full contact card on a business card — one scan saves it to the phone' },
    { to: '/text-to-qr-code-generator', name: 'Text to QR Code Generator', desc: 'Encode a plain-text note that displays on scan with no internet needed' },
  ],
}

// ─── VCARD ────────────────────────────────────────────────────────────────────

const VCARD_PAGE = {
  howToTitle: 'How to create a vCard QR code',
  howToSteps: [
    'Fill in at least a first name — everything else is optional, and empty fields are left out of the card entirely.',
    'Add the phone numbers you want reachable. Mobile and work are stored separately so the phone labels them correctly.',
    'Fill in the address only if it belongs on the card. It is the single biggest contributor to code density.',
    'Style the code and optionally add your company logo — error correction moves to level H automatically.',
    'Export as SVG for business cards and print, or PNG for an email signature or website.',
  ],
  sections: [
    {
      heading: 'vCard, MECARD and the version question',
      blocks: [
        {
          type: 'p',
          text: 'There are three competing contact formats that fit into a QR code, and picking the wrong one is a common source of "it saved on my phone but not my colleague\'s".',
        },
        {
          type: 'table',
          headers: ['Format', 'Support', 'Size', 'Verdict'],
          rows: [
            ['vCard 3.0', 'Universal — iOS, Android, Outlook, macOS', 'Moderate', 'The safe default, used here'],
            ['vCard 4.0', 'Patchy on older Android and Outlook', 'Similar to 3.0', 'Newer spec, worse real-world support'],
            ['MECARD', 'Good on Android, weak on iOS', 'Smallest', 'Only worth it when size is critical'],
          ],
        },
        {
          type: 'p',
          text: 'This tool emits **vCard 3.0**. It is not the newest revision, but it is the one every phone, every mail client and every CRM importer handles without complaint. vCard 4.0 offers better structure for edge cases nobody encodes into a QR code anyway, and pays for it with importer quirks.',
        },
        {
          type: 'code',
          label: 'vCard 3.0',
          code: `BEGIN:VCARD
VERSION:3.0
N:Lovelace;Ada;;;
FN:Ada Lovelace
ORG:Analytical Engines Ltd
TITLE:Lead Engineer
TEL;TYPE=CELL:+44 20 7946 0958
EMAIL:ada@example.com
URL:https://example.com
ADR;TYPE=WORK:;;12 Baker St;London;;NW1 6XE;UK
END:VCARD`,
        },
        {
          type: 'p',
          text: 'Two details in that snippet matter more than they look. **N:** stores the name in structured form as `last;first;middle;prefix;suffix`, while **FN:** is the display name — importers need both. And every line ends with a **carriage return plus line feed**, not a bare newline. Some iOS importers reject a card that uses LF alone, which is a bug that is almost impossible to diagnose from the phone side.',
        },
      ],
    },
    {
      heading: 'Keeping the code scannable — capacity is the real constraint',
      blocks: [
        {
          type: 'p',
          text: 'A vCard is far larger than a URL, and every field you add pushes the code to a higher version with smaller modules. On a business card printed at 2 cm, that difference decides whether the code scans on the first try or the third.',
        },
        {
          type: 'table',
          headers: ['What you include', 'Roughly', 'Version at level M', 'Scans well at 2 cm?'],
          rows: [
            ['Name, mobile, email', '~120 bytes', '~7', 'Yes, comfortably'],
            ['+ company and job title', '~170 bytes', '~9', 'Yes'],
            ['+ website', '~200 bytes', '~10', 'Usually'],
            ['+ full postal address', '~290 bytes', '~13', 'Marginal — print larger'],
            ['+ a long note', '~400 bytes', '~16', 'No — enlarge or trim'],
          ],
        },
        { type: 'h3', text: 'What to cut first' },
        {
          type: 'ul',
          items: [
            '**The note field** — almost always the worst value per byte',
            '**The postal address** — unless people genuinely post you letters, this is dead weight',
            '**The second phone number** — one reachable number beats two unscannable ones',
            '**Long URLs** — link to a short domain rather than a deep path',
          ],
        },
        {
          type: 'p',
          text: 'A useful rule for print: if the code needs a version above 12 to hold your data, either enlarge the printed code or trim fields. The live preview here shows the byte count and warns before you cross into territory that will not survive a business card.',
        },
      ],
    },
    {
      heading: 'Escaping — why a comma in a job title can break the import',
      blocks: [
        {
          type: 'p',
          text: 'vCard uses semicolons and commas as structural delimiters, so both must be escaped inside values. A job title like "Head of Sales, EMEA" contains a comma that an unescaped encoder passes straight through — the importer then reads it as a field separator and mangles the record.',
        },
        {
          type: 'code',
          label: 'Escaping rules',
          code: `# Wrong — the comma reads as a delimiter
TITLE:Head of Sales, EMEA

# Correct
TITLE:Head of Sales\\, EMEA

# Semicolons too
ORG:Acme\\; Inc

# And line breaks become a literal \\n sequence
NOTE:First line\\nSecond line`,
        },
        {
          type: 'p',
          text: 'This tool escapes backslash, semicolon and comma in every value, and converts line breaks in the note field to the literal `\\n` sequence the specification requires. You can type punctuation naturally and it will import correctly.',
        },
      ],
    },
    {
      heading: 'Where a vCard code belongs — and where it does not',
      blocks: [
        { type: 'h3', text: 'Good fits' },
        {
          type: 'ul',
          items: [
            '**Business cards** — the classic use, and the reason SVG export matters. Print it on the back at 2 cm or larger',
            '**Conference badges** — attendees swap contacts with a scan instead of typing',
            '**Email signatures** — a small PNG that recipients can scan from their screen',
            '**Shop windows and vehicle livery** — for trades where people want to save your number on the spot',
            '**Trade show stands** — far better conversion than a bowl of paper cards nobody reads later',
            '**Real estate and property signage** — a buyer saves the agent\'s number from the yard sign without pulling over to type it in',
          ],
        },
        { type: 'h3', text: 'Poor fits' },
        {
          type: 'ul',
          items: [
            '**Details that change often** — the code is static, so a new phone number means reprinting everything',
            '**Personal contact details in public** — the code is machine-readable by anyone who photographs it',
            '**Anything needing analytics** — a static vCard cannot tell you how many people scanned it',
            '**Shared team or department numbers** — these rotate more often than one person\'s card, and a reprint cycle nobody owns is how outdated codes end up in circulation',
          ],
        },
        {
          type: 'p',
          text: 'That last point is worth stating plainly, because it is the main argument for the paid dynamic-QR services. If you genuinely need scan counts, you need a redirect service and the dependency that comes with it. If you just want people to save your number, a static vCard is simpler, free, private and permanent — and most people printing a business card fall squarely into that second group.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is a vCard QR code?',
      answer: 'It is a QR code containing a complete contact record in vCard format. Scanning it opens the phone\'s "add contact" screen prefilled with your name, phone, email, company and address — no typing, no app.',
    },
    {
      question: 'Which vCard version does this generate?',
      answer: 'vCard 3.0. It is not the newest revision, but it is the one that imports reliably on iOS, Android, Outlook, macOS Contacts and every mainstream CRM. vCard 4.0 has patchier support on older Android builds and in Outlook.',
    },
    {
      question: 'Should I use vCard or MECARD?',
      answer: 'vCard, in nearly every case. MECARD produces a smaller code, which helps when space is critical, but its support on iOS is unreliable. vCard 3.0 works everywhere and the size difference rarely justifies the risk.',
    },
    {
      question: 'How much information can I include?',
      answer: 'Technically up to about 2 300 bytes, but practically much less. Every field raises the QR version and shrinks the modules. Name, mobile, email, company and title produce a code that scans comfortably at 2 cm. Adding a full address and a note pushes it to a density that struggles at business-card size.',
    },
    {
      question: 'Can I update the contact details later?',
      answer: 'Not in an already-printed code. A static vCard has the data baked into the pattern, so any change means generating a new code and reprinting. If details change often, consider putting a link to a contact page in a plain URL QR code instead.',
    },
    {
      question: 'Will it work on both iPhone and Android?',
      answer: 'Yes. Both platforms recognise vCard payloads with the built-in camera and offer to create a contact. This is one reason the tool uses CRLF line endings — some iOS importers reject cards that use bare line feeds.',
    },
    {
      question: 'My job title contains a comma. Will that break it?',
      answer: 'No. Commas, semicolons and backslashes are escaped automatically as the vCard specification requires. Unescaped punctuation is a real failure mode in other generators, where a comma is read as a field delimiter and mangles the imported record.',
    },
    {
      question: 'Can I put a photo in the vCard QR code?',
      answer: 'Not practically. vCard supports an embedded PHOTO property, but even a small compressed image pushes the payload well past what a QR code can hold at a scannable density. Link to a photo URL instead if you need one.',
    },
    {
      question: 'What size should I print it on a business card?',
      answer: 'At least 2 × 2 cm for a compact card containing name, phone and email. Denser cards with a full address need 2.5 cm or more. Always export as SVG for print so the module edges stay sharp, and never crop the white margin.',
    },
    {
      question: 'Is my contact information uploaded anywhere?',
      answer: 'No. Everything is encoded in your browser and nothing is transmitted. There is no backend, no analytics on your input and no storage — the page works with the network disconnected.',
    },
    {
      question: 'Can I add my company logo?',
      answer: 'Yes. Error correction switches to level H automatically when you add a logo, recovering up to 30% of the covered pattern. Because vCards are already dense, test the result on two phones before committing to a print run.',
    },
    {
      question: 'Can I track how many people scan my card?',
      answer: 'No, and that is inherent to static codes rather than a limitation of this tool. Scan tracking requires routing through a redirect service, which means a subscription and a code that breaks if the service goes away. A static vCard trades analytics for permanence and privacy.',
    },
  ],
  relatedTools: [
    { to: '/qr-code-generator', name: 'QR Code Generator', desc: 'Generate a QR code for any link with custom colors, a logo and SVG export' },
    { to: '/wifi-qr-code-generator', name: 'WiFi QR Code Generator', desc: 'Let guests join your network by scanning — handles WPA3 and special characters' },
    { to: '/text-to-qr-code-generator', name: 'Text to QR Code Generator', desc: 'Encode a plain-text note that displays on scan with no internet needed' },
  ],
}

// ─── Per-type map ─────────────────────────────────────────────────────────────

const CONTENT_BY_TYPE = {
  url: URL_PAGE,
  text: TEXT_PAGE,
  wifi: WIFI_PAGE,
  vcard: VCARD_PAGE,
}

export function buildContent(type) {
  return CONTENT_BY_TYPE[type] ?? URL_PAGE
}
