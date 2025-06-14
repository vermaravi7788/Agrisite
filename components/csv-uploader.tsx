"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import type { Product, CSVRow, CSVMapping } from "@/types/product"

interface CSVUploaderProps {
  onDataLoaded: (products: Product[]) => void
}

export default function CSVUploader({ onDataLoaded }: CSVUploaderProps) {
  const [csvData, setCsvData] = useState<CSVRow[]>([])
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [mapping, setMapping] = useState<CSVMapping>({
    name: "",
    category: "",
    crops: "",
    targetPests: "",
    targetDiseases: "",
    activeIngredient: "",
    dosage: "",
    whenToApply: "",
    howToApply: "",
    precautions: "",
    manufacturer: "",
  })
  const [isUploaded, setIsUploaded] = useState(false)
  const [error, setError] = useState<string>("")

  const parseCSV = (text: string): CSVRow[] => {
    const lines = text.split("\n").filter((line) => line.trim())
    if (lines.length === 0) return []

    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
    const rows: CSVRow[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
      const row: CSVRow = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ""
      })
      rows.push(row)
    }

    return rows
  }

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const parsed = parseCSV(text)

        if (parsed.length === 0) {
          setError("CSV file appears to be empty")
          return
        }

        const headers = Object.keys(parsed[0])
        setCsvData(parsed)
        setCsvHeaders(headers)
        setIsUploaded(true)
        setError("")
      } catch (err) {
        setError("Error parsing CSV file. Please check the format.")
      }
    }
    reader.readAsText(file)
  }, [])

  const handleMappingChange = (field: keyof CSVMapping, value: string) => {
    setMapping((prev) => ({ ...prev, [field]: value }))
  }

  const processData = () => {
    if (!csvData.length) return

    try {
      const products: Product[] = csvData.map((row, index) => {
        const parseArray = (value: string): string[] => {
          if (!value) return []
          return value
            .split(/[,;|]/)
            .map((item) => item.trim())
            .filter((item) => item)
        }

        return {
          id: (index + 1).toString(),
          name: row[mapping.name] || `Product ${index + 1}`,
          category: (row[mapping.category]?.toLowerCase() as Product["category"]) || "pesticide",
          crops: parseArray(row[mapping.crops]),
          targetPests: parseArray(row[mapping.targetPests]),
          targetDiseases: parseArray(row[mapping.targetDiseases]),
          activeIngredient: row[mapping.activeIngredient] || "",
          dosage: row[mapping.dosage] || "",
          whenToApply: row[mapping.whenToApply] || "",
          howToApply: row[mapping.howToApply] || "",
          precautions: parseArray(row[mapping.precautions]),
          manufacturer: row[mapping.manufacturer] || "",
          image: "/placeholder.svg?height=200&width=200",
        }
      })

      onDataLoaded(products)
      setError("")
    } catch (err) {
      setError("Error processing data. Please check your column mappings.")
    }
  }

  const isMappingComplete = Object.values(mapping).every((value) => value !== "")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload CSV Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload */}
        <div className="space-y-2">
          <Label htmlFor="csv-file">Select CSV File</Label>
          <Input id="csv-file" type="file" accept=".csv" onChange={handleFileUpload} className="cursor-pointer" />
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* CSV Preview and Mapping */}
        {isUploaded && csvHeaders.length > 0 && (
          <div className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                CSV uploaded successfully! Found {csvData.length} rows with {csvHeaders.length} columns.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Map CSV Columns to Product Fields</h3>
              <p className="text-sm text-muted-foreground">
                Select which column in your CSV corresponds to each product field:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(mapping).map(([field, value]) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                    </Label>
                    <Select value={value} onValueChange={(val) => handleMappingChange(field as keyof CSVMapping, val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select column" />
                      </SelectTrigger>
                      <SelectContent>
                        {csvHeaders.map((header) => (
                          <SelectItem key={header} value={header}>
                            {header}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <Button onClick={processData} disabled={!isMappingComplete} className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Load Products from CSV
              </Button>
            </div>
          </div>
        )}

        {/* CSV Format Help */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">CSV Format Guidelines:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• First row should contain column headers</li>
            <li>• Use commas to separate multiple values (e.g., "rice,wheat,corn")</li>
            <li>• Category should be: pesticide, fungicide, herbicide, or fertilizer</li>
            <li>• Precautions can be separated by commas or semicolons</li>
            <li>• All text fields should be enclosed in quotes if they contain commas</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
