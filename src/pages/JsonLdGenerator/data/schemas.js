// Source: https://developers.google.com/search/docs/appearance/structured-data/
// Required / recommended status matches Google's Rich Results documentation.

// ─── Field shape ──────────────────────────────────────────────────────────────
//
// {
//   key         string   — key in the values object, used in buildSchema.js
//   label       string   — UI label shown to the user
//   inputType   string   — 'text' | 'url' | 'textarea' | 'number' | 'select' | 'date' | 'array'
//   required    boolean  — required by Google for Rich Results eligibility
//   recommended boolean  — recommended by Google, not strictly required
//   group       string?  — groups fields under a shared subheading in the form
//   placeholder string?  — input placeholder text
//   hint        string?  — small helper text shown below the field
//   maxLength   number?  — shows character counter, warns if exceeded
//   min         number?  — for number inputs
//   max         number?  — for number inputs
//   step        number?  — for number inputs
//   options     string[] — for select inputs
// }

export const SCHEMA_CONFIGS = {

  // ─── PRODUCT ────────────────────────────────────────────────────────────────
  // https://developers.google.com/search/docs/appearance/structured-data/product-snippet
  // Required for Rich Results: name + at least one of (offers | aggregateRating | review)

  product: {
    type: 'Product',
    label: 'Product',
    description: 'E-commerce product pages — enables price, rating, and availability in Google Search.',
    googleDocsUrl: 'https://developers.google.com/search/docs/appearance/structured-data/product-snippet',
    collapsedGroups: ['Offer', 'Product Identifiers', 'Aggregate Rating', 'Shipping Details', 'Return Policy'],
    fields: [
      {
        key: 'name',
        label: 'Product name',
        inputType: 'text',
        required: true,
        hint: 'Required. Full product name as displayed on the page.',
      },
      {
        key: 'description',
        label: 'Description',
        inputType: 'textarea',
        recommended: true,
        hint: 'Overview of the product\'s key features.',
      },
      {
        key: 'image',
        label: 'Image URL',
        inputType: 'url',
        recommended: true,
        placeholder: 'https://example.com/product.jpg',
        hint: 'Direct URL to product image',
        tooltip: 'Multiple aspect ratios recommended (1:1, 4:3, 16:9). Minimum 50K pixels total. Must be crawlable — no login required to access the image URL.',
      },
      {
        key: 'sku',
        label: 'SKU',
        inputType: 'text',
        recommended: true,
        hint: 'Merchant-specific identifier for the product.',
      },
      {
        key: 'brand',
        label: 'Brand name',
        inputType: 'text',
        recommended: true,
        hint: 'The brand of the product.',
      },

      // Offer group
      {
        key: 'price',
        label: 'Price',
        inputType: 'number',
        required: true,
        group: 'Offer',
        min: 0,
        step: 0.01,
        hint: 'Required for Rich Results. Use 0 for free products.',
      },
      {
        key: 'priceCurrency',
        label: 'Currency',
        inputType: 'select',
        required: true,
        group: 'Offer',
        options: ['USD', 'EUR', 'GBP', 'UAH', 'PLN', 'CAD', 'AUD', 'JPY', 'CHF', 'SEK', 'NOK', 'DKK', 'CZK', 'HUF', 'RON', 'BGN', 'HRK'],
        hint: 'ISO 4217 three-letter currency code.',
      },
      {
        key: 'availability',
        label: 'Availability',
        inputType: 'select',
        recommended: true,
        group: 'Offer',
        options: ['InStock', 'OutOfStock', 'PreOrder', 'BackOrder', 'Discontinued', 'LimitedAvailability', 'InStoreOnly', 'OnlineOnly', 'PreSale', 'SoldOut'],
        hint: 'Google maps this to schema.org/[value] automatically.',
      },
      {
        key: 'itemCondition',
        label: 'Condition',
        inputType: 'select',
        recommended: true,
        group: 'Offer',
        options: ['NewCondition', 'RefurbishedCondition', 'UsedCondition', 'DamagedCondition'],
        hint: 'Physical condition of the product.',
      },
      {
        key: 'offerUrl',
        label: 'Buy URL',
        inputType: 'url',
        recommended: true,
        group: 'Offer',
        placeholder: 'https://example.com/product/buy',
        hint: 'URL of the page where the product can be purchased.',
      },
      {
        key: 'priceValidUntil',
        label: 'Price valid until',
        inputType: 'date',
        recommended: true,
        group: 'Offer',
        hint: 'ISO 8601 date',
        tooltip: 'Date after which the listed price may no longer apply. Google may show a "price expired" notice in Rich Results if this date has passed.',
      },

      // Product Identifiers group
      {
        key: 'gtin',
        label: 'GTIN',
        inputType: 'text',
        recommended: true,
        group: 'Product Identifiers',
        placeholder: '012345678901',
        hint: 'e.g. "4006381333931" (EAN-13)',
        tooltip: 'Google uses the GTIN to match your product across merchants. Strongly recommended — it increases Rich Results eligibility. Use gtin8 (8 digits), gtin12 (UPC), gtin13 (EAN), or gtin14 depending on your barcode type.',
      },
      {
        key: 'mpn',
        label: 'MPN',
        inputType: 'text',
        recommended: true,
        group: 'Product Identifiers',
        hint: 'Use when product has no GTIN',
        tooltip: 'Manufacturer Part Number assigned by the product maker. Only include mpn when the product has no GTIN barcode. Helps Google identify the specific variant.',
      },

      // Aggregate Rating group
      {
        key: 'ratingValue',
        label: 'Rating value',
        inputType: 'number',
        recommended: true,
        group: 'Aggregate Rating',
        min: 0,
        max: 5,
        step: 0.1,
        hint: 'Average score (0–5)',
        tooltip: 'Average rating across all reviews. Required alongside reviewCount for star ratings in Rich Results. Only include if real user reviews are visible on the page — fake ratings violate Google\'s guidelines.',
      },
      {
        key: 'reviewCount',
        label: 'Number of ratings',
        inputType: 'number',
        recommended: true,
        group: 'Aggregate Rating',
        min: 1,
        step: 1,
        hint: 'Total number of reviews',
        tooltip: 'Total count of ratings or reviews. Must be a positive integer. Required alongside ratingValue for star ratings to appear in Rich Results.',
      },
      {
        key: 'bestRating',
        label: 'Best possible rating',
        inputType: 'number',
        recommended: true,
        group: 'Aggregate Rating',
        min: 1,
        step: 1,
        placeholder: '5',
        hint: 'Max of the scale (default 5)',
        tooltip: 'Highest value in the rating scale. Defaults to 5 if omitted. Only change this if your review scale is not out of 5.',
      },
      {
        key: 'worstRating',
        label: 'Worst possible rating',
        inputType: 'number',
        recommended: true,
        group: 'Aggregate Rating',
        min: 0,
        step: 1,
        placeholder: '1',
        hint: 'Min of the scale (default 1)',
        tooltip: 'Lowest value in the rating scale. Defaults to 1 if omitted. Only change this if your review scale does not start at 1.',
      },

      // Shipping Details group
      {
        key: 'shippingCost',
        label: 'Shipping cost',
        inputType: 'number',
        recommended: true,
        group: 'Shipping Details',
        min: 0,
        step: 0.01,
        placeholder: '0',
        hint: '0 = free shipping',
        tooltip: 'Shipping cost for this offer. Set to 0 for free shipping. Filling this field eliminates the "shippingDetails missing" warning in Google\'s Rich Results Test.',
      },
      {
        key: 'shippingCurrency',
        label: 'Shipping currency',
        inputType: 'select',
        recommended: true,
        group: 'Shipping Details',
        options: ['USD', 'EUR', 'GBP', 'UAH', 'PLN', 'CAD', 'AUD', 'JPY', 'CHF', 'SEK', 'NOK', 'DKK', 'CZK', 'HUF', 'RON', 'BGN', 'HRK'],
        hint: 'ISO 4217 currency code',
      },
      {
        key: 'shippingCountry',
        label: 'Ships to (country code)',
        inputType: 'text',
        recommended: true,
        group: 'Shipping Details',
        placeholder: 'US',
        hint: 'ISO 3166-1 alpha-2 code',
        tooltip: 'Two-letter country code for the shipping destination, e.g. US, GB, DE. Required for Google to display shipping info in Product Rich Results.',
      },
      {
        key: 'deliveryMin',
        label: 'Min delivery days',
        inputType: 'number',
        recommended: true,
        group: 'Shipping Details',
        min: 0,
        step: 1,
        placeholder: '3',
        hint: 'Business days (transit)',
        tooltip: 'Minimum number of business days for delivery (transit time only, not handling). Filling this field eliminates the "deliveryTime missing" warning in Google\'s Rich Results Test.',
      },
      {
        key: 'deliveryMax',
        label: 'Max delivery days',
        inputType: 'number',
        recommended: true,
        group: 'Shipping Details',
        min: 0,
        step: 1,
        placeholder: '7',
        hint: 'Business days (transit)',
        tooltip: 'Maximum number of business days for delivery. Set equal to min if the delivery window is fixed (e.g. always 5 days).',
      },
      {
        key: 'handlingMin',
        label: 'Min handling days',
        inputType: 'number',
        recommended: true,
        group: 'Shipping Details',
        min: 0,
        step: 1,
        placeholder: '0',
        hint: 'Business days to prepare',
        tooltip: 'Minimum business days to process and pack the order before handing it to the carrier. Eliminates the "handlingTime missing" warning. Use 0 for same-day dispatch.',
      },
      {
        key: 'handlingMax',
        label: 'Max handling days',
        inputType: 'number',
        recommended: true,
        group: 'Shipping Details',
        min: 0,
        step: 1,
        placeholder: '1',
        hint: 'Business days to prepare',
        tooltip: 'Maximum business days to process and pack the order. Set equal to min if the handling window is fixed.',
      },

      // Return Policy group
      {
        key: 'returnPolicyCategory',
        label: 'Return policy',
        inputType: 'select',
        recommended: true,
        group: 'Return Policy',
        options: ['MerchantReturnUnlimitedWindow', 'MerchantReturnFiniteReturnWindow', 'MerchantReturnNotPermitted', 'MerchantReturnUnspecified'],
        hint: 'Removes return policy warning',
        tooltip: 'Filling this field eliminates the "hasMerchantReturnPolicy missing" warning. Choose "unlimited" for open-ended policies, "finite" if you have a specific return window (e.g. 30 days), "notPermitted" if returns are not accepted.',
      },
      {
        key: 'returnDays',
        label: 'Return window (days)',
        inputType: 'number',
        recommended: true,
        group: 'Return Policy',
        min: 0,
        step: 1,
        hint: 'Days from purchase date',
        tooltip: 'Required when returnPolicyCategory is "MerchantReturnFiniteReturnWindow". Number of days from the purchase date the customer has to initiate a return.',
      },
      {
        key: 'returnCountry',
        label: 'Return country code',
        inputType: 'text',
        recommended: true,
        group: 'Return Policy',
        placeholder: 'US',
        hint: 'ISO 3166-1 alpha-2 code',
        tooltip: 'Two-letter country code this return policy applies to, e.g. US, GB. Add one entry per country if the policy differs by market.',
      },
      {
        key: 'returnMethod',
        label: 'Return method',
        inputType: 'select',
        recommended: true,
        group: 'Return Policy',
        options: ['ReturnByMail', 'ReturnInStore', 'ReturnAtKiosk'],
      },
      {
        key: 'returnFees',
        label: 'Return fees',
        inputType: 'select',
        recommended: true,
        group: 'Return Policy',
        options: ['FreeReturn', 'ReturnFeesCustomerResponsibility', 'ReturnShippingFees'],
      },
    ],
  },

  // ─── ARTICLE ────────────────────────────────────────────────────────────────
  // https://developers.google.com/search/docs/appearance/structured-data/article
  // No strictly required properties — all are recommended.
  // Improves appearance in Google News, Discover, and Search.

  article: {
    type: 'Article',
    label: 'Article',
    description: 'Blog posts and news articles — enables author, date, and image in Google News and Discover.',
    googleDocsUrl: 'https://developers.google.com/search/docs/appearance/structured-data/article',
    collapsedGroups: ['Author', 'Publisher'],
    fields: [
      {
        key: 'headline',
        label: 'Headline',
        inputType: 'text',
        recommended: true,
        maxLength: 110,
        hint: 'Max 110 chars recommended',
        tooltip: 'Google may truncate headlines over 110 characters on mobile and in Discover feeds. Match the visible H1 on the page for best results.',
      },
      {
        key: 'description',
        label: 'Description',
        inputType: 'textarea',
        recommended: true,
        hint: 'A summary of the article.',
      },
      {
        key: 'image',
        label: 'Image URL',
        inputType: 'url',
        recommended: true,
        placeholder: 'https://example.com/article-cover.jpg',
        hint: 'Min 50K px, multiple ratios',
        tooltip: 'High-resolution image — minimum 50,000 total pixels. Provide 16:9, 4:3, and 1:1 variants so Google can select the best crop for Discover, AMP, and News surfaces.',
      },
      {
        key: 'articleUrl',
        label: 'Article URL',
        inputType: 'url',
        recommended: true,
        placeholder: 'https://example.com/blog/my-article',
        hint: 'Canonical URL of the article page.',
      },
      {
        key: 'datePublished',
        label: 'Date published',
        inputType: 'date',
        recommended: true,
        hint: 'ISO 8601, include timezone',
      },
      {
        key: 'dateModified',
        label: 'Date modified',
        inputType: 'date',
        recommended: true,
        hint: 'Must be ≥ datePublished',
        tooltip: 'Date of the most recent significant change. Must not be earlier than datePublished. Google uses this for freshness signals in News and Discover.',
      },

      // Author group
      {
        key: 'authorName',
        label: 'Author name',
        inputType: 'text',
        recommended: true,
        group: 'Author',
        hint: 'Used for E-E-A-T signals',
        tooltip: 'Google uses the author name and URL to evaluate E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). Link to an author bio page for strongest signals.',
      },
      {
        key: 'authorType',
        label: 'Author type',
        inputType: 'select',
        recommended: true,
        group: 'Author',
        options: ['Person', 'Organization'],
        hint: 'Person or Organization',
        tooltip: 'Use "Person" for individual authors, "Organization" for editorial teams. "Person" with a linked profile URL provides stronger E-E-A-T signals.',
      },
      {
        key: 'authorUrl',
        label: 'Author profile URL',
        inputType: 'url',
        recommended: true,
        group: 'Author',
        placeholder: 'https://example.com/about/author',
        hint: 'Author bio or social URL',
        tooltip: 'URL that uniquely identifies the author — personal website, LinkedIn, or About page. Do not use the article URL itself. Required for strong E-E-A-T signals in Google News.',
      },

      // Publisher group
      {
        key: 'publisherName',
        label: 'Publisher name',
        inputType: 'text',
        recommended: true,
        group: 'Publisher',
        hint: 'Name of the publishing organization.',
      },
      {
        key: 'publisherLogo',
        label: 'Publisher logo URL',
        inputType: 'url',
        recommended: true,
        group: 'Publisher',
        placeholder: 'https://example.com/logo.png',
        hint: 'Must be crawlable by Google',
        tooltip: 'URL to the publisher\'s logo. Must be accessible without login. Used in Google AMP and News Rich Results. Recommended dimensions: 60×600 px or smaller.',
      },
    ],
  },

  // ─── FAQPAGE ────────────────────────────────────────────────────────────────
  // https://developers.google.com/search/docs/appearance/structured-data/faqpage
  // Required: mainEntity with at least 1 Question + acceptedAnswer.
  // Enables expandable Q&A accordion directly in Google Search results.

  faq: {
    type: 'FAQPage',
    label: 'FAQ',
    description: 'Pages with Q&A content — shows expandable answers directly in Google Search results.',
    googleDocsUrl: 'https://developers.google.com/search/docs/appearance/structured-data/faqpage',
    fields: [],
    specialField: 'faqItems',
    specialFieldConfig: {
      minItems: 1,
      defaultItems: 3,
      questionLabel: 'Question',
      questionHint: 'Full text of the question. Google may display the entire question text.',
      answerLabel: 'Answer',
      answerHint: 'Full answer text. Supports basic HTML: <p>, <ul>, <ol>, <li>, <a>, <b>, <strong>, <i>, <em>.',
    },
  },

  // ─── ORGANIZATION ───────────────────────────────────────────────────────────
  // https://developers.google.com/search/docs/appearance/structured-data/organization
  // No required properties — all recommended.
  // Used for Knowledge Panel, brand signals, and E-E-A-T.

  organization: {
    type: 'Organization',
    label: 'Organization',
    description: 'Company or brand pages — contributes to Google Knowledge Panel and E-E-A-T signals.',
    googleDocsUrl: 'https://developers.google.com/search/docs/appearance/structured-data/organization',
    collapsedGroups: ['Legal & Details', 'Address'],
    fields: [
      // ── Main info (always visible) ──────────────────────────────────────────
      {
        key: 'name',
        label: 'Organization name',
        inputType: 'text',
        recommended: true,
        hint: 'Should match the name used across the site.',
      },
      {
        key: 'url',
        label: 'Website URL',
        inputType: 'url',
        recommended: true,
        placeholder: 'https://example.com',
        hint: 'The organization\'s main website.',
      },
      {
        key: 'logo',
        label: 'Logo URL',
        inputType: 'url',
        recommended: true,
        placeholder: 'https://example.com/logo.png',
        hint: 'Min 112×112 px',
        tooltip: 'Minimum 112×112 px. Must be crawlable and indexable by Google — no login required. Used for the Knowledge Panel and other brand features.',
      },
      {
        key: 'image',
        label: 'Image URL',
        inputType: 'url',
        recommended: true,
        placeholder: 'https://example.com/about/office.jpg',
        hint: 'Photo of the organization or office',
        tooltip: 'An image that represents the organization — a photo of the office, team, or headquarters. Distinct from the logo. Helps Google populate the Knowledge Panel with a visual.',
      },
      {
        key: 'description',
        label: 'Description',
        inputType: 'textarea',
        recommended: true,
        hint: 'Detailed description of the organization.',
      },
      {
        key: 'email',
        label: 'Email',
        inputType: 'text',
        recommended: true,
        placeholder: 'contact@example.com',
        hint: 'Primary contact email.',
      },
      {
        key: 'telephone',
        label: 'Telephone',
        inputType: 'text',
        recommended: true,
        placeholder: '+1-800-555-1234',
        hint: 'Include country and area code.',
      },
      {
        key: 'sameAs',
        label: 'Social & profile URLs',
        inputType: 'array',
        recommended: true,
        placeholder: 'https://linkedin.com/company/...',
        hint: 'LinkedIn, Twitter, Facebook…',
        tooltip: 'Add one URL per row — LinkedIn, Twitter/X, Facebook, Wikipedia, Crunchbase, GitHub, etc. Google uses these to build the Knowledge Panel and cross-reference brand signals.',
      },

      // ── Legal & Details (collapsed) ─────────────────────────────────────────
      {
        key: 'legalName',
        label: 'Legal name',
        inputType: 'text',
        recommended: true,
        group: 'Legal & Details',
        hint: 'Registered legal name if different from the display name.',
      },
      {
        key: 'alternateName',
        label: 'Alternate name',
        inputType: 'text',
        recommended: true,
        group: 'Legal & Details',
        hint: 'Abbreviation or trade name',
        tooltip: 'Other common names the organization goes by — abbreviations, former names, or trade names. Google uses this to recognize the brand across different references.',
      },
      {
        key: 'foundingDate',
        label: 'Founding date',
        inputType: 'date',
        recommended: true,
        group: 'Legal & Details',
        hint: 'ISO 8601 date when the organization was founded.',
      },

      // ── Address (collapsed) ─────────────────────────────────────────────────
      {
        key: 'streetAddress',
        label: 'Street address',
        inputType: 'text',
        recommended: true,
        group: 'Address',
      },
      {
        key: 'addressLocality',
        label: 'City',
        inputType: 'text',
        recommended: true,
        group: 'Address',
      },
      {
        key: 'addressRegion',
        label: 'State / Region',
        inputType: 'text',
        recommended: true,
        group: 'Address',
        placeholder: 'CA',
      },
      {
        key: 'postalCode',
        label: 'Postal code',
        inputType: 'text',
        recommended: true,
        group: 'Address',
      },
      {
        key: 'addressCountry',
        label: 'Country code',
        inputType: 'text',
        recommended: true,
        group: 'Address',
        placeholder: 'US',
        hint: 'Two-letter ISO 3166-1 alpha-2 code.',
      },
    ],
  },

  // ─── LOCAL BUSINESS ─────────────────────────────────────────────────────────
  // https://developers.google.com/search/docs/appearance/structured-data/local-business
  // Required: name, address.
  // Enables map card, business hours, and phone number in Google Search.

  'local-business': {
    type: 'LocalBusiness',
    label: 'Local Business',
    description: 'Physical locations — enables map cards, opening hours, and phone in Google Search.',
    googleDocsUrl: 'https://developers.google.com/search/docs/appearance/structured-data/local-business',
    collapsedGroups: ['Opening Hours', 'Geo Coordinates', 'Additional Details'],
    fields: [
      // ── Main info + Address (always visible) ────────────────────────────────
      {
        key: 'name',
        label: 'Business name',
        inputType: 'text',
        required: true,
        hint: 'Required. Name of the business exactly as shown on-site.',
      },
      {
        key: 'businessType',
        label: 'Business type',
        inputType: 'select',
        recommended: true,
        options: [
          'LocalBusiness', 'Restaurant', 'CafeOrCoffeeShop', 'Bakery', 'BarOrPub',
          'FastFoodRestaurant', 'IceCreamShop', 'Winery',
          'Hotel', 'Motel', 'BedAndBreakfast', 'Hostel',
          'Store', 'ClothingStore', 'BookStore', 'ElectronicsStore',
          'GroceryStore', 'HomeGoodsStore', 'JewelryStore',
          'ShoeStore', 'ToyStore', 'SportingGoodsStore',
          'HairSalon', 'BeautySalon', 'DaySpa', 'HealthClub', 'NailSalon',
          'Dentist', 'Physician', 'Hospital', 'Pharmacy', 'Optician',
          'Veterinary', 'MedicalClinic',
          'AutoRepair', 'AutoDealer',
          'Electrician', 'Plumber', 'HVACBusiness', 'Locksmith',
          'RoofingContractor', 'GeneralContractor',
          'LegalService', 'Notary', 'AccountingService',
          'RealEstateAgent', 'InsuranceAgency',
          'Library', 'Museum', 'MovieTheater', 'AmusementPark',
          'GolfCourse', 'SportsClub', 'BowlingAlley',
          'School', 'CollegeOrUniversity',
          'Church', 'MosqueOrTemple',
        ],
        hint: 'Most specific Schema.org type',
        tooltip: 'Use the most specific type — Google uses it for Knowledge Panel classification. "Restaurant" is better than "LocalBusiness". Choose "LocalBusiness" only if no specific type applies.',
      },
      {
        key: 'description',
        label: 'Description',
        inputType: 'textarea',
        recommended: true,
      },
      {
        key: 'url',
        label: 'Website URL',
        inputType: 'url',
        recommended: true,
        placeholder: 'https://example.com',
        hint: 'Link to this location page',
        tooltip: 'Must be a working link to the specific business location page, not the homepage. Google uses this URL to connect the schema to your Google Business Profile.',
      },
      {
        key: 'telephone',
        label: 'Phone number',
        inputType: 'text',
        recommended: true,
        placeholder: '+1-800-555-1234',
        hint: 'Primary contact phone including country code.',
      },
      {
        key: 'image',
        label: 'Photo URL',
        inputType: 'url',
        recommended: true,
        placeholder: 'https://example.com/storefront.jpg',
        hint: 'Photo of the business location.',
      },
      {
        key: 'priceRange',
        label: 'Price range',
        inputType: 'select',
        recommended: true,
        options: ['$', '$$', '$$$', '$$$$'],
        hint: 'Relative price indicator.',
        tooltip: '$ = budget (under $10–15 per person), $$ = mid-range ($15–40), $$$ = upscale ($40–100), $$$$ = fine dining ($100+). Displayed next to your business name in Google local results. Use the tier that matches your actual average spend.',
      },
      {
        key: 'streetAddress',
        label: 'Street address',
        inputType: 'text',
        required: true,
        hint: 'Required. Full street address.',
      },
      {
        key: 'addressLocality',
        label: 'City',
        inputType: 'text',
        required: true,
      },
      {
        key: 'addressRegion',
        label: 'State / Region',
        inputType: 'text',
        recommended: true,
        placeholder: 'CA',
        hint: 'State, province, or region abbreviation.',
      },
      {
        key: 'postalCode',
        label: 'Postal code',
        inputType: 'text',
        recommended: true,
      },
      {
        key: 'addressCountry',
        label: 'Country code',
        inputType: 'text',
        required: true,
        placeholder: 'US',
        hint: 'Required. Two-letter ISO 3166-1 alpha-2 code.',
      },

      // ── Opening Hours (collapsed) ────────────────────────────────────────────
      {
        key: 'openingHours',
        label: 'Opening hours',
        inputType: 'array',
        recommended: true,
        group: 'Opening Hours',
        placeholder: 'Mo-Fr 09:00-17:00',
        hint: 'e.g. "Mo-Fr 09:00-17:00"',
        tooltip: 'One entry per row. Days: Mo Tu We Th Fr Sa Su. Ranges: "Mo-Fr 09:00-17:00". Specific days: "Sa,Su 10:00-14:00". Open 24h: "Mo-Su 00:00-23:59". Omit closed days.',
      },

      // ── Geo Coordinates (collapsed) ──────────────────────────────────────────
      {
        key: 'latitude',
        label: 'Latitude',
        inputType: 'number',
        recommended: true,
        group: 'Geo Coordinates',
        step: 0.00001,
        placeholder: '40.71427',
        hint: '≥5 decimal places',
        tooltip: 'Geographic latitude. Google requires at least 5 decimal places for accurate map placement (e.g. 40.71427). Use latlong.net or Google Maps to find exact coordinates.',
      },
      {
        key: 'longitude',
        label: 'Longitude',
        inputType: 'number',
        recommended: true,
        group: 'Geo Coordinates',
        step: 0.00001,
        placeholder: '-74.00597',
        hint: '≥5 decimal places',
        tooltip: 'Geographic longitude. Google requires at least 5 decimal places for accurate map placement (e.g. −74.00597). Use latlong.net or Google Maps to find exact coordinates.',
      },

      // ── Additional Details (collapsed) ───────────────────────────────────────
      {
        key: 'servesCuisine',
        label: 'Cuisine type',
        inputType: 'text',
        recommended: true,
        group: 'Additional Details',
        placeholder: 'Italian, Pizza',
        hint: 'For restaurants — comma-separated cuisine types.',
        tooltip: 'Only applies to Restaurant and food-related business types. Comma-separated list of cuisines served, e.g. "Italian, Seafood". Removes the "servesCuisine missing" warning in Google\'s Rich Results Test.',
      },
      {
        key: 'currenciesAccepted',
        label: 'Currencies accepted',
        inputType: 'text',
        recommended: false,
        group: 'Additional Details',
        placeholder: 'USD, EUR',
        hint: 'ISO 4217 currency codes, comma-separated.',
      },
      {
        key: 'paymentAccepted',
        label: 'Payment methods',
        inputType: 'text',
        recommended: false,
        group: 'Additional Details',
        placeholder: 'Cash, Credit Card, PayPal',
        hint: 'Accepted payment methods.',
      },
    ],
  },

  // ─── BREADCRUMBLIST ─────────────────────────────────────────────────────────
  // https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
  // Required: itemListElement with at least 2 ListItem (position + name + item).
  // Shows the site path (Home > Category > Page) in the Google SERP snippet.

  breadcrumb: {
    type: 'BreadcrumbList',
    label: 'Breadcrumb',
    description: 'Site navigation path — shows "Home > Category > Page" in Google Search snippets.',
    googleDocsUrl: 'https://developers.google.com/search/docs/appearance/structured-data/breadcrumb',
    fields: [],
    specialField: 'breadcrumbItems',
    specialFieldConfig: {
      minItems: 2,
      defaultItems: [
        { name: 'Home', url: 'https://example.com' },
        { name: '',     url: '' },
      ],
      nameLabel: 'Name',
      nameHint: 'Breadcrumb label shown to users in the SERP snippet.',
      urlLabel: 'URL',
      urlHint: 'Full URL of this breadcrumb level. Optional for the last (current) item.',
      positionNote: 'Position is set automatically starting from 1.',
    },
  },

}

// ─── Ordered list for the type switcher UI ────────────────────────────────────
export const SCHEMA_TYPE_KEYS = [
  'product',
  'article',
  'faq',
  'organization',
  'local-business',
  'breadcrumb',
]
