import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/types/product"
import { Droplets, Clock, Wrench, Shield, Building } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "pesticide":
        return "bg-red-100 text-red-800"
      case "fungicide":
        return "bg-blue-100 text-blue-800"
      case "herbicide":
        return "bg-green-100 text-green-800"
      case "fertilizer":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
            <Badge className={getCategoryColor(product.category)}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
          </div>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={60}
            height={60}
            className="rounded-lg border"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          <strong>Active Ingredient:</strong> {product.activeIngredient}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Droplets className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Dosage</p>
              <p className="text-sm text-muted-foreground">{product.dosage}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">When to Apply</p>
              <p className="text-sm text-muted-foreground">{product.whenToApply}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Wrench className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">How to Apply</p>
              <p className="text-sm text-muted-foreground">{product.howToApply}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          {product.crops.length > 0 && (
            <div>
              <p className="font-medium text-sm mb-1">Suitable Crops:</p>
              <div className="flex flex-wrap gap-1">
                {product.crops.slice(0, 3).map((crop) => (
                  <Badge key={crop} variant="secondary" className="text-xs">
                    {crop}
                  </Badge>
                ))}
                {product.crops.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{product.crops.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {product.targetPests.length > 0 && (
            <div>
              <p className="font-medium text-sm mb-1">Target Pests:</p>
              <div className="flex flex-wrap gap-1">
                {product.targetPests.slice(0, 2).map((pest) => (
                  <Badge key={pest} variant="outline" className="text-xs">
                    {pest}
                  </Badge>
                ))}
                {product.targetPests.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{product.targetPests.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {product.targetDiseases.length > 0 && (
            <div>
              <p className="font-medium text-sm mb-1">Target Diseases:</p>
              <div className="flex flex-wrap gap-1">
                {product.targetDiseases.slice(0, 2).map((disease) => (
                  <Badge key={disease} variant="outline" className="text-xs">
                    {disease}
                  </Badge>
                ))}
                {product.targetDiseases.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{product.targetDiseases.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-gray-500" />
            <p className="text-sm text-muted-foreground">{product.manufacturer}</p>
          </div>

          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Precautions</p>
              <ul className="text-xs text-muted-foreground list-disc list-inside">
                {product.precautions.slice(0, 2).map((precaution, index) => (
                  <li key={index}>{precaution}</li>
                ))}
                {product.precautions.length > 2 && <li>+{product.precautions.length - 2} more precautions</li>}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
