import { useRef, useState } from 'react'
import './DropZone.scss'

export default function DropZone({ onFilesAdded }) {
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

  function handleClick() {
    inputRef.current.click()
  }

  return (
    <div
      className={`DropZone${dragover ? ' DropZone--dragover' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/gif,image/avif,image/bmp,image/webp"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <div className="DropZone__icon">
        <svg viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <p className="DropZone__title">Drop images here or click to select</p>
      <p className="DropZone__subtitle">JPG, PNG, GIF, AVIF, BMP — multiple files supported</p>
      <button
        className="DropZone__btn"
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
