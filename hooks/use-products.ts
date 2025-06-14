"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/types/product"
import { parseCSV, convertCSVToProducts } from "@/utils/csv-parser"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const response = await fetch("/products.csv")

        if (!response.ok) {
          throw new Error("Failed to load products data")
        }

        const csvText = await response.text()
        const csvData = parseCSV(csvText)
        const productsData = convertCSVToProducts(csvData)

        setProducts(productsData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products")
        console.error("Error loading products:", err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return { products, loading, error }
}
