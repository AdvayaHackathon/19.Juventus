"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function NexusCuraLogoAnimated({ className = "", size = "default", animate = true }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const sizeClasses = {
    small: "h-8",
    default: "h-10",
    large: "h-14",
    xlarge: "h-20",
  }

  const height = sizeClasses[size] || sizeClasses.default

  // SVG Logo component
  const LogoSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1">
      {/* Background circle */}
      <circle cx="50" cy="50" r="45" fill="#f8fafc" />

      {/* N and C letters */}
      <rect x="25" y="30" width="20" height="30" rx="3" fill="#4338ca" />
      <rect x="55" y="30" width="20" height="30" rx="3" fill="#4338ca" />

      <text x="30" y="52" fill="white" fontSize="18" fontWeight="bold">
        N
      </text>
      <text x="60" y="52" fill="white" fontSize="18" fontWeight="bold">
        C
      </text>

      {/* Medical cross */}
      <rect x="65" y="25" width="10" height="3" fill="#4338ca" />
      <rect x="68.5" y="21.5" width="3" height="10" fill="#4338ca" />

      {/* Stethoscope */}
      <path
        d="M20,25 C30,15 50,15 65,25 C80,35 90,25 95,15"
        fill="none"
        stroke="#4338ca"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="25" r="3" fill="#4338ca" />
      <circle cx="95" cy="15" r="3" fill="#4338ca" />

      {/* ECG line */}
      <path
        d="M20,70 L30,70 L35,60 L40,80 L45,70 L50,70 L55,70 L60,60 L65,80 L70,70 L80,70"
        fill="none"
        stroke="#4338ca"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  // If not client-side yet or animation is disabled, render static version
  if (!isClient || !animate) {
    return (
      <div className={cn("flex items-center", className)}>
        <div
          className={`relative ${height} aspect-square flex items-center justify-center bg-white rounded-full p-1 shadow-sm`}
        >
          <LogoSVG />
        </div>
        <div className="ml-3 flex flex-col">
          <span className="text-indigo-700 font-bold leading-tight tracking-tight">
            {size === "small" ? "Nexus Cura" : "NEXUS CURA"}
          </span>
          <span className="text-xs text-indigo-500 leading-tight">CONNECTION & CARE</span>
        </div>
      </div>
    )
  }

  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  }

  const subtextVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className={cn("flex items-center", className)}>
      <motion.div
        className={`relative ${height} aspect-square flex items-center justify-center bg-gradient-to-br from-white to-indigo-50 rounded-full p-1 shadow-md`}
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      >
        <LogoSVG />
      </motion.div>

      <div className="ml-3 flex flex-col">
        <motion.span
          className="text-indigo-700 font-bold leading-tight tracking-tight"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {size === "small" ? "Nexus Cura" : "NEXUS CURA"}
        </motion.span>

        {size !== "small" && (
          <motion.span
            className="text-xs text-indigo-500 leading-tight"
            variants={subtextVariants}
            initial="hidden"
            animate="visible"
          >
            CONNECTION & CARE
          </motion.span>
        )}
      </div>
    </div>
  )
}
