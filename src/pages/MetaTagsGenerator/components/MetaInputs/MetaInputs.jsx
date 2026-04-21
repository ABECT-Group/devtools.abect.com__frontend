import { useEffect, useState } from 'react'
import HreflangSection from '../HreflangSection/HreflangSection'
import './MetaInputs.scss'

export default function MetaInputs({
  title, onTitleChange,
  description, onDescriptionChange,
  canonicalUrl, onCanonicalUrlChange,
  keywords, onKeywordsChange,
  author, onAuthorChange,
  robotsIndex, onRobotsIndexChange,
  robotsFollow, onRobotsFollowChange,
  isMultilang, onIsMultilangChange,
  hreflangEntries, onHreflangAdd, onHreflangRemove, onHreflangChange,
  themeColor, onThemeColorChange,
  themeColorDark, onThemeColorDarkChange,
  enableThemeColorDark, onEnableThemeColorDarkChange,
  charset, onCharsetChange,
  colorScheme, onColorSchemeChange,
  referrerPolicy, onReferrerPolicyChange,
  noTranslate, onNoTranslateChange,
  noScale, onNoScaleChange,
  noPhoneDetection, onNoPhoneDetectionChange,
  addComments, onAddCommentsChange,
}) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [hexDraft, setHexDraft] = useState(themeColor)
  const [hexDraftDark, setHexDraftDark] = useState(themeColorDark)

  useEffect(() => { setHexDraft(themeColor) }, [themeColor])
  useEffect(() => { setHexDraftDark(themeColorDark) }, [themeColorDark])

  function handleHexInput(value) {
    setHexDraft(value)
    if (/^#[0-9a-fA-F]{6}$/.test(value)) onThemeColorChange(value)
  }

  function handleHexDarkInput(value) {
    setHexDraftDark(value)
    if (/^#[0-9a-fA-F]{6}$/.test(value)) onThemeColorDarkChange(value)
  }

  return (
    <div className="MetaInputs">

      {/* ── General ── */}
      <div className="MetaInputs__section">
        <div className="MetaInputs__field">
          <div className="MetaInputs__label-row">
            <label className="MetaInputs__label">Title</label>
            <span className={`MetaInputs__counter${title.length > 60 ? ' MetaInputs__counter--warn' : ''}`}>
              {title.length}/60
            </span>
          </div>
          <input
            type="text"
            className="MetaInputs__input"
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            placeholder="My page title"
          />
        </div>

        <div className="MetaInputs__field">
          <div className="MetaInputs__label-row">
            <label className="MetaInputs__label">Description</label>
            <span className={`MetaInputs__counter${description.length > 160 ? ' MetaInputs__counter--warn' : ''}`}>
              {description.length}/160
            </span>
          </div>
          <textarea
            className="MetaInputs__textarea"
            value={description}
            onChange={e => onDescriptionChange(e.target.value)}
            placeholder="A short description of the page content"
            rows={3}
          />
        </div>

        <div className="MetaInputs__field">
          <label className="MetaInputs__label">Canonical URL</label>
          <input
            type="url"
            className="MetaInputs__input"
            value={canonicalUrl}
            onChange={e => onCanonicalUrlChange(e.target.value)}
            placeholder="https://example.com/page-url"
          />
        </div>

        <div className="MetaInputs__field">
          <label className="MetaInputs__label">
            Keywords
            <span className="MetaInputs__tooltip-wrap" aria-label="About keywords">
              <svg className="MetaInputs__tooltip-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M8 7v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="8" cy="4.5" r="0.75" fill="currentColor"/>
              </svg>
              <span className="MetaInputs__tooltip" role="tooltip">
                Ignored by Google since 2009 and by all major search engines. Including keywords exposes your SEO strategy to competitors with no ranking benefit. Add only if your CMS or client explicitly requires it.
              </span>
            </span>
          </label>
          <input
            type="text"
            className="MetaInputs__input"
            value={keywords}
            onChange={e => onKeywordsChange(e.target.value)}
            placeholder="seo, tools, meta tags"
          />
        </div>

        <div className="MetaInputs__field">
          <label className="MetaInputs__label">
            Author
            <span className="MetaInputs__tooltip-wrap" aria-label="About author">
              <svg className="MetaInputs__tooltip-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M8 7v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="8" cy="4.5" r="0.75" fill="currentColor"/>
              </svg>
              <span className="MetaInputs__tooltip" role="tooltip">
                Not used as a ranking factor by Google or any major search engine. Useful for content attribution in CMS platforms and news aggregators.
              </span>
            </span>
          </label>
          <input
            type="text"
            className="MetaInputs__input"
            value={author}
            onChange={e => onAuthorChange(e.target.value)}
            placeholder="John Smith"
          />
        </div>
      </div>

      {/* ── Search engine robots ── */}
      <div className="MetaInputs__section">
        <div className="MetaInputs__field">
          <label className="MetaInputs__label">Page indexing</label>
          <div className="MetaInputs__radio-group">
            <label className="MetaInputs__radio-label">
              <input
                type="radio"
                className="MetaInputs__radio"
                name="robots-index"
                value="index"
                checked={robotsIndex === 'index'}
                onChange={() => onRobotsIndexChange('index')}
              />
              <span className="MetaInputs__radio-text">
                Allow indexing
                <code className="MetaInputs__radio-code">index</code>
              </span>
            </label>
            <label className="MetaInputs__radio-label">
              <input
                type="radio"
                className="MetaInputs__radio"
                name="robots-index"
                value="noindex"
                checked={robotsIndex === 'noindex'}
                onChange={() => onRobotsIndexChange('noindex')}
              />
              <span className="MetaInputs__radio-text">
                Hide from search results
                <code className="MetaInputs__radio-code">noindex</code>
              </span>
            </label>
          </div>
        </div>

        <div className="MetaInputs__field">
          <label className="MetaInputs__label">Link following</label>
          <div className="MetaInputs__radio-group">
            <label className="MetaInputs__radio-label">
              <input
                type="radio"
                className="MetaInputs__radio"
                name="robots-follow"
                value="follow"
                checked={robotsFollow === 'follow'}
                onChange={() => onRobotsFollowChange('follow')}
              />
              <span className="MetaInputs__radio-text">
                Follow links on this page
                <code className="MetaInputs__radio-code">follow</code>
              </span>
            </label>
            <label className="MetaInputs__radio-label">
              <input
                type="radio"
                className="MetaInputs__radio"
                name="robots-follow"
                value="nofollow"
                checked={robotsFollow === 'nofollow'}
                onChange={() => onRobotsFollowChange('nofollow')}
              />
              <span className="MetaInputs__radio-text">
                Don't follow links
                <code className="MetaInputs__radio-code">nofollow</code>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* ── Multilingual ── */}
      <div className="MetaInputs__section">
        <div className="MetaInputs__section-label">Multilingual (hreflang)</div>
        <label className="MetaInputs__checkbox-label">
          <input
            type="checkbox"
            className="MetaInputs__checkbox"
            checked={isMultilang}
            onChange={e => onIsMultilangChange(e.target.checked)}
          />
          My site has multiple language versions
        </label>
        {isMultilang && (
          <HreflangSection
            entries={hreflangEntries}
            onAdd={onHreflangAdd}
            onRemove={onHreflangRemove}
            onChange={onHreflangChange}
          />
        )}
      </div>

      {/* ── Theme color ── */}
      <div className="MetaInputs__section">
        <div className="MetaInputs__field">
          <label className="MetaInputs__label">Theme color</label>
          <div className="MetaInputs__color-row">
            <input
              type="color"
              className="MetaInputs__color-swatch"
              value={themeColor}
              onChange={e => onThemeColorChange(e.target.value)}
            />
            <input
              type="text"
              className="MetaInputs__color-hex-input"
              value={hexDraft}
              onChange={e => handleHexInput(e.target.value)}
              placeholder="#ffffff"
              maxLength={7}
              spellCheck={false}
            />
          </div>
          <p className="MetaInputs__hint">Browser UI color on mobile Chrome and Edge</p>
        </div>
        <label className="MetaInputs__checkbox-label">
          <input
            type="checkbox"
            className="MetaInputs__checkbox"
            checked={enableThemeColorDark}
            onChange={e => onEnableThemeColorDarkChange(e.target.checked)}
          />
          Add dark mode color
        </label>
        {enableThemeColorDark && (
          <div className="MetaInputs__field MetaInputs__field--dark-color">
            <label className="MetaInputs__label">Dark mode color</label>
            <div className="MetaInputs__color-row">
              <input
                type="color"
                className="MetaInputs__color-swatch"
                value={themeColorDark}
                onChange={e => onThemeColorDarkChange(e.target.value)}
              />
              <input
                type="text"
                className="MetaInputs__color-hex-input"
                value={hexDraftDark}
                onChange={e => handleHexDarkInput(e.target.value)}
                placeholder="#000000"
                maxLength={7}
                spellCheck={false}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Comments ── */}
      <div className="MetaInputs__section">
        <label className="MetaInputs__checkbox-label">
          <input
            type="checkbox"
            className="MetaInputs__checkbox"
            checked={addComments}
            onChange={e => onAddCommentsChange(e.target.checked)}
          />
          Add comments in code
        </label>
      </div>

      {/* ── Advanced ── */}
      <div className="MetaInputs__section MetaInputs__section--last">
        <button
          type="button"
          className={`MetaInputs__advanced-toggle${isAdvancedOpen ? ' MetaInputs__advanced-toggle--open' : ''}`}
          onClick={() => setIsAdvancedOpen(v => !v)}
        >
          <svg className="MetaInputs__advanced-arrow" viewBox="0 0 12 8" aria-hidden="true">
            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
          Advanced settings
        </button>

        {isAdvancedOpen && (
          <div className="MetaInputs__advanced-content">
            <div className="MetaInputs__field">
              <label className="MetaInputs__label">
                Color scheme
                <span className="MetaInputs__tooltip-wrap" aria-label="About color scheme">
                  <svg className="MetaInputs__tooltip-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M8 7v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <circle cx="8" cy="4.5" r="0.75" fill="currentColor"/>
                  </svg>
                  <span className="MetaInputs__tooltip" role="tooltip">
                    Tells the browser which color schemes this page supports — prevents white flash in dark mode
                  </span>
                </span>
              </label>
              <select
                className="MetaInputs__select"
                value={colorScheme}
                onChange={e => onColorSchemeChange(e.target.value)}
              >
                <option value="">Don't specify</option>
                <option value="light dark">Light &amp; Dark (recommended)</option>
                <option value="light">Light only</option>
                <option value="dark">Dark only</option>
              </select>
            </div>

            <div className="MetaInputs__field">
              <label className="MetaInputs__label">
                Referrer policy
                <span className="MetaInputs__tooltip-wrap" aria-label="About referrer policy">
                  <svg className="MetaInputs__tooltip-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M8 7v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <circle cx="8" cy="4.5" r="0.75" fill="currentColor"/>
                  </svg>
                  <span className="MetaInputs__tooltip" role="tooltip">
                    Controls how much URL info is sent when users navigate away from this page
                  </span>
                </span>
              </label>
              <select
                className="MetaInputs__select"
                value={referrerPolicy}
                onChange={e => onReferrerPolicyChange(e.target.value)}
              >
                <option value="">Browser default</option>
                <option value="strict-origin-when-cross-origin">strict-origin-when-cross-origin (recommended)</option>
                <option value="no-referrer">no-referrer</option>
                <option value="no-referrer-when-downgrade">no-referrer-when-downgrade</option>
                <option value="origin">origin</option>
                <option value="same-origin">same-origin</option>
                <option value="unsafe-url">unsafe-url</option>
              </select>
            </div>

            <div className="MetaInputs__field">
              <label className="MetaInputs__label">Charset</label>
              <select
                className="MetaInputs__select"
                value={charset}
                onChange={e => onCharsetChange(e.target.value)}
              >
                <option value="UTF-8">UTF-8 (recommended)</option>
                <option value="ISO-8859-1">ISO-8859-1 (Latin-1)</option>
                <option value="windows-1251">windows-1251 (Cyrillic)</option>
              </select>
            </div>

            <div className="MetaInputs__field">
              <label className="MetaInputs__label">Extra tags</label>
              <label className="MetaInputs__checkbox-label">
                <input
                  type="checkbox"
                  className="MetaInputs__checkbox"
                  checked={noTranslate}
                  onChange={e => onNoTranslateChange(e.target.checked)}
                />
                <span>
                  Disable Google Translate
                  <code className="MetaInputs__inline-code">notranslate</code>
                </span>
              </label>
              <label className="MetaInputs__checkbox-label">
                <input
                  type="checkbox"
                  className="MetaInputs__checkbox"
                  checked={noScale}
                  onChange={e => onNoScaleChange(e.target.checked)}
                />
                <span>
                  Disable mobile zoom
                  <code className="MetaInputs__inline-code">user-scalable=no</code>
                </span>
              </label>
              <label className="MetaInputs__checkbox-label">
                <input
                  type="checkbox"
                  className="MetaInputs__checkbox"
                  checked={noPhoneDetection}
                  onChange={e => onNoPhoneDetectionChange(e.target.checked)}
                />
                <span>
                  Disable phone number detection
                  <code className="MetaInputs__inline-code">format-detection</code>
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
