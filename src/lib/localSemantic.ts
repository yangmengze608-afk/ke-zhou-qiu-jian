const TRANSFORMERS_CDN = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1'
export const SEMANTIC_MODEL = 'Xenova/multilingual-e5-small'

export type SemanticProgress = { label: string; percent?: number }
type TensorLike = { tolist: () => number[] | number[][] }
type Extractor = (input: string | string[], options: { pooling: 'mean'; normalize: true }) => Promise<TensorLike>

let extractorPromise: Promise<Extractor> | null = null

const progressLabel = (info: unknown): SemanticProgress => {
  if (!info || typeof info !== 'object') return { label: '准备本地语义模型…' }
  const row = info as Record<string, unknown>
  const status = typeof row.status === 'string' ? row.status : 'loading'
  const file = typeof row.file === 'string' ? row.file.split('/').at(-1) : ''
  const raw = typeof row.progress === 'number' ? row.progress : undefined
  return { label: file ? `${status} · ${file}` : status, percent: raw === undefined ? undefined : Math.max(0, Math.min(100, raw)) }
}

export async function getSemanticExtractor(onProgress?: (progress: SemanticProgress) => void): Promise<Extractor> {
  if (!extractorPromise) {
    extractorPromise = (async () => {
      onProgress?.({ label: '加载 Transformers.js…' })
      const transformers = await import(/* @vite-ignore */ TRANSFORMERS_CDN) as { pipeline: (...args: unknown[]) => Promise<Extractor> }
      const extractor = await transformers.pipeline('feature-extraction', SEMANTIC_MODEL, {
        dtype: 'q8',
        progress_callback: (info: unknown) => onProgress?.(progressLabel(info)),
      })
      onProgress?.({ label: '本地语义模型已就绪', percent: 100 })
      return extractor
    })().catch(error => {
      extractorPromise = null
      throw error
    })
  }
  return extractorPromise
}

export async function embedTexts(
  texts: string[],
  kind: 'query' | 'passage',
  onProgress?: (progress: SemanticProgress) => void,
): Promise<number[][]> {
  if (!texts.length) return []
  const extractor = await getSemanticExtractor(onProgress)
  const prefixed = texts.map(text => `${kind}: ${text}`)
  const tensor = await extractor(prefixed, { pooling: 'mean', normalize: true })
  const rows = tensor.tolist()
  if (!Array.isArray(rows[0])) return [rows as number[]]
  return rows as number[][]
}

export const dotSimilarity = (a: number[], b: number[]) => {
  const size = Math.min(a.length, b.length)
  let sum = 0
  for (let i = 0; i < size; i += 1) sum += a[i] * b[i]
  return sum
}
