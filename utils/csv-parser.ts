import type { Product } from "@/types/product"

export interface CSVRow {
  [key: string]: string
}

export function parseCSV(csvText: string): CSVRow[] {
  const lines = csvText.split("\n").filter((line) => line.trim())
  if (lines.length === 0) return []

  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
  const rows: CSVRow[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    const row: CSVRow = {}
    headers.forEach((header, index) => {
      row[header] = values[index] || ""
    })
    rows.push(row)
  }

  return rows
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

export function convertCSVToProducts(csvData: CSVRow[]): Product[] {
  return csvData.map((row, index) => {
    const parseArray = (value: string): string[] => {
      if (!value) return []
      return value
        .split(/[,;|]/)
        .map((item) => item.trim())
        .filter((item) => item)
    }

    const normalizeCategory = (category: string): Product["category"] => {
      const normalized = category.toLowerCase().trim()
      if (["pesticide", "fungicide", "herbicide", "fertilizer"].includes(normalized)) {
        return normalized as Product["category"]
      }
      return "pesticide" // default fallback
    }

    return {
      id: (index + 1).toString(),
      name: row["Product Name"] || `Product ${index + 1}`,
      category: normalizeCategory(row["Category"] || "pesticide"),
      crops: parseArray(row["Crops"]),
      targetPests: parseArray(row["Target Pests"]),
      targetDiseases: parseArray(row["Target Diseases"]),
      activeIngredient: row["Active Ingredient"] || "",
      dosage: row["Dosage"] || "",
      whenToApply: row["When to Apply"] || "",
      howToApply: row["How to Apply"] || "",
      precautions: parseArray(row["Precautions"]),
      manufacturer: row["Manufacturer"] || "",
      image: "/placeholder.svg?height=200&width=200",
    }
  })
}
