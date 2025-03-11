import { Mail } from "lucide-react"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      <span className="ml-2 font-bold text-xl">WorkMail</span>
    </div>
  )
}

