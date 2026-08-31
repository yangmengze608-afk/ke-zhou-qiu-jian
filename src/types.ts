export type Blueprint = {
  keep: string[]
  kill: string[]
  ai_mutation: string[]
  mvp_features: string[]
}

export type Artifact = {
  id: string
  name: string
  category: string
  lifecycle: { born: number | null; ended: number | null; status: string }
  verification_status: 'demo-unverified' | 'partially-verified' | 'verified'
  summary: string
  product_dna: string[]
  why_it_mattered: string[]
  why_it_disappeared: string[]
  what_survived: string[]
  ai_changes: string[]
  revival: { score: number | null; score_status: string; blueprint: Blueprint }
  rights_status: string
  sources: unknown[]
}
