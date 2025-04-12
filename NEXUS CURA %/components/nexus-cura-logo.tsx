import { cn } from "@/lib/utils"

export function NexusCuraLogo({ className = "", size = "default" }) {
  const sizeClasses = {
    small: "h-8",
    default: "h-10",
    large: "h-14",
  }

  const height = sizeClasses[size] || sizeClasses.default

  return (
    <div className={cn("flex items-center", className)}>
      <div
        className={`relative ${height} aspect-square flex items-center justify-center bg-white rounded-full p-1 shadow-sm`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full p-1">
          <circle cx="50" cy="50" r="45" fill="#f0f9ff" />
          <path d="M50 15 L85 85 L15 85 Z" fill="none" stroke="#818cf8" strokeWidth="6" strokeLinejoin="round" />
          <circle cx="50" cy="50" r="12" fill="#4f46e5" />
          <path
            d="M50 15 L50 38 M50 62 L50 85 M15 85 L38 50 M62 50 L85 85"
            stroke="#4f46e5"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="ml-3 flex flex-col">
        <span className="text-indigo-700 font-bold leading-tight tracking-tight">
          {size === "small" ? "Nexus Cura" : "NEXUS CURA"}
        </span>
        {size !== "small" && <span className="text-xs text-indigo-500 leading-tight">CONNECTION & CARE</span>}
      </div>
    </div>
  )
}
