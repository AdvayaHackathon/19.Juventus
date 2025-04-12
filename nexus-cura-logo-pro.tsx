import { cn } from "@/lib/utils"

export function NexusCuraLogoPro({ className = "", size = "default" }) {
  const sizeClasses = {
    small: "h-8",
    default: "h-10",
    large: "h-14",
  }

  const height = sizeClasses[size] || sizeClasses.default

  return (
    <div className={cn("flex items-center", className)}>
      <div className="relative">
        <svg viewBox="0 0 120 60" className={cn(height, "w-auto")} xmlns="http://www.w3.org/2000/svg">
          {/* Background shapes for N and C */}
          <rect x="5" y="10" width="25" height="30" rx="3" fill="#4338ca" />
          <rect x="35" y="10" width="25" height="30" rx="3" fill="#4338ca" />

          {/* N and C letters */}
          <text x="12" y="33" fill="white" fontSize="24" fontWeight="bold">
            N
          </text>
          <text x="42" y="33" fill="white" fontSize="24" fontWeight="bold">
            C
          </text>

          {/* Stethoscope */}
          <path
            d="M8,8 C15,0 30,-2 45,8 C60,18 75,15 85,5"
            fill="none"
            stroke="#4f46e5"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="8" cy="8" r="3" fill="#4f46e5" />
          <circle cx="85" cy="5" r="3" fill="#4f46e5" />
          <circle cx="45" cy="8" r="5" fill="#4f46e5" stroke="#6366f1" strokeWidth="1" />

          {/* ECG line */}
          <path
            d="M5,50 L15,50 L20,50 L25,42 L30,58 L35,50 L40,50 L45,50 L50,50 L55,50 L60,50 L65,42 L70,58 L75,50 L80,50 L85,50"
            fill="none"
            stroke="#4338ca"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Text part */}
        <div className="ml-[70px] absolute top-1/2 -translate-y-1/2">
          <span className="text-indigo-700 font-bold leading-tight tracking-tight block">
            {size === "small" ? "Nexus Cura" : "NEXUS CURA"}
          </span>
          {size !== "small" && (
            <span className="text-xs text-indigo-500 leading-tight block">Healthcare Management</span>
          )}
        </div>
      </div>
    </div>
  )
}
