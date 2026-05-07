// ─── Product ───────────────────────────────────────────────────────────────────

const PRODUCT = {
  howToTitle: 'How to use the Product Schema Markup Generator',
  howToSteps: [
    'Enter the product name exactly as it appears on your page — Google cross-checks the schema against visible content.',
    'Set the price and currency using an ISO 4217 code (USD, EUR, UAH, GBP). Both fields are required for Rich Results eligibility.',
    'Select the availability status — InStock, OutOfStock, PreOrder, or BackOrder. The generator inserts the full Schema.org URL automatically.',
    'Add a GTIN (barcode), MPN, or SKU if your product has one — this unlocks Google Merchant Center integration and improves product identification across merchants.',
    'Fill in aggregateRating only if your page visibly displays real user reviews. Self-generated or inflated ratings violate Google\'s guidelines and risk a manual penalty.',
    'Copy the generated JSON-LD block from the output panel and paste it inside the <head> of your product page.',
    'Validate instantly with the Google Rich Results Test and monitor sitewide coverage in Google Search Console → Enhancements.',
  ],
  sections: [
    {
      heading: 'How the Product Schema Markup Generator works',
      blocks: [
        {
          type: 'p',
          text: 'Product schema markup is a JSON-LD script block placed in your page\'s **<head>** that tells Google exactly what your product page contains — name, price, availability, brand, and ratings. The generator builds this block locally in your browser: you fill in the fields, the JSON-LD output updates live in real time, and you copy the result directly into your HTML. No server, no account, no data leaves your machine.',
        },
        {
          type: 'p',
          text: 'Once added to your page, Google reads the markup during its next crawl and uses it to decide whether your listing qualifies for Rich Results — the enhanced SERP snippets that display price, availability badges, and star ratings directly in search without the user clicking through. The schema is completely invisible to site visitors; it only adds machine-readable metadata for search engines and structured data parsers.',
        },
        {
          type: 'code',
          label: 'Minimal valid Product schema',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Sony WH-1000XM5 Wireless Headphones",
  "offers": {
    "@type": "Offer",
    "price": "349.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
</script>`,
        },
      ],
    },
    {
      heading: 'Rich Results that Product Schema unlocks in Google Search',
      blocks: [
        {
          type: 'p',
          text: 'Without Product schema, Google displays a standard blue-link snippet for your product page — title, URL, and a short description. With correctly filled markup, Google can enrich that snippet with additional signals pulled directly from your structured data, making your listing stand out visually before a user even clicks.',
        },
        {
          type: 'ul',
          items: [
            '**Price and currency** — shown beneath the page title in the SERP snippet, with the currency symbol. For products with multiple variants, Google may display a price range (e.g., "$29.99 – $79.99").',
            '**Availability badge** — "In stock" or "Out of stock" displayed next to the price. Prevents users from clicking through to unavailable products, improving your bounce metrics.',
            '**Star ratings** — 1–5 stars with review count displayed when aggregateRating is filled. Consistently one of the highest click-through rate drivers in e-commerce SERPs.',
            '**Product image** — can appear in Google Images Shopping tab and in standard mobile search results, increasing surface area and visual recognition.',
            '**Shipping information** — estimated delivery timeframe and cost shown directly in the SERP if shippingDetails is populated. Reduces pre-purchase friction.',
            '**Return policy** — displays return window and conditions for markets where Google supports this field, primarily the United States.',
            '**Merchant badge** — Google may attach a verified seller label for merchants meeting its quality and trust signals via Google Merchant Center.',
          ],
        },
        {
          type: 'p',
          text: 'The minimum set required for Rich Results eligibility is **name + offers.price + offers.priceCurrency + offers.availability**. Google skips the schema and shows a plain snippet if any of these four are missing or use invalid values — regardless of how many other fields are correctly filled.',
        },
      ],
    },
    {
      heading: 'Product Schema fields — importance and business impact',
      blocks: [
        {
          type: 'p',
          text: 'Google divides Product schema fields into required (without them no Rich Result is generated), recommended (increase the richness and accuracy of the displayed result), and optional (provide additional signals for specific markets or integration points). The table below covers every major field and maps it to its practical impact.',
        },
        {
          type: 'table',
          headers: ['Field', 'Importance', 'What it unlocks'],
          rows: [
            ['name', 'Required', 'Product name used in the SERP snippet'],
            ['offers.price', 'Required', 'Price display in search results'],
            ['offers.priceCurrency', 'Required', 'Currency symbol next to the price (ISO 4217 code)'],
            ['offers.availability', 'Required', '"In stock" or "Out of stock" badge in SERP'],
            ['image', 'Recommended', 'Product photo in Google Images and mobile search'],
            ['brand.name', 'Recommended', 'Brand name shown beneath the page title'],
            ['description', 'Recommended', 'Extended description for Google to parse and understand'],
            ['gtin / mpn / sku', 'Recommended', 'Product identification — required for Google Merchant Center integration'],
            ['offers.priceValidUntil', 'Recommended', 'Prevents stale price display after the set date passes'],
            ['aggregateRating', 'Optional — high impact', 'Star ratings in SERP — the strongest CTR driver in e-commerce'],
            ['shippingDetails', 'Optional', 'Estimated delivery time and cost shown in the snippet'],
            ['hasMerchantReturnPolicy', 'Optional', 'Return window and conditions for US and supported markets'],
          ],
        },
      ],
    },
    {
      heading: 'When to use Product Schema — and when to skip it',
      blocks: [
        {
          type: 'h3',
          text: 'Pages where Product Schema is the right choice',
        },
        {
          type: 'ul',
          items: [
            '**Individual product pages in an online store** — the primary and most impactful use case. Every product page with a fixed price should have its own schema block with accurate availability.',
            '**Digital product pages** (plugins, fonts, templates, software licenses) — if there is a set price and a clear purchase action, Product schema applies regardless of whether the item is physical.',
            '**Single-product landing pages** — a dedicated landing page for one item with a "Buy now" or "Add to cart" button qualifies even if the rest of the site is not a store.',
            '**Manufacturer pages with listed prices** — even without a direct checkout, if the page shows price and availability, the schema is valid and may improve SERP appearance.',
            '**Subscription products** — use priceSpecification to describe billing frequency (monthly or annual) alongside the recurring amount.',
          ],
        },
        {
          type: 'h3',
          text: 'Pages where Product Schema will not work or may cause issues',
        },
        {
          type: 'ul',
          items: [
            '**Category and collection pages** — Google does not support Product schema on pages that list multiple products. Use ItemList schema instead for these pages.',
            '**Service pages** — consulting, development, design, and similar services should use the Service schema type. Google rejects Product markup on pages that describe services rather than goods.',
            '**Affiliate pages without a fixed price** — if the displayed price is pulled from a third-party feed and may differ from what the merchant shows, Google can reject the schema for a price mismatch.',
            '**"Price on request" pages** — without a concrete numeric price value, the schema cannot generate a price Rich Result. Omit the offers block entirely or use a different schema type.',
            '**Discontinued products** — do not remove the schema immediately. Update availability to **Discontinued** instead — this signals to Google that the item no longer exists rather than simply being out of stock.',
            '**Pages with aggregateRating but no visible reviews** — Google verifies that review data shown in the schema is actually present on the page. Schema with ratings not visible to users risks a manual action that removes Rich Results sitewide.',
          ],
        },
      ],
    },
    {
      heading: 'Technical deep dive: GTIN formats, priceValidUntil, and aggregateRating',
      blocks: [
        {
          type: 'p',
          text: '**GTIN (Global Trade Item Number)** is the most important product identifier for Google Merchant Center integration and cross-merchant product deduplication. There are four formats in use: gtin8 (8 digits, used on small consumer items), gtin12 (12 digits — UPC-A, the North American standard), gtin13 (13 digits — EAN-13, standard in Europe and Ukraine), and gtin14 (14 digits — shipping carton codes). If you are unsure which format applies to a specific product, use the generic **gtin** field — Google automatically identifies the format from the digit count. For digital products or items without a retail barcode, use **mpn** (manufacturer part number) or **sku** (your internal identifier).',
        },
        {
          type: 'p',
          text: '**priceValidUntil** is frequently skipped but critical for maintaining Rich Results over time. Once the date passes, Google may stop displaying the price in the SERP snippet even if the product is still available and the price has not changed. Treat this field as part of your regular product data update pipeline — update it alongside every price change, or set it far in advance and refresh periodically.',
        },
        {
          type: 'p',
          text: '**aggregateRating** requires both ratingValue and at least one of ratingCount or reviewCount. Without an explicit count, Google rejects the rating field regardless of the ratingValue. There is no published minimum review count, but in practice fewer than 3 visible reviews rarely trigger star display in the SERP. More critically: the rating value and review count in the schema must match what a user actually sees on the page — Google\'s crawler actively verifies this. Discrepancies between schema data and visible content are one of the most common causes of manual actions that remove Rich Results.',
        },
        {
          type: 'code',
          label: 'Full Product schema with GTIN, shipping details, and aggregate rating',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Sony WH-1000XM5 Wireless Headphones",
  "image": "https://example.com/img/sony-wh1000xm5.jpg",
  "description": "Industry-leading noise cancellation, 30-hour battery life, multipoint Bluetooth.",
  "brand": { "@type": "Brand", "name": "Sony" },
  "gtin13": "4548736132245",
  "offers": {
    "@type": "Offer",
    "price": "349.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2025-12-31",
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0",
        "currency": "USD"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 1,
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 2,
          "maxValue": 5,
          "unitCode": "DAY"
        }
      }
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "2847"
  }
}
</script>`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Product schema work without a price?',
      answer: 'Technically the schema is valid without a price, but you will not get a Rich Result with price display. Google requires name, price, priceCurrency, and availability as the minimum set for a price-based Rich Result. If the price is intentionally omitted — for example, "price on request" products — you can still use Product schema for brand and description signals, but the SERP snippet will look like a standard result.',
    },
    {
      question: 'Can I use Product schema on service pages?',
      answer: 'No. Google\'s Product schema is intended for physical and digital goods — items with a fixed price that can be purchased. For consulting, design, development, or SaaS services, use the Service schema type instead. Applying Product schema to a service page typically results in the markup being rejected or ignored by Google\'s parser.',
    },
    {
      question: 'What is a GTIN and where do I find it?',
      answer: 'GTIN (Global Trade Item Number) is a globally unique product identifier encoded in a barcode. For physical goods it is printed on the packaging: 8-digit EAN-8, 12-digit UPC-A (North America), or 13-digit EAN-13 (Europe, Ukraine). For digital products without a barcode, use the manufacturer\'s part number (mpn) or your internal SKU. GTIN is the most important identifier for Google Merchant Center integration and deduplication across multiple merchants selling the same item.',
    },
    {
      question: 'How do I add a sale price alongside the regular price?',
      answer: 'Use a priceSpecification array with two UnitPriceSpecification objects — one with the regular price and one with the sale price and a priceValidUntil set to the sale end date. Alternatively, some implementations use two separate Offer objects. The generator supports single-offer pricing; for complex sale pricing structures, generate the base schema and edit the JSON-LD output manually.',
    },
    {
      question: 'How many reviews are needed for star ratings to appear in Google?',
      answer: 'Google does not publish a minimum threshold. In practice, at least 3–5 visible user reviews are typically needed before stars appear consistently in search results. More importantly, reviewCount or ratingCount must be explicitly included in the aggregateRating object — Google rejects the entire rating block if the count is missing, regardless of how many reviews exist on the page.',
    },
    {
      question: 'How long does it take for Product Rich Results to appear after adding schema?',
      answer: 'There is no fixed timeline — it depends on your site\'s crawl frequency. For established sites with regular crawling, Rich Results can appear within days. For new sites or rarely crawled pages, it may take several weeks. You can request re-crawling via Google Search Console → URL Inspection → Request Indexing. The Rich Results Test confirms eligibility immediately after you add the schema, before Google even crawls the page.',
    },
    {
      question: 'Does Product schema directly improve search rankings?',
      answer: 'No — Google officially states that structured data is not a direct ranking factor. However, Product schema enables Rich Results that show price, stars, and availability in the SERP snippet. These visual elements consistently increase click-through rates, and higher CTR sends positive engagement signals back to Google. The indirect ranking benefit is real and measurable, especially in competitive e-commerce categories.',
    },
    {
      question: 'What happens if the price in my schema differs from the visible price on the page?',
      answer: 'Google actively cross-references the schema price against the visible price it detects on the page. A mismatch can result in the structured data being ignored, a warning appearing in Search Console, or — in repeated cases — a manual action that removes Rich Results sitewide. Always keep the schema price synchronized with the displayed price. If prices are updated programmatically, include the schema update in the same pipeline.',
    },
    {
      question: 'What should I do when a product goes out of stock?',
      answer: 'Update availability to https://schema.org/OutOfStock as soon as the product becomes unavailable. Do not remove the schema block entirely — sudden removal can disrupt Google\'s understanding of the page and affect its SERP appearance. If the product is permanently discontinued, set availability to https://schema.org/Discontinued, which signals to Google that the item no longer exists rather than being temporarily unavailable.',
    },
    {
      question: 'Does each product variant (color, size) need its own schema?',
      answer: 'If each variant has its own URL, yes — each page should have its own Product schema with the correct price and availability for that specific variant. If all variants are selected on a single page without URL changes, one schema block with the base price is sufficient. Advanced implementations can use a ProductGroup schema to describe the relationship between variants, but this is optional and not required for Rich Results eligibility.',
    },
    {
      question: 'Can I combine Product schema with other schema types on the same page?',
      answer: 'Yes — multiple schema types coexist on a single page in separate <script type="application/ld+json"> blocks. A product page commonly combines Product schema with BreadcrumbList (to display the navigation path in the SERP snippet) and optionally FAQPage (for a product Q&A section). Keep each type in its own script block rather than merging them into one JSON object.',
    },
    {
      question: 'Does Google verify that aggregateRating reviews are genuine?',
      answer: 'Yes. Google\'s guidelines require that aggregateRating reflects actual user reviews that are visible on the page — not self-generated, purchased, or inflated ratings. Google actively audits this: if the schema rating significantly exceeds what third-party signals or visible page content suggest, it may trigger a manual review. Sites found using fake review data can have Rich Results removed across the entire domain.',
    },
  ],
  relatedTools: [
    { to: '/meta-tags-generator',         name: 'Meta Tag Generator',          desc: 'Generate title, description, OG and Twitter Card tags for your product pages' },
    { to: '/organization-schema-generator', name: 'Organization Schema Generator', desc: 'Add brand and publisher markup to strengthen E-E-A-T signals alongside Product schema' },
    { to: '/breadcrumb-schema-generator',  name: 'Breadcrumb Schema Generator',  desc: 'Show Home > Category > Product path trails in Google SERP snippets' },
  ],
}

// ─── Article ──────────────────────────────────────────────────────────────────

const ARTICLE = {
  howToTitle: 'How to use the Article Schema Markup Generator',
  howToSteps: [
    'Enter the article headline exactly as it appears in the visible H1 on your page — Google compares schema content against what users see.',
    'Set datePublished to the original publication date. Set dateModified every time you make a significant update — this is a key freshness signal for Google News and Discover.',
    'Fill in the Author section: add the author\'s name and a URL to their bio page. This is the most impactful E-E-A-T signal in Article schema.',
    'Fill in the Publisher section: add your organization name and a crawlable logo URL (recommended size: up to 600×60 px).',
    'Add an image URL — Google requires at least one image for Article Rich Results in News and Discover. Use a high-resolution image (minimum 50,000 total pixels).',
    'Copy the generated JSON-LD block from the output panel and paste it inside the <head> of your article page.',
    'Validate with the Google Rich Results Test and monitor coverage in Google Search Console → Enhancements → Articles.',
  ],
  sections: [
    {
      heading: 'How the Article Schema Markup Generator works',
      blocks: [
        {
          type: 'p',
          text: 'Article schema markup is a JSON-LD script block placed in your page\'s **<head>** that tells Google exactly what kind of content your page contains — its headline, author, publication date, publisher, and featured image. The generator builds this block locally in your browser with no server calls and no data storage. You fill in the fields, the JSON-LD output updates in real time, and you copy the result into your HTML or CMS.',
        },
        {
          type: 'p',
          text: 'Once the markup is on your page, Google reads it during the next crawl and uses it to evaluate whether your article qualifies for enhanced visibility in Google Search, Google News, and Google Discover. The schema is completely invisible to readers — it adds machine-readable metadata without changing a single word or image on the page.',
        },
        {
          type: 'code',
          label: 'Minimal valid Article schema',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Add Structured Data to Any Website",
  "author": {
    "@type": "Person",
    "name": "Maria Koval",
    "url": "https://example.com/about/maria"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Abect",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "datePublished": "2025-01-15T09:00:00+02:00",
  "dateModified": "2025-05-01T14:00:00+02:00",
  "image": "https://example.com/img/article-cover.jpg"
}
</script>`,
        },
      ],
    },
    {
      heading: 'What Article Schema unlocks in Google Search, News, and Discover',
      blocks: [
        {
          type: 'p',
          text: 'Without Article schema, Google infers the author, date, and publisher from page content — often incorrectly or inconsistently. With correctly filled markup, you give Google a definitive, machine-readable source of truth that unlocks additional visibility surfaces beyond the standard blue-link SERP result.',
        },
        {
          type: 'ul',
          items: [
            '**Google News inclusion** — Article schema is a prerequisite for appearing in Google News. Without it, even a site with journalistic-quality content may be excluded from News surfaces entirely.',
            '**Google Discover cards** — Discover shows large-image content cards to mobile users. Articles with schema and high-quality images get richer card treatment and more prominent placement.',
            '**Author byline in SERP** — some search result formats display the author\'s name and publication date beneath the page title, directly visible without a click.',
            '**Freshness signals** — Google uses dateModified to assess content recency. Updated articles with a current dateModified rank better on freshness-sensitive queries.',
            '**AMP integration** — Article schema is technically required for AMP pages appearing in Google News carousels. Publisher logo dimensions are strictly enforced in AMP contexts.',
            '**E-E-A-T signals** — a verified author with a linked bio page and a named publisher organization strengthen Google\'s assessment of Experience, Expertise, Authoritativeness, and Trustworthiness for your entire site.',
            '**Top Stories carousel** — eligibility for the Top Stories rich result in mobile search requires Article (or NewsArticle) schema with a valid headline, image, and datePublished.',
          ],
        },
      ],
    },
    {
      heading: 'Article, NewsArticle, or BlogPosting — which type to use',
      blocks: [
        {
          type: 'p',
          text: 'Schema.org defines a hierarchy: **Article** is the base type, while **NewsArticle** and **BlogPosting** are subtypes that inherit all Article fields and add additional meaning. Google supports all three, but the correct choice depends on what your content actually is — using a more specific type gives Google a cleaner signal.',
        },
        {
          type: 'table',
          headers: ['Type', 'When to use', 'Google News eligible', 'Discover eligible', 'Key difference'],
          rows: [
            ['Article', 'General articles, guides, long-form content', 'Yes (baseline)', 'Yes', 'Most universal — safe default when content type is mixed'],
            ['NewsArticle', 'Breaking news, press releases, reports', 'Yes (prioritized)', 'Yes', 'Signals time-sensitivity — datePublished is treated as critical'],
            ['BlogPosting', 'Personal blog posts, opinion pieces', 'Limited', 'Yes', 'Lower authority signal for News — fine for personal or brand blogs'],
            ['TechArticle', 'Technical documentation, tutorials, API references', 'No', 'Yes', 'Signals developer-facing content — no specific rich result format'],
            ['Review', 'Product or service reviews with a rating', 'No', 'Yes', 'Can combine with Product or LocalBusiness schema on the same page'],
          ],
        },
        {
          type: 'p',
          text: 'For most content marketing and editorial sites, **Article** is the safest and most flexible choice. Use **NewsArticle** only if your content is genuinely time-sensitive news — Google scrutinizes datePublished more strictly for NewsArticle than for the base Article type.',
        },
      ],
    },
    {
      heading: 'When Article Schema delivers results — and when it does not',
      blocks: [
        {
          type: 'h3',
          text: 'Pages where Article Schema is the right choice',
        },
        {
          type: 'ul',
          items: [
            '**Blog posts and editorial articles** with a named author and a clear publication date — the most common and effective use case for Article schema.',
            '**News and press releases** on publisher sites — use NewsArticle for time-sensitive content that competes in the Top Stories carousel.',
            '**Long-form guides and pillar pages** — Article schema signals depth and authoritativeness, supporting E-E-A-T evaluation for competitive informational queries.',
            '**Content marketing articles** on brand sites — even without a dedicated newsroom, Article schema helps Google identify the author and publisher behind branded content.',
            '**AMP pages** — Article schema is a technical requirement for AMP articles appearing in the Google News carousel and Top Stories on mobile.',
          ],
        },
        {
          type: 'h3',
          text: 'Pages where Article Schema will not help or may be incorrect',
        },
        {
          type: 'ul',
          items: [
            '**Product pages and landing pages** — these are not articles. Use Product schema or WebPage schema instead. Applying Article markup to a product page sends a confusing signal to Google.',
            '**Category and archive pages** — listing pages that aggregate multiple articles do not qualify as Article. Leave them without Article schema or use CollectionPage.',
            '**Pages without a clear publication date** — if the page has no visible date and you cannot honestly fill in datePublished, the schema will have limited effectiveness.',
            '**Evergreen pages updated continuously** — if the page has no meaningful "published on" date (like a live documentation wiki), Article schema is a poor fit. Use WebPage instead.',
            '**Pages without a named author** — Article schema without an author is valid but provides minimal E-E-A-T benefit. The author field is what makes Article schema most valuable for trust signals.',
          ],
        },
      ],
    },
    {
      heading: 'Technical deep dive: author URL, dateModified, and publisher logo',
      blocks: [
        {
          type: 'p',
          text: '**author.url** is the single most underutilized field in Article schema. When you link the author to a URL — ideally a bio page on your own site that describes the author\'s credentials, experience, and published work — Google can build an entity connection between the author and the content. This is the core mechanism behind E-E-A-T author signals. The URL does not have to be Wikipedia (though that is ideal); a well-structured author page at `example.com/about/your-name` works. For the strongest signal, the author bio page itself should also reference the author\'s social profiles via `sameAs` in its own markup.',
        },
        {
          type: 'p',
          text: '**dateModified** is frequently set once at publication and never updated — this is a missed opportunity. Google News and Discover actively use dateModified as a freshness signal. When you update an article with new information, corrected data, or additional sections, updating dateModified tells Google the content is current. However, avoid updating dateModified for trivial edits like fixing typos — Google may penalize sites that constantly update timestamps on unchanged content to artificially appear fresh.',
        },
        {
          type: 'p',
          text: '**publisher.logo** has strict size constraints that are enforced in AMP contexts: the logo must fit within a 600×60 px bounding box (width ≤ 600 px, height ≤ 60 px). A square logo at 60×60 px works best. The logo URL must be directly crawlable by Google — no redirects through login pages, no lazy-loaded images. If your logo fails the logo size check, your AMP pages may be excluded from the Google News carousel even if all other fields are correct.',
        },
        {
          type: 'code',
          label: 'Full Article schema with E-E-A-T signals',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Google Updates Product Schema Requirements for 2025",
  "description": "Google has revised the required fields for Product rich results, adding shipping as a recommended field.",
  "image": {
    "@type": "ImageObject",
    "url": "https://example.com/img/article.jpg",
    "width": 1200,
    "height": 630
  },
  "author": {
    "@type": "Person",
    "name": "Maria Koval",
    "url": "https://example.com/about/maria-koval",
    "sameAs": [
      "https://linkedin.com/in/mariakoval",
      "https://twitter.com/mariakoval"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Abect",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png",
      "width": 300,
      "height": 60
    }
  },
  "datePublished": "2025-01-15T09:00:00+02:00",
  "dateModified": "2025-05-01T14:30:00+02:00",
  "url": "https://example.com/blog/google-product-schema-2025",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/blog/google-product-schema-2025"
  }
}
</script>`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is the difference between Article, NewsArticle, and BlogPosting?',
      answer: 'All three are valid Article schema types that Google supports. Article is the base type and the safest default for most content. NewsArticle is a subtype intended for time-sensitive journalism — Google treats its datePublished more strictly and it gets priority consideration for the Top Stories carousel. BlogPosting is for personal or brand blog content and carries a lower authority signal for News surfaces. Use the most specific type that honestly describes your content.',
    },
    {
      question: 'Is Article schema required to appear in Google News?',
      answer: 'Article schema is not the only requirement for Google News inclusion, but it is a strong signal that Google expects. Without it, your content may still appear in News if Google\'s crawler identifies it as news-like content, but schema significantly improves consistency and eligibility. For AMP articles in the News carousel, Article schema is technically required.',
    },
    {
      question: 'Does Article schema help with regular Google Search rankings?',
      answer: 'Not directly — structured data is not a ranking factor in standard search. However, Article schema enables Rich Results (author byline, image, date) that increase click-through rates in the SERP. Higher CTR is an indirect positive signal. More importantly, the E-E-A-T signals from author URL and publisher data influence Google\'s quality assessment of your entire site, which does affect long-term ranking potential.',
    },
    {
      question: 'Is the author URL field required?',
      answer: 'No — author.url is not required for the schema to be technically valid. However, it is the most impactful field for E-E-A-T signals. Without it, Google knows the author\'s name but cannot verify their identity or expertise. With a linked bio page, Google can build an entity connection between the author and the content. Always include author.url when possible — point it to an author bio page on your site, a LinkedIn profile, or a Twitter profile.',
    },
    {
      question: 'Can an article have multiple authors?',
      answer: 'Yes — the author field can be an array of Person or Organization objects. For example: "author": [{"@type": "Person", "name": "Maria Koval"}, {"@type": "Person", "name": "Ivan Petrenko"}]. Google supports multiple authors in Article schema and may display co-author information in supported rich result formats.',
    },
    {
      question: 'Should I update dateModified every time I edit the article?',
      answer: 'Update dateModified only when you make substantive changes — new sections, corrected facts, updated statistics, or significantly revised content. Do not update it for minor typo fixes or formatting changes. Google has issued guidance against artificially refreshing timestamps on unchanged content — sites that do this consistently may see their freshness signal discounted.',
    },
    {
      question: 'What image should I use in Article schema — the OG image or a separate one?',
      answer: 'You can use the same image as your OG image if it meets the requirements: minimum 50,000 total pixels (e.g., 696×696 px or larger), crawlable without login, and in a supported format (JPEG, PNG, WebP). Google recommends providing images in multiple aspect ratios (16:9, 4:3, 1:1) so it can select the best crop for different surfaces (Discover, News, Search). Use the ImageObject type with explicit width and height for the strongest signal.',
    },
    {
      question: 'What are the publisher logo size requirements?',
      answer: 'For AMP and Google News, the publisher logo must fit within 600×60 pixels — width no more than 600 px, height no more than 60 px. A 60×60 px square logo is the safest option. The logo must be a simple, text-based or symbolic logo — not a marketing image or hero banner. It must be directly accessible by Google without authentication.',
    },
    {
      question: 'Can I combine Article schema with FAQ schema on the same page?',
      answer: 'Yes — this is a recommended combination for long-form articles that include a Q&A section. Add Article schema for the overall article metadata and a separate FAQPage schema block for the Q&A content. Google reads both independently. Keep them in separate <script type="application/ld+json"> blocks. The FAQ accordion can appear in the SERP alongside the article snippet.',
    },
    {
      question: 'What happens if datePublished is wrong or missing?',
      answer: 'If datePublished is missing, Google infers the date from page content or crawl history — often incorrectly. An incorrect inferred date can hurt your visibility on time-sensitive queries. If datePublished is set to a future date, Google may delay indexing the rich result. Always use the actual original publication date and never backdate or frontdate it — Google cross-references the crawl timestamp.',
    },
    {
      question: 'Does Article schema work on single-page React or Next.js apps?',
      answer: 'Yes, but the JSON-LD must be present in the server-rendered HTML — not added via useEffect after page load. In React with Vite, use react-helmet-async to inject the script into the <head> during SSR or prerendering. In Next.js App Router, use the built-in metadata API or a <script> tag with dangerouslySetInnerHTML in a Server Component. If Google\'s crawler sees the page before JavaScript runs and the schema is not in the initial HTML, it will not be indexed.',
    },
    {
      question: 'How do I verify that Google picked up my Article schema?',
      answer: 'First, test the page URL in the Google Rich Results Test immediately after publishing — it shows whether the schema is valid and what rich results it qualifies for. After Google re-crawls the page (request re-indexing via URL Inspection in Search Console), check Search Console → Enhancements → Articles. This report shows the number of valid, invalid, and warning-state Article pages across your site and details any field-level issues.',
    },
  ],
  relatedTools: [
    { to: '/faq-schema-generator',          name: 'FAQ Schema Generator',          desc: 'Add expandable Q&A accordion to your articles directly in Google Search results' },
    { to: '/organization-schema-generator', name: 'Organization Schema Generator', desc: 'Define your publisher entity to strengthen E-E-A-T signals across all articles' },
    { to: '/meta-tags-generator',           name: 'Meta Tag Generator',            desc: 'Generate title, description, OG and Twitter Card tags for your article pages' },
  ],
}

// ─── FAQ Schema ───────────────────────────────────────────────────────────────

const FAQ_SCHEMA = {
  howToTitle: 'How to use the FAQ Schema Markup Generator',
  howToSteps: [
    'Add your first question — enter the full question text exactly as it appears on your page. Google compares schema content against what users actually see.',
    'Enter the answer for that question. You can use basic HTML in answers: <p>, <ul>, <li>, <a>, <b>, <strong>, <i>, <em> are all supported.',
    'Click "Add question" to add more Q&A pairs. Google typically displays the first 2–3 in the SERP accordion — put the most valuable questions first.',
    'Copy the generated JSON-LD block from the output panel.',
    'Paste it inside the <head> of your HTML — or anywhere in <body>. Both placements work for Google.',
    'Verify that every question and answer in the schema is also visibly present on the page — Google rejects schemas where structured data is not reflected in the visible content.',
    'Test with the Google Rich Results Test and monitor FAQ accordion appearance in Google Search Console → Enhancements → FAQ.',
  ],
  sections: [
    {
      heading: 'How the FAQ Schema Markup Generator works',
      blocks: [
        {
          type: 'p',
          text: 'FAQ schema markup is a JSON-LD script block that describes a list of questions and answers to search engines in a machine-readable format. The generator lets you add Q&A pairs dynamically — enter a question, enter its answer, repeat as needed. The JSON-LD output updates live, and you copy the final block directly into your HTML. No server, no account, no data leaves your browser.',
        },
        {
          type: 'p',
          text: 'Once the markup is on your page, Google reads it during the next crawl and uses it to decide whether your page qualifies for FAQ Rich Results — the expandable accordion displayed directly beneath your SERP snippet. This lets users read answers without clicking through to your site, which sounds counterproductive but in practice increases total SERP visibility and click-through rate for users who want more detail.',
        },
        {
          type: 'code',
          label: 'FAQPage schema — two questions',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is JSON-LD structured data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON-LD is a script block placed in your page's head that tells search engines what your page contains in a machine-readable format."
      }
    },
    {
      "@type": "Question",
      "name": "Does structured data improve SEO rankings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Structured data is not a direct ranking factor, but it enables Rich Results that increase click-through rates — an indirect SEO benefit."
      }
    }
  ]
}
</script>`,
        },
      ],
    },
    {
      heading: 'What FAQ Schema unlocks in Google Search',
      blocks: [
        {
          type: 'p',
          text: 'FAQPage is one of the most visually impactful schema types in Google Search. A standard blue-link snippet occupies a fixed amount of vertical space in the SERP. With FAQ schema, your listing can expand to show two or three question-answer pairs below the main snippet — effectively multiplying the screen real estate your result occupies without requiring additional rankings.',
        },
        {
          type: 'ul',
          items: [
            '**Expandable Q&A accordion** — questions appear as collapsed rows beneath your snippet. Users click to expand individual answers without leaving the search results page.',
            '**Larger SERP footprint** — a result with three FAQ entries visible can be 3–4× taller than a standard snippet, pushing competitors below the fold on both desktop and mobile.',
            '**Voice search answers** — Google Assistant and other voice interfaces frequently pull answers from FAQPage schema when responding to spoken queries.',
            '**Zero-click answer visibility** — users get answers immediately from the SERP. While this can reduce some clicks, it increases brand exposure and drives higher-intent clicks from users who want the full page.',
            '**Featured snippet competition** — FAQ answers formatted clearly and concisely compete for featured snippet positions for the individual question queries.',
            '**Sitelink extension** — in some layouts, Google uses FAQ content to generate additional sitelinks visible in mobile search results.',
          ],
        },
      ],
    },
    {
      heading: 'FAQPage vs QAPage — which type applies to your content',
      blocks: [
        {
          type: 'p',
          text: 'Schema.org defines two separate types for Q&A content: **FAQPage** and **QAPage**. They look similar but are intended for fundamentally different page structures. Using the wrong type will not break your schema, but it signals incorrect content classification to Google.',
        },
        {
          type: 'table',
          headers: ['Property', 'FAQPage', 'QAPage'],
          rows: [
            ['Who writes answers', 'The site owner — one authoritative answer per question', 'The community — multiple answers, voted or scored'],
            ['Accepted answers per question', 'Exactly one', 'One or more, with ranking'],
            ['Typical use case', 'Official company FAQ, product FAQ, help center', 'Forums, Stack Overflow-style platforms, Reddit'],
            ['Google rich result support', 'Active — shows accordion in SERP', 'Limited — no dedicated rich result format'],
            ['Schema.org type to use', 'FAQPage + Question + Answer', 'QAPage + Question + Answer (with upvoteCount)'],
            ['Risk of misuse', 'Manual action if content is spammy or not visible on page', 'Less commonly misused'],
          ],
        },
        {
          type: 'p',
          text: 'Use **FAQPage** for virtually all standard website FAQ pages, product Q&A sections, and help articles. Use **QAPage** only if your page genuinely hosts community-generated answers with voting or scoring — and even then, the Rich Result benefit is limited compared to FAQPage.',
        },
      ],
    },
    {
      heading: 'When FAQ Schema delivers results — and when it is a liability',
      blocks: [
        {
          type: 'h3',
          text: 'Pages where FAQ Schema is the right choice',
        },
        {
          type: 'ul',
          items: [
            '**Dedicated FAQ pages** — a page whose entire purpose is answering common questions. This is the textbook use case: every question in the schema is visible on the page, the content is written by the site owner, and the answers are authoritative.',
            '**Service and product pages with a Q&A section** — adding a short FAQ section (3–6 questions) to a service landing page is a proven tactic for capturing long-tail query traffic while also qualifying for the FAQ accordion.',
            '**Long-form articles with a "Frequently Asked Questions" block** — pairing FAQPage schema with Article schema on the same page is valid and gives Google two distinct rich result opportunities from the same URL.',
            '**Help center and support documentation** — individual help articles answering a specific user question are ideal candidates, especially if they already rank for question-format queries.',
            '**Local business pages answering location-specific questions** — "Do you offer delivery to X?", "What are your hours during holidays?" — FAQ schema on these pages can appear in local search results.',
          ],
        },
        {
          type: 'h3',
          text: 'When FAQ Schema becomes a risk',
        },
        {
          type: 'ul',
          items: [
            '**Adding FAQPage to every page on the site** — Google explicitly limits FAQ rich results to a small number of results per query and has deprioritized sitewide FAQPage use since 2023. Blanket implementation across hundreds of pages rarely adds value and signals low-quality schema use.',
            '**Questions not visible on the page** — Google verifies that each question and answer in the schema appears visibly in the page content. If the schema contains questions that users cannot actually see, Google will reject the markup. This is one of the most common reasons for FAQPage validation failures.',
            '**Promotional or marketing content framed as Q&A** — questions like "Why is our product the best?" with promotional answers violate Google\'s guidelines. FAQ schema is for genuine informational Q&A, not marketing copy.',
            '**Duplicate FAQ content across many pages** — if the same set of questions is deployed on dozens of pages via a footer or sidebar widget, Google may ignore the schema entirely as low-quality.',
            '**Sites with a history of spammy structured data** — if a site has received a manual action related to structured data abuse, adding FAQPage schema may be scrutinized more heavily.',
          ],
        },
      ],
    },
    {
      heading: 'Technical deep dive: visible content, character limits, and placement',
      blocks: [
        {
          type: 'p',
          text: '**The visible content rule** is the most critical technical constraint for FAQPage schema. Every Question and Answer in your JSON-LD must correspond to content that a user can actually read on the page. Google\'s crawler verifies this by comparing the schema text against the rendered page content. The comparison is fuzzy — minor wording differences are tolerated — but the Q&A content must be genuinely present and accessible. Hidden content (display:none, visibility:hidden, behind a tab that requires JavaScript) does not count. If the FAQ is in a collapsed accordion on the page, that is acceptable as long as the HTML content is present in the DOM even when collapsed.',
        },
        {
          type: 'p',
          text: '**Answer length** in the schema can be much longer than what Google displays in the SERP accordion. Google typically shows approximately 300–500 characters of the answer in the expanded accordion view and truncates with "See more". Write complete, useful answers in the schema even if they are long — Google uses the full text for relevance matching, not just the truncated visible portion. Short, vague answers that omit key details score lower for voice search and featured snippet competition.',
        },
        {
          type: 'p',
          text: '**JSON-LD placement** — FAQPage schema can be placed either in the **<head>** or anywhere in the **<body>**. Both are fully supported by Google. For React and other SPA frameworks, the schema must be in the server-rendered HTML — adding it via useEffect after page load means Google may not see it during the first crawl. Use react-helmet-async for React with SSR, or next/head in Next.js Pages Router, or a Server Component in Next.js App Router.',
        },
        {
          type: 'code',
          label: 'FAQPage with HTML-formatted answer',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What schema types does this tool support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "<p>This tool supports six schema types:</p><ul><li><b>Product</b> — for e-commerce product pages</li><li><b>Article</b> — for blog posts and news</li><li><b>FAQPage</b> — for Q&amp;A sections</li><li><b>Organization</b> — for company pages</li><li><b>LocalBusiness</b> — for physical locations</li><li><b>BreadcrumbList</b> — for navigation paths</li></ul>"
      }
    },
    {
      "@type": "Question",
      "name": "Is this tool free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — the tool is completely free. No account, no signup, no usage limits. All JSON-LD generation happens in your browser."
      }
    }
  ]
}
</script>`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'How many FAQ questions should I add for best results in Google?',
      answer: 'Google typically displays 2–3 questions in the SERP accordion, regardless of how many are in the schema. In practice, 3–8 well-written questions work best. Fewer than 3 reduces the accordion impact; more than 10 rarely adds SERP value and may look spammy. Focus on quality and genuine user intent rather than quantity. Put the most valuable, search-relevant questions first.',
    },
    {
      question: 'Can I put FAQPage schema on every page of my website?',
      answer: 'Technically yes, but Google has deprioritized sitewide FAQPage use since 2023 and limits FAQ rich results to a small number of results per search query. Adding FAQPage to every page — especially if the questions are generic or repeated — signals low-quality schema implementation. Reserve FAQPage for pages where a genuine Q&A section adds informational value: FAQ pages, service pages, help articles.',
    },
    {
      question: 'Does FAQ schema still work in 2025?',
      answer: 'Yes, FAQPage schema is still supported and generates accordion rich results in 2025. Google updated its guidance in 2023 to limit how often FAQ rich results appear — they now show less frequently for large sites that deployed FAQPage sitewide, and are more selective about which queries trigger the accordion. Well-implemented FAQ schema on pages with genuine Q&A content continues to generate rich results consistently.',
    },
    {
      question: 'What is the character limit for FAQ answers in Google Search?',
      answer: 'Google displays approximately 300–500 characters in the expanded accordion view before truncating with "See more." However, you should write the full answer in the schema — Google uses the complete text for relevance matching, voice search, and featured snippet competition. There is no hard technical limit in the schema specification itself; the truncation is purely a SERP display decision.',
    },
    {
      question: 'Can FAQ answers contain HTML formatting?',
      answer: 'Yes — Google supports basic HTML tags in the Answer text field: <p>, <ul>, <ol>, <li>, <a>, <b>, <strong>, <i>, <em>. Complex HTML like tables, divs, or custom elements is not guaranteed to render and may be stripped. Use simple formatting — a list of bullet points or a short paragraph with bold text. Remember to escape HTML entities in JSON strings: & becomes &amp;, < becomes &lt;.',
    },
    {
      question: 'What happens if my FAQ questions are in a collapsed accordion on the page?',
      answer: 'This is acceptable. Google\'s crawler evaluates the DOM — if the Q&A content is in the HTML even when visually collapsed (using CSS or a details/summary element), Google counts it as visible content. What is not acceptable: content hidden behind JavaScript that requires a click to inject the HTML, or content with display:none applied permanently. If the FAQ accordion uses CSS to show/hide content, the HTML is still in the page source and Google will see it.',
    },
    {
      question: 'Does FAQPage schema help with voice search?',
      answer: 'Yes — Google Assistant and other voice search interfaces frequently use FAQPage schema answers when responding to spoken questions. Short, direct answers (1–3 sentences) that directly address the question are most likely to be selected for voice responses. Write each answer so it reads naturally when spoken aloud, not just when read on screen.',
    },
    {
      question: 'Can I combine FAQPage schema with Article or Product schema on the same page?',
      answer: 'Yes — multiple schema types coexist on the same page in separate <script type="application/ld+json"> blocks. A common pattern is Article + FAQPage on a long-form guide that includes a Q&A section, or Product + FAQPage on a product page with a product-specific FAQ. Google reads each block independently and may show rich results from multiple types simultaneously.',
    },
    {
      question: 'What is the difference between FAQPage and QAPage schema?',
      answer: 'FAQPage is for pages where the site owner provides one authoritative answer per question — a standard FAQ page, help article, or product Q&A section. QAPage is for community-driven Q&A platforms where multiple users submit answers that are voted or scored, like Stack Overflow or Reddit-style sites. Google supports rich results for FAQPage but has limited rich result formats for QAPage. Use FAQPage for virtually all standard website use cases.',
    },
    {
      question: 'Will Google show my FAQ accordion immediately after I add the schema?',
      answer: 'No — Google needs to crawl and process the page first. This can take anywhere from a few days to several weeks, depending on your site\'s crawl frequency. Request re-indexing via Google Search Console → URL Inspection → Request Indexing to speed up the process. Even after crawling, Google may not show the FAQ accordion for every query — it decides based on the query type and available rich results from competing pages.',
    },
    {
      question: 'Can the questions in my FAQ schema link to other pages?',
      answer: 'Yes — you can include <a href="..."> tags in the answer text. Google supports anchor tags in Answer text. Cross-linking to related pages within answers is valid and can be useful for users. However, do not use FAQ answers purely as a vehicle for internal link building — the primary purpose must be to genuinely answer the question. Answers that are mostly links with thin text may be ignored by Google.',
    },
    {
      question: 'My FAQPage schema is valid but Google is not showing the accordion — why?',
      answer: 'Several reasons are common: (1) Google has not yet re-crawled the page since you added schema — request indexing. (2) Google is limiting FAQ rich results for your query type — FAQ accordions appear less frequently for navigational or transactional queries. (3) Your site has sitewide FAQPage on too many pages and Google has deprioritized it — remove FAQ schema from low-value pages. (4) The page does not rank high enough — FAQ accordions appear most often in positions 1–5.',
    },
  ],
  relatedTools: [
    { to: '/article-schema-generator',      name: 'Article Schema Generator',      desc: 'Add author, date and publisher markup — combine with FAQPage for long-form guides' },
    { to: '/product-schema-generator',      name: 'Product Schema Generator',      desc: 'Add FAQ section markup alongside product price and availability schema' },
    { to: '/meta-tags-generator',           name: 'Meta Tag Generator',            desc: 'Generate title, description, OG and Twitter Card tags with live preview' },
  ],
}

// ─── Generic fallback (used for types without dedicated content yet) ───────────

const GENERIC = {
  howToTitle: 'How to use the JSON-LD Schema Markup Generator',
  howToSteps: [
    'Select a schema type from the nav above — Product, Article, FAQ, Organization, Local Business, or Breadcrumb.',
    'Fill in the fields on the left. Required fields must be completed to reach Google Rich Results eligibility.',
    'The JSON-LD output updates live as you type — watch the right panel.',
    'Check the validation status. A green indicator confirms your schema meets Google\'s minimum requirements.',
    'Click "Copy JSON-LD" and paste the <script> block into the <head> of your HTML page.',
  ],
  sections: [
    {
      heading: 'What is JSON-LD and why Google recommends it',
      blocks: [
        { type: 'p', text: 'JSON-LD is a lightweight script block placed in your page\'s **<head>** that describes your content to search engines in a machine-readable format. Unlike Microdata or RDFa — which embed structured data directly into HTML attributes — JSON-LD is completely separate from your visible markup. You can add, edit, or remove it without touching a single visible element on the page.' },
        { type: 'p', text: 'Google officially recommends JSON-LD for all structured data implementations. It is more resilient to HTML refactors, easier to validate, and does not break when your template changes. This is why every major CMS plugin (Yoast SEO, Rank Math, Schema Pro) generates JSON-LD by default.' },
        {
          type: 'table',
          headers: ['Format', 'Where it lives', 'HTML coupling', 'Maintenance', 'Google recommendation'],
          rows: [
            ['JSON-LD', 'Separate <script> in <head>', 'None — fully decoupled', 'Easy — edit one block', 'Recommended'],
            ['Microdata', 'Inside HTML element attributes', 'Tight — breaks with refactors', 'Hard — spread across HTML', 'Supported'],
            ['RDFa', 'Inside HTML element attributes', 'Tight — breaks with refactors', 'Hard — spread across HTML', 'Supported'],
          ],
        },
      ],
    },
    {
      heading: 'Which schema type to use and what it unlocks in Google',
      blocks: [
        { type: 'p', text: 'Each schema type targets a different content format and unlocks a different Rich Result in Google Search. Use the most specific type that accurately describes your page.' },
        {
          type: 'table',
          headers: ['Schema type', 'Rich Result in Google', 'Required fields', 'Best for'],
          rows: [
            ['Product', 'Price, rating, availability badge', 'name + price + currency', 'E-commerce product pages'],
            ['Article', 'Author byline, date, image in News/Discover', 'No strict requirements', 'Blog posts, news articles'],
            ['FAQPage', 'Expandable Q&A accordion in SERP', 'At least 1 Q&A pair', 'Help pages, FAQ sections'],
            ['Organization', 'Knowledge Panel, brand signals', 'No strict requirements', 'About page, homepage'],
            ['LocalBusiness', 'Map card, hours, phone in Search', 'name + full address', 'Physical business locations'],
            ['BreadcrumbList', 'Path trail in SERP snippet', 'At least 2 named items', 'Any page with navigation depth'],
          ],
        },
      ],
    },
    {
      heading: 'How to add JSON-LD to your website',
      blocks: [
        { type: 'p', text: 'After generating your JSON-LD above, paste the entire <script> block into your page. Here is the correct placement for the most common stacks.' },
        { type: 'h3', text: 'Plain HTML' },
        {
          type: 'code',
          label: 'HTML',
          code: `<head>
  <!-- Paste your generated block here -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Your Product Name"
  }
  </script>
</head>`,
        },
        { type: 'h3', text: 'React (Vite) — react-helmet-async' },
        {
          type: 'code',
          label: 'JSX',
          code: `import { Helmet } from 'react-helmet-async'

export default function ProductPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Your Product Name',
  }
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      {/* page content */}
    </>
  )
}`,
        },
        { type: 'h3', text: 'Next.js 13+ (App Router)' },
        {
          type: 'code',
          label: 'JSX',
          code: `export default function ProductPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Your Product Name',
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* page content */}
    </>
  )
}`,
        },
        { type: 'h3', text: 'WordPress' },
        { type: 'p', text: 'Install **Yoast SEO** or **Rank Math** — both generate JSON-LD automatically from page metadata. For custom schemas, use the "Header and Footer Scripts" plugin and paste your generated block into the Header field.' },
      ],
    },
    {
      heading: 'Common JSON-LD mistakes and how to avoid them',
      blocks: [
        {
          type: 'ul',
          items: [
            '**Fake reviews in aggregateRating** — using self-generated or inflated ratings violates Google\'s guidelines and can result in a manual penalty. Only use aggregateRating when real user reviews are visible on the page.',
            '**Content not on the page** — all structured data must reflect content that users can see. A FAQPage schema with questions not displayed on the page will be rejected by Google.',
            '**Missing required fields** — Product schema without price will not generate a Rich Result. LocalBusiness without an address will not appear in map cards. Use the validator above to catch these before publishing.',
            '**Multiple schemas merged into one block** — keep each schema type in its own separate <script> tag. Merging them into a single block can confuse parsers.',
            '**Incorrect availability values** — availability must use the full Schema.org URL (https://schema.org/InStock), not a plain string. This generator handles that automatically.',
            '**Dynamic generation without prerendering** — if your JSON-LD is generated by client-side JavaScript only, Google may not see it during the first crawl. Use SSR or static prerendering to ensure the markup is in the initial HTML response.',
          ],
        },
      ],
    },
    {
      heading: 'How Google validates and uses structured data',
      blocks: [
        { type: 'p', text: 'After adding JSON-LD to your page, verify it with the **Google Rich Results Test** (linked in the output panel above). It shows which Rich Results your page qualifies for and highlights any errors or warnings. Run it on the live URL — not just the HTML snippet — since Google also checks page accessibility and content quality.' },
        { type: 'p', text: 'Once your page is indexed, check **Google Search Console → Enhancements**. It shows coverage data (valid, invalid, warning) for each schema type detected across your site. Errors here mean Google found the schema but could not process it — usually a missing required field or a content mismatch.' },
        {
          type: 'ul',
          items: [
            '**Rich Results Test** — validates a single URL or HTML snippet instantly',
            '**Search Console → Enhancements** — shows coverage across your entire site after indexing',
            '**Search Console → URL Inspection** — shows the structured data Google actually parsed on a specific URL',
            '**Schema.org Validator** (validator.schema.org) — checks conformance to the Schema.org spec, independent of Google',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is JSON-LD structured data?',
      answer: 'JSON-LD (JavaScript Object Notation for Linked Data) is a <script> block placed in your page\'s <head> that tells search engines — in machine-readable format — exactly what your page contains: a product, an article, a business, a FAQ. Google uses this data to generate Rich Results in search — star ratings, price, breadcrumbs, FAQ dropdowns — without guessing.',
    },
    {
      question: 'Does structured data improve SEO rankings?',
      answer: 'Structured data is not a direct ranking factor, but it enables Rich Results — visually enhanced listings that show stars, prices, images, and FAQs directly in the SERP. Rich Results consistently achieve higher click-through rates than standard blue links. Higher CTR → more traffic → an indirect but real SEO benefit. For e-commerce and local businesses, structured data is practically required to be competitive.',
    },
    {
      question: 'Which schema type should I use for my page?',
      answer: 'Product: for any page selling a specific item — enables price, availability, and star ratings in Google. Article: for blog posts and news — signals authorship and freshness to Google News and Discover. FAQPage: for pages with Q&A sections — shows expandable answers directly in search results. Organization: for your About page or homepage — contributes to Google\'s Knowledge Panel. LocalBusiness: for physical locations — enables map cards and business hours. BreadcrumbList: for any page — shows the navigation path (Home > Category > Page) in the SERP snippet.',
    },
    {
      question: 'Where do I paste the generated JSON-LD?',
      answer: 'Paste the entire <script type="application/ld+json">...</script> block inside the <head> element of your HTML. In React, use react-helmet-async and place it inside <Helmet>. In Next.js 13+ App Router, use the metadata API or a <Script> component with strategy="beforeInteractive". In WordPress, use Yoast SEO, Rank Math, or a header injection plugin. Google also reads JSON-LD placed in the <body>, though <head> is the standard.',
    },
    {
      question: 'Can I have multiple JSON-LD blocks on one page?',
      answer: 'Yes — Google supports multiple separate <script type="application/ld+json"> blocks on the same page. A product page might include Product + BreadcrumbList + FAQPage schemas simultaneously. Each block is independent. Keep each schema type in its own <script> tag rather than merging them.',
    },
    {
      question: 'What does "Google Rich Results eligible" mean in the validator?',
      answer: 'It means all fields that Google requires for that schema type are filled in. For Product, that is name + price + priceCurrency. For LocalBusiness, that is name + address (street, city, country). For FAQPage, that is at least one question with an answer. For BreadcrumbList, that is at least two items with names. When all required fields are present, Google can generate a Rich Result for your page.',
    },
    {
      question: 'Does the Product schema guarantee star ratings in Google?',
      answer: 'No. Star ratings in Google require genuine user reviews — the schema tells Google you have review data, but Google decides whether to display it based on its own quality signals. Self-generated or fake ratings violate Google\'s guidelines and risk a manual penalty. Use aggregateRating fields only when your page genuinely displays real user reviews.',
    },
    {
      question: 'How do I test if my structured data is valid?',
      answer: 'Use the Google Rich Results Test (search.google.com/test/rich-results) — it shows which Rich Results your page is eligible for and flags any errors. After publishing, check Google Search Console under Enhancements to see coverage and any validation issues. The validator in this generator pre-checks required fields before you even publish.',
    },
    {
      question: 'What is the difference between JSON-LD, Microdata, and RDFa?',
      answer: 'All three embed structured data into a web page. JSON-LD is a separate <script> block — it does not touch the visible HTML, making it easy to add and maintain. Microdata and RDFa embed directly into HTML attributes. Google supports all three but officially recommends JSON-LD because it is easier to implement, maintain, and less prone to breaking when HTML is refactored.',
    },
    {
      question: 'Does this tool send my data to any server?',
      answer: 'No. All JSON-LD generation happens locally in your browser using JavaScript. Nothing is sent to a server. You can disconnect from the internet after the page loads and the tool continues to work — the output is computed entirely on your device.',
    },
    {
      question: 'How many FAQ questions should I include for FAQPage schema?',
      answer: 'Google does not specify a minimum or maximum number of questions. In practice, 3–10 well-written questions work best. Google typically displays 2–3 rich result snippets in the SERP. Focus on questions users actually search for — not filler. Each question and answer should be a faithful reflection of what appears on the page; Google will reject FAQPage markup if the content is not visible to users.',
    },
    {
      question: 'Is the url field in BreadcrumbList required for the last item?',
      answer: 'No — the url (item) field is optional for the last breadcrumb in the list, because the last item typically represents the current page. Google will use the page\'s canonical URL as a fallback. For all other items in the list, providing the URL helps Google understand your site structure and builds internal link signals.',
    },
  ],
  relatedTools: [
    { to: '/meta-tags-generator', name: 'Meta Tag Generator',   desc: 'Generate title, description, OG and Twitter Card tags with live preview' },
    { to: '/og-image-generator',  name: 'OG Image Generator',   desc: 'Crop images to 1200×630 px and export copy-ready og:image meta tags' },
    { to: '/favicon-generator',   name: 'Favicon Generator',    desc: 'Generate a complete favicon package from text, emoji, or image' },
  ],
}

// ─── Organization ─────────────────────────────────────────────────────────────

const ORGANIZATION = {
  howToTitle: 'How to use the Organization Schema Markup Generator',
  howToSteps: [
    'Enter your organization name exactly as it appears across your site and official profiles — consistency helps Google connect the entity.',
    'Add the website URL and logo URL. The logo must be crawlable by Google (min 112×112 px) — it appears in the Knowledge Panel.',
    'Add an image URL — a photo of your office, team, or headquarters. This is separate from the logo and fills the Knowledge Panel visual.',
    'Fill in the description — write a factual, neutral summary of what the organization does. Avoid marketing language.',
    'Add social and profile URLs in the sameAs field — LinkedIn, Twitter/X, Facebook, Wikipedia, Crunchbase, GitHub. These are the most important signals for Google\'s Knowledge Panel.',
    'Expand Legal & Details to add founding date, legal name, or alternate names if relevant.',
    'Copy the generated JSON-LD and paste it into the <head> of your homepage or About page.',
  ],
  sections: [
    {
      heading: 'How the Organization Schema Markup Generator works',
      blocks: [
        {
          type: 'p',
          text: 'Organization schema markup is a JSON-LD script block placed in your page\'s **<head>** that gives Google a machine-readable description of your company or brand — its name, website, logo, contact details, and links to official profiles. The generator builds this block locally in your browser with no server calls. You fill in the fields, the JSON-LD output updates in real time, and you copy the result into your HTML.',
        },
        {
          type: 'p',
          text: 'Organization schema is typically added to the **homepage** or **About page** — the pages Google associates most strongly with the organization entity. Unlike Product or Article schema which are page-specific, a single well-filled Organization schema on your homepage can influence how Google understands your brand across the entire site and across all its content.',
        },
        {
          type: 'code',
          label: 'Minimal Organization schema',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Abect",
  "url": "https://devtools.abect.com",
  "logo": "https://devtools.abect.com/logo.png",
  "sameAs": [
    "https://linkedin.com/company/abect",
    "https://twitter.com/abect",
    "https://github.com/abect"
  ]
}
</script>`,
        },
      ],
    },
    {
      heading: 'What Organization Schema unlocks in Google',
      blocks: [
        {
          type: 'p',
          text: 'Organization schema does not directly produce a SERP Rich Result in the same visual way as Product or FAQ schema. Its value is more foundational — it tells Google who you are, where to verify that identity, and how to represent your brand across multiple surfaces and features.',
        },
        {
          type: 'ul',
          items: [
            '**Knowledge Panel** — the information box that appears on the right side of Google Search results for branded queries. Organization schema, especially combined with strong sameAs signals, is the primary structured data input for triggering and populating the Knowledge Panel.',
            '**Brand disambiguation** — if your company name is shared with other entities, Organization schema helps Google associate the correct entity with your site and distinguish your brand in search results.',
            '**E-E-A-T signals** — Google\'s quality raters evaluate Experience, Expertise, Authoritativeness, and Trustworthiness. A named, verifiable organization with linked social profiles and a clear description strengthens your site\'s E-E-A-T score, which influences ranking potential for competitive queries.',
            '**Branded search results** — for searches of your exact brand name, a well-structured Organization schema can trigger an enhanced brand result with logo, description, and sitelinks displayed more prominently.',
            '**Sitelinks Searchbox** — when combined with WebSite schema, Organization schema supports the Sitelinks Searchbox feature that shows a search field directly in Google Search results for your brand.',
            '**Publisher identity for content** — when your site also publishes articles, Organization schema on the homepage establishes the publisher entity that Article schema on individual posts references via the publisher field.',
          ],
        },
      ],
    },
    {
      heading: 'Organization Schema fields — what each one does for Google',
      blocks: [
        {
          type: 'p',
          text: 'Organization schema has no technically required fields — the schema is valid with just a name. But the practical impact varies enormously depending on which fields you fill in. The table below maps each field to its contribution to Google\'s understanding of your brand.',
        },
        {
          type: 'table',
          headers: ['Field', 'Impact level', 'What Google uses it for'],
          rows: [
            ['name', 'Critical', 'Primary entity label — must match all other mentions of the brand'],
            ['url', 'Critical', 'Confirms the canonical web presence of the organization'],
            ['logo', 'Critical', 'Displayed in Knowledge Panel and used in Article publisher markup'],
            ['image', 'High', 'Visual representation in Knowledge Panel — distinct from logo'],
            ['sameAs', 'Very high', 'Cross-references brand identity across authoritative external sources'],
            ['description', 'High', 'May appear in Knowledge Panel and informs entity classification'],
            ['email', 'Medium', 'Contact signal — used in local and entity verification'],
            ['telephone', 'Medium', 'Contact signal — especially valuable for local business hybrid setups'],
            ['legalName', 'Medium', 'Helps disambiguate from similarly named entities'],
            ['foundingDate', 'Low–medium', 'Adds credibility and age signals to the entity'],
            ['address', 'Medium', 'Required if the organization also functions as a local business'],
            ['alternateName', 'Low', 'Helps Google recognize abbreviations and former brand names'],
          ],
        },
      ],
    },
    {
      heading: 'sameAs — the most important field in Organization Schema',
      blocks: [
        {
          type: 'p',
          text: 'The **sameAs** field is a list of URLs that all refer to the same entity as your organization. Google uses these links to cross-reference your brand across the web and build confidence in the entity\'s identity. A strong set of sameAs URLs is the difference between a brand that gets a Knowledge Panel and one that does not. Think of each sameAs URL as a vote of identity from an authoritative external source.',
        },
        {
          type: 'h3',
          text: 'High-value URLs to include in sameAs',
        },
        {
          type: 'ul',
          items: [
            '**Wikipedia** — if a Wikipedia article about your organization exists, this is the single most powerful sameAs URL. Google treats Wikipedia as the highest-authority external source for entity verification.',
            '**Wikidata** — even without a Wikipedia article, a Wikidata entry (wikidata.org/wiki/Q...) carries significant weight. Creating a Wikidata item for your organization is worthwhile if Wikipedia is not yet an option.',
            '**LinkedIn Company Page** — essential for B2B organizations. LinkedIn is one of Google\'s most trusted identity verification sources for companies.',
            '**Crunchbase** — highly valued for startups, tech companies, and investors. Crunchbase profiles are crawled regularly and treated as authoritative business data.',
            '**Twitter/X official account** — social verification signal, especially valuable for media brands and public figures.',
            '**Facebook Business Page** — important for consumer brands, especially in markets where Facebook presence is expected.',
            '**GitHub organization** — relevant for developer tools, open-source projects, and software companies. Google recognizes GitHub as authoritative for tech organizations.',
            '**Official government or trade registry** — for regulated industries, a link to your registration in an official business registry adds a strong authenticity signal.',
          ],
        },
        {
          type: 'h3',
          text: 'What not to include in sameAs',
        },
        {
          type: 'ul',
          items: [
            '**Pages where you are listed but not the owner** — directories, review sites, or aggregators where your brand appears but the page is not your official profile.',
            '**Broken or redirecting URLs** — Google follows the sameAs links when verifying identity. A 404 or a redirect chain weakens the signal.',
            '**URLs of similarly named competitors** — even accidentally including a URL that leads to a different entity can confuse Google\'s entity graph.',
            '**Social profile URLs that are inactive or abandoned** — a profile with no activity for years sends a weaker signal than an active one.',
          ],
        },
      ],
    },
    {
      heading: 'Technical deep dive: Organization vs LocalBusiness, and WebSite schema',
      blocks: [
        {
          type: 'p',
          text: '**Organization vs LocalBusiness**: LocalBusiness is a subtype of Organization — it inherits all Organization fields and adds location-specific ones: `openingHours`, `geo`, `hasMap`, `priceRange`. If your organization has a physical location where customers visit, use LocalBusiness (or one of its subtypes like Restaurant, MedicalClinic, or Store) instead of plain Organization. You can also combine both types in a single schema using an array: `"@type": ["Organization", "LocalBusiness"]` — this tells Google the entity is both a company and a physical place.',
        },
        {
          type: 'p',
          text: '**WebSite schema and Sitelinks Searchbox**: adding a WebSite schema block alongside Organization on the homepage is a low-effort, high-value addition. The WebSite schema with a `potentialAction` of type `SearchAction` enables the Sitelinks Searchbox — a search field that appears directly in Google\'s branded SERP for your site. Google decides whether to show it, but having the schema is a prerequisite for eligibility.',
        },
        {
          type: 'code',
          label: 'Full Organization schema with WebSite schema',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Abect",
  "url": "https://devtools.abect.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://devtools.abect.com/logo.png",
    "width": 300,
    "height": 60
  },
  "image": "https://devtools.abect.com/img/office.jpg",
  "description": "Free browser-based developer tools — image converters, SEO tools, and schema markup generators.",
  "foundingDate": "2024",
  "email": "hello@abect.com",
  "sameAs": [
    "https://linkedin.com/company/abect",
    "https://twitter.com/abect",
    "https://github.com/abect",
    "https://crunchbase.com/organization/abect"
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://devtools.abect.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://devtools.abect.com/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Organization schema need to be on every page, or just the homepage?',
      answer: 'Organization schema is most effective on the homepage or About page — the pages Google most strongly associates with the organization entity. You do not need it on every page. Some sites add it sitewide via a shared layout component, which is acceptable but provides diminishing returns. If you add it sitewide, ensure the schema is identical on every page — inconsistent data across pages can confuse Google\'s entity graph.',
    },
    {
      question: 'How many sameAs links should I include?',
      answer: 'Add every official profile URL where your organization has a genuine, active presence — there is no maximum. Quality matters more than quantity. A Wikipedia page, Wikidata entry, LinkedIn Company Page, and one or two social profiles typically provide a strong signal. Avoid adding URLs to pages where you are listed but do not control the content, and never add broken or redirecting links.',
    },
    {
      question: 'Does Organization schema help with branded search results?',
      answer: 'Yes — Organization schema is one of the key inputs Google uses when generating enhanced branded search results. For queries matching your exact organization name, strong schema combined with sameAs signals increases the likelihood of a Knowledge Panel appearing, your logo showing in the SERP, and sitelinks being displayed. The effect is most noticeable for organizations that have consistent brand mentions across authoritative external sources.',
    },
    {
      question: 'What is the difference between logo and image in Organization schema?',
      answer: 'The logo field specifies your brand\'s official logo — typically a simple text-and-symbol lockup on a transparent or solid background. Google uses it in the Knowledge Panel header and in Article publisher markup. The image field is for a broader visual representation of the organization — a photo of your office, headquarters, team, or product. Both can appear in Knowledge Panel but serve different visual roles. Google recommends including both when available.',
    },
    {
      question: 'Do I need a Wikipedia page for Organization schema to work?',
      answer: 'No — a Wikipedia page is not required. Organization schema works without any Wikipedia entry. However, a Wikipedia article in sameAs is the strongest possible entity verification signal and significantly increases the probability of a Knowledge Panel being generated. If you do not have Wikipedia, prioritize Wikidata (where you can create an item yourself), LinkedIn, and Crunchbase as the next most authoritative sources.',
    },
    {
      question: 'Can I use Organization schema for a personal brand or freelancer?',
      answer: 'For a personal brand, Person schema is more appropriate than Organization. Person schema includes fields for jobTitle, alumniOf, and worksFor that are not available in Organization. If you run a one-person company with a distinct brand name, you can use Organization — but if the brand is primarily associated with you as an individual, Person schema will give Google clearer signals about the entity type.',
    },
    {
      question: 'How does Organization schema interact with Article schema on the same site?',
      answer: 'Article schema on individual articles references a publisher field that should point to the same Organization entity defined on the homepage. When both are in place, Google can connect the author content to the publisher organization, strengthening E-E-A-T signals for the entire site. The publisher name and logo in Article schema should exactly match the name and logo in the homepage Organization schema.',
    },
    {
      question: 'What is the Sitelinks Searchbox and how does Organization schema relate to it?',
      answer: 'The Sitelinks Searchbox is a search field that appears directly in Google\'s branded search results for your site, allowing users to search your site without clicking through first. It requires WebSite schema with a SearchAction potentialAction — not Organization schema directly. However, having Organization schema on the homepage establishes the entity context that supports other Knowledge Panel features alongside the Searchbox.',
    },
    {
      question: 'Should the Organization schema foundingDate be a full date or just a year?',
      answer: 'Either is acceptable. Schema.org supports Date values as YYYY (just year), YYYY-MM (year and month), or YYYY-MM-DD (full date). For most organizations, the founding year alone is sufficient and avoids the need to pin down an exact date. If you use a full date, the date input in the generator will format it correctly. Do not guess or approximate the founding date — accuracy matters for entity verification.',
    },
    {
      question: 'Can Organization schema have multiple contact points for different departments?',
      answer: 'Yes — you can add a contactPoint array with multiple ContactPoint objects, each specifying a contactType (customer support, sales, technical support, billing, reservations, credit card support). This is useful for larger organizations with distinct departments. For smaller organizations, including email and telephone directly on the Organization object is simpler and equally effective.',
    },
    {
      question: 'How long does it take for Organization schema to affect the Knowledge Panel?',
      answer: 'Organization schema alone rarely triggers a Knowledge Panel immediately. The Knowledge Panel is a result of Google\'s overall entity understanding — schema is one input among many, including external references, Wikipedia mentions, press coverage, and site authority. Schema helps but is not a guarantee. After adding schema, allow several weeks for Google to recrawl and reprocess the entity data. Monitor changes in how your brand appears in branded search results.',
    },
    {
      question: 'What happens if the name in Organization schema does not match my page title or logo alt text?',
      answer: 'Consistency is critical for entity signals. If the name in your Organization schema differs from the name in your logo alt text, your Twitter bio, your LinkedIn page, and your Crunchbase profile — Google\'s confidence in the entity identity drops. Use the exact same name string everywhere. If your brand has a common abbreviation, add it to alternateName rather than using it as the primary name.',
    },
  ],
  relatedTools: [
    { to: '/local-business-schema-generator', name: 'Local Business Schema Generator', desc: 'Add opening hours, map location and phone for physical business locations' },
    { to: '/article-schema-generator',        name: 'Article Schema Generator',        desc: 'Reference your Organization as publisher to strengthen E-E-A-T across all articles' },
    { to: '/meta-tags-generator',             name: 'Meta Tag Generator',              desc: 'Generate title, description, OG and Twitter Card tags with live preview' },
  ],
}

// ─── Local Business ───────────────────────────────────────────────────────────

const LOCAL_BUSINESS = {
  howToTitle: 'How to use the Local Business Schema Markup Generator',
  howToSteps: [
    'Enter your business name exactly as it appears on your website and Google Business Profile — consistency across sources is critical for Google\'s entity matching.',
    'Select the most specific business type from the dropdown — "Restaurant" ranks better in local search than the generic "LocalBusiness".',
    'Fill in the address fields — street, city, and country code are required for Rich Results eligibility.',
    'Add your phone number and website URL. The URL should point to the specific location page, not the homepage, for multi-location businesses.',
    'Expand Opening Hours and enter your schedule — one entry per row, e.g. "Mo-Fr 09:00-18:00". This enables the "Open/Closed" indicator in Google Search.',
    'Expand Geo Coordinates and add latitude and longitude with at least 5 decimal places — this improves accuracy in Google Maps results.',
    'Copy the generated JSON-LD and paste it into the <head> of your business location page.',
  ],
  sections: [
    {
      heading: 'How the Local Business Schema Markup Generator works',
      blocks: [
        {
          type: 'p',
          text: 'Local Business schema markup is a JSON-LD script block placed in your page\'s **<head>** that tells Google the key details about a physical business location — its name, address, phone number, opening hours, and coordinates. The generator builds this block locally in your browser with no server calls. You fill in the fields, the JSON-LD output updates live, and you copy the result directly into your HTML or CMS.',
        },
        {
          type: 'p',
          text: 'Unlike most other schema types that affect standard search results, Local Business schema specifically targets **local search** — the map pack, Google Maps, and location-aware queries like "restaurant near me" or "dentist open now." Once the markup is on your page, Google reads it during the next crawl and uses it as a structured signal alongside your Google Business Profile.',
        },
        {
          type: 'code',
          label: 'Minimal valid Local Business schema',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Vesuvio Pizzeria",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "New York",
    "addressCountry": "US"
  },
  "telephone": "+1-212-555-1234",
  "openingHours": ["Mo-Fr 11:00-22:00", "Sa-Su 12:00-23:00"]
}
</script>`,
        },
      ],
    },
    {
      heading: 'What Local Business Schema unlocks in Google',
      blocks: [
        {
          type: 'p',
          text: 'Local Business schema does not replace Google Business Profile — they are separate systems that complement each other. Schema markup provides structured signals to Google\'s organic search crawler, while Google Business Profile feeds the Maps and local pack directly. Having both increases the number of consistent data points Google has about your location, which strengthens your local search presence.',
        },
        {
          type: 'ul',
          items: [
            '**Map pack rich results** — your business listing in the local 3-pack with address, rating, and hours displayed directly in search results without clicking.',
            '**"Open now" / "Closed" indicator** — the real-time status shown in mobile search results. Requires opening hours to be in the schema.',
            '**Click-to-call on mobile** — your phone number becomes a tappable link directly in the SERP snippet, reducing friction for inbound calls.',
            '**Distance from user** — Google displays "2.3 km away" when geo coordinates are included. More precise coordinates improve placement accuracy in Maps.',
            '**Price range indicator** — the "$", "$$", or "$$$" symbol shown next to the business name in local results.',
            '**Business type classification** — using a specific type like Restaurant or MedicalClinic instead of the generic LocalBusiness improves categorization in local search and Google Maps.',
            '**Knowledge Panel for branded searches** — a search for your exact business name can trigger a Knowledge Panel with address, hours, phone, and photos when schema is in place.',
          ],
        },
      ],
    },
    {
      heading: 'LocalBusiness subtypes — choosing the most specific type',
      blocks: [
        {
          type: 'p',
          text: 'Schema.org defines dozens of LocalBusiness subtypes. Google uses the type to classify your business in search results and Maps. The more specific the type, the stronger the classification signal — and the more additional fields become available. If no specific subtype fits your business, use the generic LocalBusiness.',
        },
        {
          type: 'table',
          headers: ['Subtype', 'Example businesses', 'Key additional fields'],
          rows: [
            ['Restaurant', 'Restaurants, cafes, bars', 'servesCuisine, menu, acceptsReservations, hasMap'],
            ['MedicalClinic / Physician', 'Clinics, doctors, dentists', 'medicalSpecialty, availableService'],
            ['Hotel / LodgingBusiness', 'Hotels, hostels, B&Bs', 'checkinTime, checkoutTime, amenityFeature'],
            ['Store', 'Retail shops (general)', 'paymentAccepted, currenciesAccepted'],
            ['HealthAndBeautyBusiness', 'Salons, spas, nail bars', 'availableService'],
            ['LegalService / Notary', 'Lawyers, notaries', 'areaServed'],
            ['AutoRepair / AutoDealer', 'Garages, car dealerships', 'brand, makesOffer'],
            ['EducationalOrganization', 'Schools, universities', 'hasOfferCatalog'],
            ['LocalBusiness', 'Any business without a specific type', '—'],
          ],
        },
      ],
    },
    {
      heading: 'When Local Business Schema is most effective — and when it is not needed',
      blocks: [
        {
          type: 'h3',
          text: 'Situations where Local Business Schema delivers clear value',
        },
        {
          type: 'ul',
          items: [
            '**Any physical location that serves walk-in customers** — restaurants, shops, clinics, salons, gyms, offices. This is the primary use case and delivers the most consistent results.',
            '**Multi-location businesses** — each location page should have its own LocalBusiness schema block with the specific address, phone, and hours for that location.',
            '**Service-area businesses** — even if you do not have a customer-facing office, adding a LocalBusiness schema with your service area helps Google surface you in location-specific queries.',
            '**Businesses newly added to Google Maps** — schema helps Google match your website to your Maps listing faster and more accurately.',
            '**Businesses with complex opening hours** — holiday hours, split shifts, seasonal schedules benefit most from explicit schema since Google cannot reliably infer these from page text.',
          ],
        },
        {
          type: 'h3',
          text: 'When Local Business Schema is not the right choice',
        },
        {
          type: 'ul',
          items: [
            '**Fully online businesses with no physical location** — use Organization schema instead. Adding a fake or approximate address to LocalBusiness schema to appear in local search violates Google\'s guidelines.',
            '**SaaS products and digital services** — there is no LocalBusiness subtype for software. Use Organization or WebApplication schema.',
            '**National brands without location pages** — a single LocalBusiness schema on a homepage cannot represent multiple physical locations. Create individual location pages instead.',
            '**Addresses that customers cannot visit** — P.O. boxes, virtual office addresses, or registered agent addresses without actual customer presence should not be in LocalBusiness schema.',
          ],
        },
      ],
    },
    {
      heading: 'Technical deep dive: opening hours format and geo coordinates',
      blocks: [
        {
          type: 'p',
          text: '**Opening hours syntax** follows a strict pattern: `[days] [open]-[close]`. Days use two-letter abbreviations: Mo, Tu, We, Th, Fr, Sa, Su. Ranges use a hyphen: `Mo-Fr` means Monday through Friday. For multiple intervals in one day (split shift), add a separate entry: `Mo-Fr 09:00-13:00` and `Mo-Fr 14:00-18:00`. For 24 hours: `Mo-Su 00:00-23:59`. Do not include closed days — simply omit them. Each entry goes on a separate row in the generator.',
        },
        {
          type: 'p',
          text: '**Geo coordinates** significantly improve how accurately Google Maps pins your location. Without coordinates, Google guesses the location from your address — which works for most standard addresses but fails for locations in complexes, malls, or areas where street-level geocoding is imprecise. Use at least 5 decimal places (e.g., `50.45100` not `50.5`). Find exact coordinates using Google Maps: right-click on your precise location and copy the lat/lng values.',
        },
        {
          type: 'p',
          text: '**servesCuisine** applies specifically to Restaurant and food-related business types. It accepts a free-text string describing the type of cuisine — for example `"Italian, Seafood"` or `"Ukrainian, European"`. Google uses this field for cuisine-specific queries like "Italian restaurant near me." Leaving it empty generates a warning in the Rich Results Test for Restaurant types; filling it resolves that warning.',
        },
        {
          type: 'code',
          label: 'Full Restaurant schema with hours, coordinates, and cuisine',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Vesuvio Pizzeria",
  "description": "Authentic Neapolitan pizza baked in a wood-fired oven.",
  "image": "https://example.com/img/vesuvio-interior.jpg",
  "url": "https://example.com/locations/downtown",
  "telephone": "+1-212-555-1234",
  "priceRange": "$$",
  "servesCuisine": "Italian, Pizza",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "New York",
    "addressRegion": "NY",
    "postalCode": "10001",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.71427,
    "longitude": -74.00597
  },
  "openingHours": [
    "Mo-Fr 11:00-22:00",
    "Sa-Su 12:00-23:00"
  ],
  "hasMap": "https://goo.gl/maps/xxxxx"
}
</script>`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Local Business schema replace Google Business Profile?',
      answer: 'No — they are separate systems. Google Business Profile (formerly Google My Business) feeds the Maps database and local pack directly and is managed through Google\'s dashboard. Local Business schema is structured data on your website that Google\'s web crawler reads. Both should be used together: schema provides an additional structured data source that reinforces and cross-validates your Business Profile data.',
    },
    {
      question: 'Is Local Business schema required for appearing in the Google local map pack?',
      answer: 'Not strictly required — businesses can appear in the local map pack through Google Business Profile alone. However, Local Business schema on your website adds a consistent, machine-readable signal that reinforces your Business Profile data. Sites with both consistently outperform those relying on Business Profile alone, especially in competitive local markets.',
    },
    {
      question: 'How do I add opening hours for a business with a split shift (e.g., closed for lunch)?',
      answer: 'Add two separate entries for the same days: one for the morning shift and one for the afternoon. For example: "Mo-Fr 09:00-13:00" and "Mo-Fr 14:00-18:00". The generator supports multiple entries — click "Add" for each time range. Google reads both entries and displays the full schedule with the lunch break gap.',
    },
    {
      question: 'How precise do geo coordinates need to be for Google Maps accuracy?',
      answer: 'Use at least 5 decimal places — for example 50.45100, not 50.5. Each decimal place narrows the location by roughly 1.1 km (1 place) down to about 1.1 m (5 places). For most business addresses, 5 decimal places provide precise enough pinning. Find exact values by right-clicking your location in Google Maps and copying the coordinates shown.',
    },
    {
      question: 'Can I use Local Business schema for a business with no fixed address?',
      answer: 'Yes — for mobile businesses or service-area businesses (plumbers, electricians, delivery services), you can use LocalBusiness schema with an areaServed field describing your coverage area instead of a physical address. Do not fabricate an address — adding a false or unmanned address to appear in local search results violates Google\'s guidelines and can result in your Business Profile being suspended.',
    },
    {
      question: 'What is the difference between LocalBusiness and Organization schema?',
      answer: 'LocalBusiness is a subtype of Organization — it inherits all Organization fields and adds location-specific ones: address (required), openingHours, geo, priceRange, and servesCuisine. Use LocalBusiness for any business with a physical location where customers visit. Use Organization for companies that exist primarily as a brand or online entity without a customer-facing physical address. You can also combine both: "@type": ["Organization", "LocalBusiness"].',
    },
    {
      question: 'Should each location of a multi-location business have its own schema?',
      answer: 'Yes — each physical location should have its own LocalBusiness schema block on its own dedicated location page. One schema cannot accurately represent multiple addresses. Create a separate page for each location (e.g., example.com/locations/new-york, example.com/locations/chicago) with unique schema per page. This also gives each location its own indexable URL for local search.',
    },
    {
      question: 'What does servesCuisine do and which business types need it?',
      answer: 'servesCuisine is a field specific to Restaurant and food-related LocalBusiness subtypes. It accepts a free-text description of cuisines served — e.g., "Italian, Seafood" or "Ukrainian, European". Google uses this for cuisine-specific local queries like "Italian restaurant near me". Without it, the Rich Results Test shows a warning for Restaurant-type schemas. It is not applicable to non-food businesses.',
    },
    {
      question: 'How do I mark seasonal hours or holiday closures in the schema?',
      answer: 'The standard openingHours field does not support date-specific exceptions. For holiday closures or seasonal schedules, use openingHoursSpecification (an array of objects) with validFrom and validThrough date ranges. This is more complex than the simple array format — the generator uses the simple format for standard weekly schedules. For seasonal businesses, you can update the standard openingHours schema each season.',
    },
    {
      question: 'Does Local Business schema affect rankings in regular (non-local) Google Search?',
      answer: 'Not directly for general ranking. Local Business schema primarily influences local search results — the map pack, Google Maps, and geo-targeted queries. For standard informational queries, Organization or Article schema would be more relevant. That said, consistent structured data across your site contributes to Google\'s overall entity understanding of your business, which can have indirect effects on branded and local-intent queries.',
    },
    {
      question: 'What is the hasMap field and should I include it?',
      answer: 'hasMap accepts a URL to your Google Maps listing (e.g., the short link from Google Maps share button). It explicitly tells Google which Maps listing corresponds to this schema, strengthening the connection between your website and your Business Profile. It is recommended but not required. Copy the share URL from Google Maps for your location and paste it as the hasMap value.',
    },
    {
      question: 'How do I verify that my Local Business schema is valid and working?',
      answer: 'Test the page URL in the Google Rich Results Test immediately after adding the schema. It will show which rich results your page qualifies for and list any errors. After Google re-crawls the page (request indexing via Search Console → URL Inspection), check Search Console → Enhancements → Local Business to see coverage status across your site. For Maps-specific validation, also check your Google Business Profile for any data conflicts.',
    },
  ],
  relatedTools: [
    { to: '/organization-schema-generator', name: 'Organization Schema Generator', desc: 'Add brand-level markup to complement your location schema and strengthen Knowledge Panel' },
    { to: '/meta-tags-generator',           name: 'Meta Tag Generator',            desc: 'Generate title, description, OG and Twitter Card tags for your location pages' },
    { to: '/breadcrumb-schema-generator',   name: 'Breadcrumb Schema Generator',   desc: 'Show Home > City > Location path trails in Google SERP snippets' },
  ],
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

const BREADCRUMB = {
  howToTitle: 'How to use the Breadcrumb Schema Markup Generator',
  howToSteps: [
    'The first breadcrumb item is pre-filled as "Home" — update the URL to your actual homepage address.',
    'Add breadcrumb items for each level of your site hierarchy: Home > Category > Subcategory > Page.',
    'Enter the name as it appears in your visible navigation — Google compares schema names against the breadcrumb trail users see on the page.',
    'Enter the full URL for each level. The URL for the last item (current page) is optional — Google uses the canonical URL as a fallback.',
    'Click "Add item" to add deeper hierarchy levels. Minimum two items are required for the schema to be valid.',
    'Copy the generated JSON-LD block and paste it into the <head> of the page whose breadcrumb path you are describing.',
    'Validate with the Google Rich Results Test — you should see "BreadcrumbList" as an eligible rich result.',
  ],
  sections: [
    {
      heading: 'How the Breadcrumb Schema Markup Generator works',
      blocks: [
        {
          type: 'p',
          text: 'Breadcrumb schema markup is a JSON-LD script block that describes the navigation hierarchy leading to the current page. Instead of letting Google guess the site structure from your HTML navigation, you give it an explicit, machine-readable path: Home → Category → Subcategory → Page. The generator builds this block in your browser — you add items, the JSON-LD updates live, and you paste the result into your page.',
        },
        {
          type: 'p',
          text: 'The practical SERP effect is visible and immediate: instead of showing a raw URL like `example.com/electronics/headphones/sony-wh1000xm5`, Google displays a clean breadcrumb trail: `example.com › Electronics › Headphones › Sony WH-1000XM5`. This makes the snippet more readable at a glance and communicates site structure to users before they click.',
        },
        {
          type: 'code',
          label: 'Breadcrumb schema — three levels',
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Electronics",
      "item": "https://example.com/electronics/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Sony WH-1000XM5"
    }
  ]
}
</script>`,
        },
      ],
    },
    {
      heading: 'What Breadcrumb Schema changes in Google Search results',
      blocks: [
        {
          type: 'p',
          text: 'The URL line in a standard Google snippet shows the raw page address — functional but hard to read. Breadcrumb schema replaces that raw URL with a human-readable navigation path, making your result look more organized and trustworthy at a glance. The effect appears in standard search results, mobile search, and Google Discover.',
        },
        {
          type: 'ul',
          items: [
            '**Readable path instead of raw URL** — "example.com › Headphones › Sony WH-1000XM5" instead of "example.com/products/headphones/sony-wh1000xm5-black-variant". Cleaner, more scannable.',
            '**Site structure signal for Google** — breadcrumb schema tells Google\'s crawler exactly how your pages relate to each other. This reinforces internal linking signals and helps Google understand your site architecture during indexing.',
            '**Improved CTR on category pages** — category pages benefit most, since the breadcrumb path communicates context that a URL slug alone often cannot.',
            '**Mobile SERP display** — on mobile, breadcrumbs appear as a separate line above the title in some layouts, giving your result more visual weight.',
            '**Consistent anchor text for internal links** — the name field in breadcrumb schema can reinforce the anchor text signals of your internal navigation links.',
            '**Multi-path product pages** — for products in multiple categories, multiple BreadcrumbList blocks on one page let Google choose the most relevant path for each query context.',
          ],
        },
      ],
    },
    {
      heading: 'BreadcrumbList fields — what each one does',
      blocks: [
        {
          type: 'p',
          text: 'BreadcrumbList has a minimal required structure — a list of ListItem objects, each with position, name, and optionally item (the URL). The simplicity is intentional: the schema is designed to be easy to implement correctly on any page type.',
        },
        {
          type: 'table',
          headers: ['Field', 'Required', 'Description'],
          rows: [
            ['@type: BreadcrumbList', 'Yes', 'Root type identifier — must be exactly "BreadcrumbList"'],
            ['itemListElement', 'Yes', 'Array of ListItem objects — one per breadcrumb level'],
            ['@type: ListItem', 'Yes', 'Type of each item — must be exactly "ListItem"'],
            ['position', 'Yes', 'Integer starting at 1 — order must be sequential with no gaps'],
            ['name', 'Yes', 'Display label for this breadcrumb level — shown in SERP'],
            ['item', 'Recommended', 'Full absolute URL of this level — optional for the last (current) item'],
          ],
        },
        {
          type: 'p',
          text: 'The **item** field (URL) is technically optional for the last breadcrumb — Google uses the page\'s canonical URL as a fallback. For all other levels it is strongly recommended: the URL tells Google that the named breadcrumb corresponds to a real, indexable page in your site hierarchy.',
        },
      ],
    },
    {
      heading: 'Common Breadcrumb Schema mistakes and how to avoid them',
      blocks: [
        {
          type: 'h3',
          text: 'Schema structure mistakes',
        },
        {
          type: 'ul',
          items: [
            '**Non-sequential positions** — positions must be 1, 2, 3... with no gaps or duplicates. If you have four levels, position values must be exactly 1, 2, 3, 4. Skipping from 1 to 3 or repeating position 2 makes the schema invalid.',
            '**Relative URLs instead of absolute** — item must always be a full URL including protocol: `https://example.com/category/` not `/category/`. Google rejects relative URLs in breadcrumb schema.',
            '**Fragment URLs** — item values like `https://example.com/page#section` are not supported. Breadcrumb URLs must be the canonical page URL without hash fragments.',
            '**Only one item** — BreadcrumbList requires at least two items to be valid. A single-item breadcrumb ("Home" alone) is not a list and will not generate a Rich Result.',
          ],
        },
        {
          type: 'h3',
          text: 'Content mismatch mistakes',
        },
        {
          type: 'ul',
          items: [
            '**Names that don\'t match visible breadcrumbs** — Google verifies that the name values in the schema correspond to what users see in the breadcrumb navigation on the page. If your schema says "Electronics" but the visible breadcrumb shows "All Electronics & Gadgets", Google may reject the markup.',
            '**Schema breadcrumb differs from page URL structure** — if the item URL in your schema doesn\'t match the actual canonical URL of that category page, Google\'s entity graph becomes confused about which page the breadcrumb level represents.',
            '**Breadcrumb schema on pages without visible breadcrumbs** — some implementations add BreadcrumbList schema to pages that have no visible breadcrumb navigation. This violates Google\'s requirement that schema content must be visible to users.',
          ],
        },
      ],
    },
    {
      heading: 'Technical deep dive: multiple paths and combining with other schemas',
      blocks: [
        {
          type: 'p',
          text: '**Multiple breadcrumb paths**: a product page accessible from two different categories can have two separate BreadcrumbList blocks on the same page. For example, a headphone product might appear under both Electronics → Headphones and Brands → Sony. Add two separate `<script type="application/ld+json">` blocks, each describing one path. Google reads both and may choose which path to display based on the query context — showing the Electronics path for a product-category query and the Sony path for a brand query.',
        },
        {
          type: 'p',
          text: '**Combining with Product or Article schema**: BreadcrumbList is designed to coexist with other schema types on the same page. A product page typically combines Product schema (for price, availability, ratings) and BreadcrumbList (for the navigation path). An article page combines Article schema (for author, date, publisher) and BreadcrumbList. Keep each type in its own `<script>` block — Google reads them independently.',
        },
        {
          type: 'p',
          text: '**Breadcrumb schema vs visible breadcrumb HTML**: many sites implement breadcrumbs using visible `<nav>` elements with `<ol>` and `<li>` tags. Having both the visible HTML breadcrumb and the JSON-LD schema is the recommended approach — they reinforce each other. The JSON-LD does not need to be written as Microdata in the HTML. However, the name and URL values in the JSON-LD must accurately reflect what the visible breadcrumb shows.',
        },
        {
          type: 'code',
          label: 'Multiple BreadcrumbList paths on one product page',
          code: `<!-- Path 1: via category -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",        "item": "https://example.com/" },
    { "@type": "ListItem", "position": 2, "name": "Electronics", "item": "https://example.com/electronics/" },
    { "@type": "ListItem", "position": 3, "name": "Headphones",  "item": "https://example.com/electronics/headphones/" },
    { "@type": "ListItem", "position": 4, "name": "Sony WH-1000XM5" }
  ]
}
</script>

<!-- Path 2: via brand -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",  "item": "https://example.com/" },
    { "@type": "ListItem", "position": 2, "name": "Sony",  "item": "https://example.com/brands/sony/" },
    { "@type": "ListItem", "position": 3, "name": "Sony WH-1000XM5" }
  ]
}
</script>`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Google require Breadcrumb schema to show breadcrumbs in search results?',
      answer: 'No — Google can generate breadcrumb-style URL display from your site structure and HTML navigation without schema. However, schema gives you explicit control over what text appears at each level and which URL each level maps to. Without schema, Google may show a truncated, auto-generated path that does not match your intended navigation labels. Schema ensures consistency.',
    },
    {
      question: 'Does Breadcrumb schema improve search rankings?',
      answer: 'Not directly — structured data is not a ranking factor. However, breadcrumb schema improves how your snippet looks in the SERP by replacing raw URLs with readable navigation paths. More readable snippets tend to have higher click-through rates, and higher CTR is an indirect positive signal for Google. The site structure signal from breadcrumb schema also helps Google crawl and understand your content hierarchy more efficiently.',
    },
    {
      question: 'Is the item (URL) field required for the last breadcrumb?',
      answer: 'No — the item field is optional for the last ListItem because it represents the current page. Google uses the page\'s canonical URL as a fallback. For all other items (parent levels), providing the item URL is strongly recommended: it explicitly maps each breadcrumb name to a real indexable page, which helps Google understand your site structure.',
    },
    {
      question: 'What is the minimum number of breadcrumb items required?',
      answer: 'Two items are the minimum for a valid BreadcrumbList. A single-item list (only "Home") is not a breadcrumb trail and will not generate a Rich Result. Most pages benefit from three or four levels: Home > Category > Page, or Home > Category > Subcategory > Page.',
    },
    {
      question: 'Can I use Breadcrumb schema on the homepage?',
      answer: 'It is not useful on the homepage itself — the homepage is the root of the breadcrumb hierarchy, so there is no trail leading to it. Breadcrumb schema is intended for pages at depth 2 or greater in your site structure. Adding a single-item BreadcrumbList on the homepage would be invalid anyway (requires at least two items).',
    },
    {
      question: 'What if my site has a flat structure with no category hierarchy?',
      answer: 'You can still use a two-level breadcrumb: Home > Page Name. Even without a middle category layer, this gives Google an explicit path and shows a clean name in the SERP instead of a raw URL slug. For a very flat site (only homepage + direct children), this is the simplest valid implementation.',
    },
    {
      question: 'Can I have multiple BreadcrumbList schemas on one page?',
      answer: 'Yes — multiple BreadcrumbList blocks are supported on a single page, each in its own <script> tag. This is useful for products or articles that are accessible through multiple navigation paths (e.g., a product in two categories, or an article in two topic sections). Google reads all paths and may choose which to display based on the search query context.',
    },
    {
      question: 'Can breadcrumb names in the schema differ from the visible breadcrumbs on the page?',
      answer: 'Minor differences are tolerated — Google does a fuzzy match, not an exact string match. However, significant differences will cause the markup to be rejected. If your visible breadcrumb shows "Wireless Headphones" and your schema says "Headphones", that is likely acceptable. If the schema says "Electronics Accessories" while the page shows nothing similar, Google will flag it as a mismatch.',
    },
    {
      question: 'Should I use absolute or relative URLs in the item field?',
      answer: 'Always use absolute URLs — the full address including protocol and domain: https://example.com/category/. Relative URLs like /category/ are not supported in schema.org structured data. Google requires absolute URLs for all item fields in BreadcrumbList.',
    },
    {
      question: 'How does Breadcrumb schema interact with Product or Article schema on the same page?',
      answer: 'They coexist independently in separate <script type="application/ld+json"> blocks. A product page typically has both Product schema (for price, availability) and BreadcrumbList (for the navigation path). Google reads each block separately and may generate rich results from both simultaneously — the price/rating information from Product schema and the breadcrumb trail from BreadcrumbList.',
    },
    {
      question: 'What happens if the breadcrumb position numbers are not sequential?',
      answer: 'The schema becomes invalid. Position values must be consecutive integers starting at 1 with no gaps or duplicates: 1, 2, 3, 4. If you skip a number (1, 2, 4) or repeat one (1, 2, 2, 3), Google\'s validator will flag the schema as having an error and may not generate the rich result. The generator assigns positions automatically in the correct order.',
    },
    {
      question: 'Do I need breadcrumb schema if I already have a visible breadcrumb navigation on the page?',
      answer: 'Having a visible HTML breadcrumb does not automatically generate schema — they are independent. You need both: the visible breadcrumb for users and accessibility, and the JSON-LD schema for explicit machine-readable communication with Google. Adding schema to pages that already have visible breadcrumbs is straightforward and low-risk. The schema values must accurately reflect what the visible breadcrumb shows.',
    },
  ],
  relatedTools: [
    { to: '/product-schema-generator',  name: 'Product Schema Generator',  desc: 'Add price, availability and ratings — combine with Breadcrumb on every product page' },
    { to: '/article-schema-generator',  name: 'Article Schema Generator',  desc: 'Add author and date markup — combine with Breadcrumb on every article page' },
    { to: '/meta-tags-generator',       name: 'Meta Tag Generator',        desc: 'Generate title, description, OG and Twitter Card tags with live preview' },
  ],
}

// ─── Per-type content map ──────────────────────────────────────────────────────

const CONTENT_BY_TYPE = {
  product:        PRODUCT,
  article:        ARTICLE,
  faq:            FAQ_SCHEMA,
  organization:   ORGANIZATION,
  'local-business': LOCAL_BUSINESS,
  breadcrumb:     BREADCRUMB,
}

export function buildContent(type) {
  return CONTENT_BY_TYPE[type] ?? GENERIC
}
