"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void
}

export interface SearchFilters {
  searchTerm: string
  category: string
  crop: string
  pest: string
  disease: string
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    category: "",
    crop: "",
    pest: "",
    disease: "",
  })

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleReset = () => {
    const resetFilters = {
      searchTerm: "",
      category: "",
      crop: "",
      pest: "",
      disease: "",
    }
    setFilters(resetFilters)
    onSearch(resetFilters)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Search Agricultural Products
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Product Name</Label>
            <Input
              id="search"
              placeholder="Search products..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pesticide">Pesticide</SelectItem>
                <SelectItem value="fungicide">Fungicide</SelectItem>
                <SelectItem value="herbicide">Herbicide</SelectItem>
                <SelectItem value="fertilizer">Fertilizer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="crop">Crop</Label>
            <Select value={filters.crop} onValueChange={(value) => setFilters({ ...filters, crop: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="cotton">Cotton</SelectItem>
                <SelectItem value="tomato">Tomato</SelectItem>
                <SelectItem value="potato">Potato</SelectItem>
                <SelectItem value="soybean">Soybean</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pest">Target Pest</Label>
            <Select value={filters.pest} onValueChange={(value) => setFilters({ ...filters, pest: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select pest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aphids">Aphids</SelectItem>
                <SelectItem value="thrips">Thrips</SelectItem>
                <SelectItem value="whitefly">Whitefly</SelectItem>
                <SelectItem value="bollworm">Bollworm</SelectItem>
                <SelectItem value="caterpillars">Caterpillars</SelectItem>
                <SelectItem value="broadleaf weeds">Broadleaf Weeds</SelectItem>
                <SelectItem value="grassy weeds">Grassy Weeds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="disease">Target Disease</Label>
            <Select value={filters.disease} onValueChange={(value) => setFilters({ ...filters, disease: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select disease" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="late blight">Late Blight</SelectItem>
                <SelectItem value="powdery mildew">Powdery Mildew</SelectItem>
                <SelectItem value="downy mildew">Downy Mildew</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="bacterial blight">Bacterial Blight</SelectItem>
                <SelectItem value="anthracnose">Anthracnose</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSearch} className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Products
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
