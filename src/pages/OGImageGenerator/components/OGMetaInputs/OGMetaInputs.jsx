import './OGMetaInputs.scss'

export default function OGMetaInputs({
  title, onTitleChange,
  description, onDescriptionChange,
  pageUrl, onPageUrlChange,
  siteName, onSiteNameChange,
  locale, onLocaleChange,
  addTwitter, onAddTwitterChange,
  twitterSite, onTwitterSiteChange,
  twitterCreator, onTwitterCreatorChange,
  twitterCard, onTwitterCardChange,
  addComments, onAddCommentsChange,
}) {
  return (
    <div className="OGMetaInputs">

      {/* ── Open Graph ── */}
      <div className="OGMetaInputs__section">
        <div className="OGMetaInputs__section-label">Open Graph</div>

        <div className="OGMetaInputs__field">
          <div className="OGMetaInputs__label-row">
            <label className="OGMetaInputs__label">Title</label>
            <span className={`OGMetaInputs__counter${title.length > 60 ? ' OGMetaInputs__counter--warn' : ''}`}>
              {title.length}/60
            </span>
          </div>
          <input
            type="text"
            className="OGMetaInputs__input"
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            placeholder="My page title"
          />
        </div>

        <div className="OGMetaInputs__field">
          <div className="OGMetaInputs__label-row">
            <label className="OGMetaInputs__label">Description</label>
            <span className={`OGMetaInputs__counter${description.length > 200 ? ' OGMetaInputs__counter--warn' : ''}`}>
              {description.length}/200
            </span>
          </div>
          <textarea
            className="OGMetaInputs__textarea"
            value={description}
            onChange={e => onDescriptionChange(e.target.value)}
            placeholder="A short description for link previews"
            rows={3}
          />
        </div>

        <div className="OGMetaInputs__field">
          <label className="OGMetaInputs__label">Page URL</label>
          <input
            type="url"
            className="OGMetaInputs__input"
            value={pageUrl}
            onChange={e => onPageUrlChange(e.target.value)}
            placeholder="https://example.com/page-url"
          />
        </div>

        <div className="OGMetaInputs__field">
          <label className="OGMetaInputs__label">Site name</label>
          <input
            type="text"
            className="OGMetaInputs__input"
            value={siteName}
            onChange={e => onSiteNameChange(e.target.value)}
            placeholder="My Brand"
          />
        </div>

        <div className="OGMetaInputs__field">
          <label className="OGMetaInputs__label">Locale</label>
          <input
            type="text"
            className="OGMetaInputs__input"
            value={locale}
            onChange={e => onLocaleChange(e.target.value)}
            placeholder="en_US"
            spellCheck={false}
          />
          <p className="OGMetaInputs__hint">Format: language_TERRITORY — omit if your content is in English</p>
        </div>
      </div>

      {/* ── Twitter / X ── */}
      <div className="OGMetaInputs__section">
        <div className="OGMetaInputs__section-label">Twitter / X</div>
        <label className="OGMetaInputs__checkbox-label">
          <input
            type="checkbox"
            className="OGMetaInputs__checkbox"
            checked={addTwitter}
            onChange={e => onAddTwitterChange(e.target.checked)}
          />
          Add Twitter / X tags
        </label>

        {addTwitter && (
          <div className="OGMetaInputs__twitter-fields">
            <div className="OGMetaInputs__field">
              <label className="OGMetaInputs__label">Card type</label>
              <div className="OGMetaInputs__radio-group">
                {[
                  { value: 'summary_large_image', label: 'Large image', code: 'summary_large_image' },
                  { value: 'summary',             label: 'Thumbnail',   code: 'summary' },
                ].map(opt => (
                  <label
                    key={opt.value}
                    className={`OGMetaInputs__radio-label${twitterCard === opt.value ? ' OGMetaInputs__radio-label--checked' : ''}`}
                  >
                    <input
                      type="radio"
                      className="OGMetaInputs__radio"
                      name="og-twitter-card"
                      value={opt.value}
                      checked={twitterCard === opt.value}
                      onChange={() => onTwitterCardChange(opt.value)}
                    />
                    <span className="OGMetaInputs__radio-text">
                      {opt.label}
                      <code className="OGMetaInputs__code">{opt.code}</code>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="OGMetaInputs__field">
              <label className="OGMetaInputs__label">Site handle</label>
              <input
                type="text"
                className="OGMetaInputs__input"
                value={twitterSite}
                onChange={e => onTwitterSiteChange(e.target.value)}
                placeholder="@yourbrand"
              />
            </div>

            <div className="OGMetaInputs__field">
              <label className="OGMetaInputs__label">Creator handle</label>
              <input
                type="text"
                className="OGMetaInputs__input"
                value={twitterCreator}
                onChange={e => onTwitterCreatorChange(e.target.value)}
                placeholder="@author"
              />
              <p className="OGMetaInputs__hint">Author's personal handle — omit if same as site handle</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Options ── */}
      <div className="OGMetaInputs__section OGMetaInputs__section--last">
        <label className="OGMetaInputs__checkbox-label">
          <input
            type="checkbox"
            className="OGMetaInputs__checkbox"
            checked={addComments}
            onChange={e => onAddCommentsChange(e.target.checked)}
          />
          Add comments in code
        </label>
      </div>

    </div>
  )
}
