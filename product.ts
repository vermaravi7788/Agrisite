export interface Product {
  id: string
  name: string
  category: "pesticide" | "fungicide" | "herbicide" | "fertilizer"
  crops: string[]
  targetPests: string[]
  targetDiseases: string[]
  activeIngredient: string
  dosage: string
  whenToApply: string
  howToApply: string
  precautions: string[]
  manufacturer: string
  image: string
}

export interface CSVRow {
  [key: string]: string
}

export interface CSVMapping {
  name: string
  category: string
  crops: string
  targetPests: string
  targetDiseases: string
  activeIngredient: string
  dosage: string
  whenToApply: string
  howToApply: string
  precautions: string
  manufacturer: string
}
