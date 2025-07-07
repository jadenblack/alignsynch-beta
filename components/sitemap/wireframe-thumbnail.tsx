import { Badge } from "@/components/ui/badge"
import type { PageNode } from "@/lib/sitemap-data"

interface WireframeThumbnailProps {
  page: PageNode
  size?: "sm" | "md" | "lg"
}

export function WireframeThumbnail({ page, size = "md" }: WireframeThumbnailProps) {
  const sizeClasses = {
    sm: "w-32 h-24",
    md: "w-48 h-36",
    lg: "w-64 h-48",
  }

  const renderWireframe = () => {
    switch (page.wireframe.layout) {
      case "landing":
        return (
          <div className="w-full h-full bg-gray-50 border rounded p-1">
            {/* Header */}
            <div className="h-2 bg-gray-300 rounded mb-1"></div>
            {/* Hero */}
            <div className="h-8 bg-blue-100 rounded mb-1 flex items-center justify-center">
              <div className="w-4 h-1 bg-blue-300 rounded"></div>
            </div>
            {/* Features */}
            <div className="grid grid-cols-3 gap-1 mb-1">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
            {/* CTA */}
            <div className="h-3 bg-purple-100 rounded"></div>
          </div>
        )

      case "form":
        return (
          <div className="w-full h-full bg-gray-50 border rounded p-1">
            {/* Header */}
            <div className="h-2 bg-gray-300 rounded mb-2"></div>
            {/* Form */}
            <div className="bg-white rounded p-2 mx-auto w-3/4">
              <div className="space-y-1">
                <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                <div className="h-2 bg-gray-100 rounded"></div>
                <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                <div className="h-2 bg-gray-100 rounded"></div>
                <div className="h-2 bg-blue-200 rounded mt-2"></div>
              </div>
            </div>
          </div>
        )

      case "dashboard":
        return (
          <div className="w-full h-full bg-gray-50 border rounded p-1">
            {/* Header */}
            <div className="h-2 bg-gray-300 rounded mb-1"></div>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-1 mb-1">
              <div className="h-3 bg-blue-100 rounded"></div>
              <div className="h-3 bg-green-100 rounded"></div>
              <div className="h-3 bg-purple-100 rounded"></div>
              <div className="h-3 bg-orange-100 rounded"></div>
            </div>
            {/* Content */}
            <div className="grid grid-cols-2 gap-1">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        )

      case "list":
        return (
          <div className="w-full h-full bg-gray-50 border rounded p-1">
            {/* Header */}
            <div className="h-2 bg-gray-300 rounded mb-1"></div>
            {/* Filter */}
            <div className="h-1 bg-gray-200 rounded mb-1"></div>
            {/* Grid */}
            <div className="grid grid-cols-3 gap-1">
              <div className="h-6 bg-blue-100 rounded"></div>
              <div className="h-6 bg-green-100 rounded"></div>
              <div className="h-6 bg-purple-100 rounded"></div>
              <div className="h-6 bg-orange-100 rounded"></div>
              <div className="h-6 bg-red-100 rounded"></div>
              <div className="h-6 bg-teal-100 rounded"></div>
            </div>
          </div>
        )

      case "detail":
        return (
          <div className="w-full h-full bg-gray-50 border rounded p-1">
            {/* Header */}
            <div className="h-2 bg-gray-300 rounded mb-1"></div>
            {/* Progress */}
            <div className="h-1 bg-blue-200 rounded mb-1"></div>
            {/* Main Content */}
            <div className="bg-white rounded p-1 mb-1">
              <div className="h-3 bg-gray-200 rounded mb-1"></div>
              <div className="grid grid-cols-2 gap-1">
                <div className="h-2 bg-gray-100 rounded"></div>
                <div className="h-2 bg-gray-100 rounded"></div>
                <div className="h-2 bg-gray-100 rounded"></div>
                <div className="h-2 bg-gray-100 rounded"></div>
              </div>
            </div>
            {/* Action */}
            <div className="h-2 bg-blue-200 rounded"></div>
          </div>
        )

      case "settings":
        return (
          <div className="w-full h-full bg-gray-50 border rounded p-1">
            {/* Header */}
            <div className="h-2 bg-gray-300 rounded mb-1"></div>
            {/* Tabs */}
            <div className="flex gap-1 mb-1">
              <div className="h-1 bg-blue-200 rounded flex-1"></div>
              <div className="h-1 bg-gray-200 rounded flex-1"></div>
              <div className="h-1 bg-gray-200 rounded flex-1"></div>
            </div>
            {/* Content */}
            <div className="space-y-1">
              <div className="h-2 bg-gray-200 rounded"></div>
              <div className="h-2 bg-gray-200 rounded"></div>
              <div className="h-2 bg-gray-200 rounded"></div>
              <div className="h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
        )

      default:
        return (
          <div className="w-full h-full bg-gray-100 border rounded flex items-center justify-center">
            <div className="text-xs text-gray-500">Page</div>
          </div>
        )
    }
  }

  return (
    <div className="relative group">
      <div
        className={`${sizeClasses[size]} relative overflow-hidden rounded-lg border-2 border-gray-200 group-hover:border-blue-300 transition-colors`}
      >
        {renderWireframe()}

        {/* Status indicator */}
        <div className="absolute top-1 right-1">
          <div
            className={`w-2 h-2 rounded-full ${
              page.status === "live" ? "bg-green-400" : page.status === "development" ? "bg-yellow-400" : "bg-gray-400"
            }`}
          />
        </div>

        {/* Category badge */}
        <div className="absolute bottom-1 left-1">
          <Badge
            variant="secondary"
            className={`text-xs px-1 py-0 ${
              page.category === "public"
                ? "bg-blue-100 text-blue-700"
                : page.category === "auth"
                  ? "bg-green-100 text-green-700"
                  : page.category === "user"
                    ? "bg-purple-100 text-purple-700"
                    : page.category === "quiz"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-gray-100 text-gray-700"
            }`}
          >
            {page.category}
          </Badge>
        </div>
      </div>

      {/* Title */}
      <div className="mt-2 text-center">
        <div className="text-sm font-medium text-gray-900">{page.title}</div>
        <div className="text-xs text-gray-500">{page.path}</div>
      </div>
    </div>
  )
}
