import { useEffect } from 'react'
import './Lightbox.scss'

export default function Lightbox({ url, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="Lightbox" onClick={onClose}>
      <button className="Lightbox__close" onClick={onClose} aria-label="Close preview">
        <svg viewBox="0 0 24 24" fill="none">
          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <img
        className="Lightbox__img"
        src={url}
        alt="Preview"
        onClick={e => e.stopPropagation()}
      />
    </div>
  )
}
