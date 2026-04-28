import { useRef, useState } from 'react'
import './ImagePicker.scss'

export default function ImagePicker({
  onFileSelect,
  onClear,
  previewUrl,
  accept = 'image/*',
}) {
  const inputRef = useRef(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const dragCounter = useRef(0)

  function handleFileList(fileList) {
    const file = fileList?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div
      className={`ImagePicker${isDragOver ? ' ImagePicker--dragover' : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragEnter={event => {
        event.preventDefault()
        dragCounter.current++
        setIsDragOver(true)
      }}
      onDragOver={event => event.preventDefault()}
      onDragLeave={() => {
        dragCounter.current--
        if (dragCounter.current === 0) setIsDragOver(false)
      }}
      onDrop={event => {
        event.preventDefault()
        dragCounter.current = 0
        setIsDragOver(false)
        handleFileList(event.dataTransfer.files)
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={event => {
          handleFileList(event.target.files)
          event.target.value = ''
        }}
      />

      {previewUrl ? (
        <div className="ImagePicker__preview-wrap">
          <img src={previewUrl} alt="Selected source" className="ImagePicker__preview" />
          <div className="ImagePicker__actions">
            <button
              type="button"
              className="ImagePicker__btn"
              onClick={event => {
                event.stopPropagation()
                inputRef.current?.click()
              }}
            >
              Replace image
            </button>
            <button
              type="button"
              className="ImagePicker__btn ImagePicker__btn--danger"
              onClick={event => {
                event.stopPropagation()
                onClear()
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="ImagePicker__icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="ImagePicker__title">Drop one image here or click to select</p>
          <p className="ImagePicker__subtitle">PNG, JPG, WebP, SVG — screenshots, logos, or icons</p>
        </>
      )}
    </div>
  )
}
