"use client"

import { useState, useMemo } from "react"
import SearchFilters, { type SearchFilters as SearchFiltersType } from "@/components/search-filters"
import ProductCard from "@/components/product-card"
import { Leaf, Search, Loader2, AlertCircle } from "lucide-react"
import { useProducts } from "@/hooks/use-products"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Home() {
  const [searchFilters, setSearchFilters] = useState<SearchFiltersType>({
    searchTerm: "",
    category: "",
    crop: "",
    pest: "",
    disease: "",
  })

  const { products, loading, error } = useProducts()

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearchTerm =
        !searchFilters.searchTerm ||
        product.name.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
        product.activeIngredient.toLowerCase().includes(searchFilters.searchTerm.toLowerCase())

      const matchesCategory = !searchFilters.category || product.category === searchFilters.category

      const matchesCrop =
        !searchFilters.crop ||
        product.crops.some((crop) => crop.toLowerCase().includes(searchFilters.crop.toLowerCase()))

      const matchesPest =
        !searchFilters.pest ||
        product.targetPests.some((pest) => pest.toLowerCase().includes(searchFilters.pest.toLowerCase()))

      const matchesDisease =
        !searchFilters.disease ||
        product.targetDiseases.some((disease) => disease.toLowerCase().includes(searchFilters.disease.toLowerCase()))

      return matchesSearchTerm && matchesCategory && matchesCrop && matchesPest && matchesDisease
    })
  }, [products, searchFilters])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AgriSearch</h1>
              <p className="text-gray-600">Find the right agricultural products for your crops</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-green-600" />
                <span className="text-lg">Loading agricultural products...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}. Please make sure the products.csv file is available in the public folder.
              </AlertDescription>
            </Alert>
          )}

          {/* Main Content - Only show when not loading */}
          {!loading && !error && (
            <>
              {/* Search Filters */}
              <SearchFilters onSearch={setSearchFilters} />

              {/* Results Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900">Search Results</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Search className="h-4 w-4" />
                    <span>{filteredProducts.length} products found</span>
                  </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600">Try adjusting your search filters to find more products.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 AgriSearch. Helping farmers find the right agricultural solutions.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
