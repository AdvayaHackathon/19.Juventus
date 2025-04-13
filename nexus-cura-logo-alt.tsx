import { cn } from "@/lib/utils"

export function NexusCuraLogoAlt({ className = "", size = "default" }) {
  const sizeClasses = {
    small: "h-8",
    default: "h-10",
    large: "h-14",
  }

  const height = sizeClasses[size] || sizeClasses.default

  return (
    <div className={cn("flex items-center", className)}>
      <div className={`${height} aspect-auto relative flex items-center`}>
        {/* Logo container with medical elements */}
        <div className="relative">
          {/* N and C letters with medical styling */}
          <div className="flex items-center">
            {/* N letter */}
            <div className="bg-indigo-700 text-white font-bold flex items-center justify-center rounded-md p-1 mr-1">
              <span className="text-2xl tracking-tighter">N</span>
            </div>

            {/* C letter */}
            <div className="bg-indigo-700 text-white font-bold flex items-center justify-center rounded-md p-1 relative">
              <span className="text-2xl tracking-tighter">C</span>
            </div>

            {/* Medical cross */}
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-white">
              <div className="relative h-full w-full">
                <div className="absolute inset-y-[30%] inset-x-0 bg-indigo-700"></div>
                <div className="absolute inset-x-[30%] inset-y-0 bg-indigo-700"></div>
              </div>
            </div>

            {/* Stethoscope element */}
            <div className="absolute top-[-5px] left-[10px] right-[10px] h-[30px] pointer-events-none">
              <svg viewBox="0 0 100 30" className="w-full h-full">
                {/* Stethoscope tubing */}
                <path
                  d="M10,15 C15,5 30,0 50,10 C70,20 85,15 90,5"
                  fill="none"
                  stroke="#4338ca"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Stethoscope earpieces */}
                <circle cx="10" cy="15" r="3" fill="#4338ca" />
                <circle cx="90" cy="5" r="3" fill="#4338ca" />
                {/* Stethoscope chest piece */}
                <circle cx="50" cy="10" r="5" fill="#4338ca" stroke="#4f46e5" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* ECG line below the letters */}
          <div className="mt-1 h-[10px] w-full">
            <svg viewBox="0 0 100 20" className="w-full h-full">
              <path
                d="M0,10 L10,10 L15,10 L20,2 L25,18 L30,10 L35,10 L40,10 L45,10 L50,10 L55,10 L60,10 L65,2 L70,18 L75,10 L80,10 L85,10 L90,10 L100,10"
                fill="none"
                stroke="#4338ca"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Text part */}
        <div className="ml-3 flex flex-col">
          <span className="text-indigo-700 font-bold leading-tight tracking-tight">
            {size === "small" ? "Nexus Cura" : "NEXUS CURA"}
          </span>
          {size !== "small" && <span className="text-xs text-indigo-500 leading-tight">Healthcare Management</span>}
        </div>
      </div>
    </div>
  )
}
