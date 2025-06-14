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
