import { triggerDownload } from './download'

export async function buildZip(files) {
  // JSZip is only needed on "Download all", so it stays out of the entry chunk.
  const { default: JSZip } = await import('jszip')
  const zip = new JSZip()
  const seen = {}
  files.forEach(f => {
    if (!f.resultBlob) return
    const baseName = `${f.name.replace(/\.[^.]+$/, '')}-pixel-art`
    if (seen[baseName] === undefined) {
      seen[baseName] = 0
      zip.file(`${baseName}.png`, f.resultBlob)
    } else {
      seen[baseName]++
      zip.file(`${baseName} (${seen[baseName]}).png`, f.resultBlob)
    }
  })
  const blob = await zip.generateAsync({ type: 'blob' })
  triggerDownload(blob, 'pixel-art.zip')
}
