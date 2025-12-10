export interface UserProfile {
  id: string
  gemini_api_key: string | null
  gemini_key_verified: boolean
  has_paid: boolean
  created_at: string
  updated_at: string
}

export interface ExplanationStyle {
  value: string
  label: string
}

export const EXPLANATION_STYLES: ExplanationStyle[] = [
  { value: 'simple', label: 'Simple (Like I\'m 5)' },
  { value: 'beginner', label: 'Beginner Friendly' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'analogy', label: 'Using Analogies' },
  { value: 'stepbystep', label: 'Step by Step' },
]
