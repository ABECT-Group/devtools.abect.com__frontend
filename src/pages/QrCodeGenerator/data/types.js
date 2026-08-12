// Field config per QR content type — mirrors JsonLdGenerator's data/schemas.js.
//
// {
//   key         string   — key in the values object, read by encodePayload.js
//   label       string   — UI label
//   inputType   'text' | 'url' | 'textarea' | 'number' | 'select' | 'date' | 'time' | 'tel' | 'email' | 'checkbox'
//   required    boolean  — without it no code can be built
//   group       string?  — groups fields under a shared subheading
//   placeholder string?
//   hint        string?
//   tooltip     string?
//   maxLength   number?
//   options     { value, label }[] — for select
// }

export const QR_TYPES = {

  url: {
    label: 'Link / URL',
    description: 'Any web address — opens straight in the phone browser. The most scanned QR type by far.',
    fields: [
      {
        key: 'content',
        label: 'URL',
        inputType: 'textarea',
        required: true,
        placeholder: 'https://example.com',
        hint: 'Include https:// so the code opens as a link. For plain text that is not a link, use the Text tab.',
        tooltip: 'Shorter URLs produce a lower QR version with larger, easier-to-scan modules. A link under 40 characters stays comfortably readable even printed small.',
      },
    ],
  },

  text: {
    label: 'Text',
    description: 'Plain text shown on screen the moment it is scanned — no link, no website, no internet needed.',
    fields: [
      {
        key: 'content',
        label: 'Text',
        inputType: 'textarea',
        required: true,
        placeholder: 'Batch 2026-A · Best before 09/2027 · Store below 18 °C',
        hint: 'Whatever you type here is what the phone displays. Nothing is opened and nothing is loaded.',
        tooltip: 'Plain text is stored directly inside the pattern, so the code works with no network at all. Keep it short — every character raises the QR version and shrinks the modules.',
      },
    ],
  },

  wifi: {
    label: 'WiFi',
    description: 'Join a network by scanning — no password typing. Works natively on iOS 11+ and Android 10+.',
    fields: [
      {
        key: 'ssid',
        label: 'Network name (SSID)',
        inputType: 'text',
        required: true,
        placeholder: 'MyHomeNetwork',
        hint: 'Exactly as it appears in the WiFi list — SSIDs are case-sensitive.',
      },
      {
        key: 'encryption',
        label: 'Security',
        inputType: 'select',
        options: [
          { value: 'WPA', label: 'WPA / WPA2 / WPA3' },
          { value: 'WEP', label: 'WEP (legacy)' },
          { value: 'nopass', label: 'Open — no password' },
        ],
        hint: 'WPA covers WPA, WPA2 and WPA3 — they share one QR keyword.',
      },
      {
        key: 'password',
        label: 'Password',
        inputType: 'text',
        placeholder: 'Network password',
        hint: 'Special characters are escaped automatically — ; : , " and backslash are safe to use.',
        tooltip: 'Most free generators do not escape these five characters, which silently truncates the password at the first one. This tool escapes them per the WiFi QR specification.',
      },
      {
        key: 'hidden',
        label: 'Hidden network',
        inputType: 'checkbox',
        hint: 'Tick only if the network does not broadcast its SSID.',
      },
    ],
  },

  vcard: {
    label: 'vCard (Contact)',
    description: 'A full contact card — scanning offers to save it straight into the phone address book.',
    fields: [
      { key: 'firstName', label: 'First name', inputType: 'text', required: true, group: 'Name' },
      { key: 'lastName', label: 'Last name', inputType: 'text', group: 'Name' },

      { key: 'organization', label: 'Company', inputType: 'text', group: 'Work' },
      { key: 'jobTitle', label: 'Job title', inputType: 'text', group: 'Work' },

      { key: 'mobile', label: 'Mobile phone', inputType: 'tel', placeholder: '+1 555 010 1234', group: 'Contact' },
      { key: 'phone', label: 'Work phone', inputType: 'tel', group: 'Contact' },
      { key: 'email', label: 'Email', inputType: 'email', placeholder: 'name@company.com', group: 'Contact' },
      { key: 'website', label: 'Website', inputType: 'url', placeholder: 'https://example.com', group: 'Contact' },

      { key: 'street', label: 'Street', inputType: 'text', group: 'Address' },
      { key: 'city', label: 'City', inputType: 'text', group: 'Address' },
      { key: 'region', label: 'State / region', inputType: 'text', group: 'Address' },
      { key: 'zip', label: 'Postal code', inputType: 'text', group: 'Address' },
      { key: 'country', label: 'Country', inputType: 'text', group: 'Address' },

      {
        key: 'note',
        label: 'Note',
        inputType: 'textarea',
        group: 'Address',
        hint: 'Keep it short — every character raises the QR version and shrinks the modules.',
      },
    ],
    collapsedGroups: ['Address'],
  },
}

/** Types with a live page, in tab order. Extend as pages ship. */
export const QR_TYPE_KEYS = ['url', 'text', 'wifi', 'vcard']

export const DEFAULT_STYLE = {
  size: 512,
  // 1 module keeps the on-screen preview compact. The spec asks for 4, and the
  // control hint tells anyone exporting for print to raise it.
  margin: 1,
  foreground: '#000000',
  background: '#ffffff',
  transparent: false,
  ecc: 'M',
  dotStyle: 'square',
  logoRatio: 0,
}

/** Logo coverage as a fraction of the matrix side. ~22% area is the safe ceiling. */
export const LOGO_RATIO = 0.22

export const ECC_OPTIONS = [
  { value: 'L', label: 'L — 7%' },
  { value: 'M', label: 'M — 15%' },
  { value: 'Q', label: 'Q — 25%' },
  { value: 'H', label: 'H — 30%' },
]

export const DOT_STYLE_OPTIONS = [
  { value: 'square', label: 'Square' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'dots', label: 'Dots' },
]

export const SIZE_OPTIONS = [
  { value: 256, label: '256 px' },
  { value: 512, label: '512 px' },
  { value: 1024, label: '1024 px' },
  { value: 2048, label: '2048 px' },
]
