import JSZip from 'jszip'
import { triggerDownload } from './download'

export async function buildZip(files, ext) {
  const zip = new JSZip()
  const seen = {}
  files.forEach(f => {
    if (!f.resultBlob) return
    const baseName = f.name.replace(/\.[^.]+$/, '')
    if (seen[baseName] === undefined) {
      seen[baseName] = 0
      zip.file(`${baseName}.${ext}`, f.resultBlob)
    } else {
      seen[baseName]++
      zip.file(`${baseName} (${seen[baseName]}).${ext}`, f.resultBlob)
    }
  })
  const blob = await zip.generateAsync({ type: 'blob' })
  triggerDownload(blob, `converted-to-${ext}.zip`)
}
