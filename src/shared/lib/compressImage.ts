/** Resizes/compresses an image on the phone before upload. Always outputs JPEG. */
export async function compressImage(
  file: File,
  opts: { width: number; height?: number; maxBytes: number },
): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas not supported')

  if (opts.height) {
    // Cover crop (e.g. 1200x630 social card)
    canvas.width = opts.width
    canvas.height = opts.height
    const s = Math.max(opts.width / bitmap.width, opts.height / bitmap.height)
    const dw = bitmap.width * s
    const dh = bitmap.height * s
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(bitmap, (opts.width - dw) / 2, (opts.height - dh) / 2, dw, dh)
  } else {
    // Keep aspect ratio, limit width
    const s = Math.min(1, opts.width / bitmap.width)
    canvas.width = Math.round(bitmap.width * s)
    canvas.height = Math.round(bitmap.height * s)
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  }
  bitmap.close()

  let blob: Blob | null = null
  for (const q of [0.85, 0.75, 0.65, 0.55, 0.45]) {
    blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', q))
    if (blob && blob.size <= opts.maxBytes) break
  }
  if (!blob) throw new Error('Could not compress image')
  return blob
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '')
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}
