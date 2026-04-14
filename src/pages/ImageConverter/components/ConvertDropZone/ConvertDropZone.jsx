import { useRef, useState } from 'react'
import './ConvertDropZone.scss'

const ACCEPTED = 'image/jpeg,image/png,image/webp,image/gif,image/bmp,image/avif,image/tiff'

export default function ConvertDropZone({ fromLabel, onFilesAdded }) {
  const [dragover, setDragover] = useState(false)
  const inputRef = useRef(null)
  const dragCounter = useRef(0)

  function handleDragEnter(event) {
    event.preventDefault()
    dragCounter.current++
    setDragover(true)
  }

  function handleDragOver(event) {
    event.preventDefault()
  }

  function handleDragLeave() {
    dragCounter.current--
    if (dragCounter.current === 0) setDragover(false)
  }

  function handleDrop(event) {
    event.preventDefault()
    dragCounter.current = 0
    setDragover(false)
    const files = event.dataTransfer.files
    if (files.length > 0) onFilesAdded(files)
  }

  function handleChange(event) {
    if (event.target.files.length > 0) {
      onFilesAdded(event.target.files)
      event.target.value = ''
    }
  }

  return (
    <div
      className={`ConvertDropZone${dragover ? ' ConvertDropZone--dragover' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <div className="ConvertDropZone__icon">
        <svg viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <p className="ConvertDropZone__title">Drop {fromLabel} files here or click to select</p>
      <p className="ConvertDropZone__subtitle">JPG, PNG, WebP, GIF, BMP, AVIF, TIFF — multiple files supported</p>
      <button
        className="ConvertDropZone__btn"
        onClick={event => {
          event.stopPropagation()
          inputRef.current.click()
        }}
      >
        Choose files
      </button>
    </div>
  )
}
