"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Inbox, Send, File, Trash2, Star, AlertCircle, PenSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
  count?: number
  variant?: "default" | "warning"
}

export function MailSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const sidebarItems: SidebarItem[] = [
    {
      icon: <Inbox className="h-4 w-4" />,
      label: "Inbox",
      href: "/mail/inbox",
      count: 12,
    },
    {
      icon: <Star className="h-4 w-4" />,
      label: "Starred",
      href: "/mail/starred",
    },
    {
      icon: <Send className="h-4 w-4" />,
      label: "Sent",
      href: "/mail/sent",
    },
    {
      icon: <File className="h-4 w-4" />,
      label: "Drafts",
      href: "/mail/drafts",
      count: 3,
    },
    {
      icon: <AlertCircle className="h-4 w-4" />,
      label: "Spam",
      href: "/mail/spam",
      count: 5,
      variant: "warning",
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: "Trash",
      href: "/mail/trash",
    },
  ]

  return (
    <div
      className={cn("flex flex-col border-r bg-background transition-all duration-300 ", collapsed ? "w-16" : "w-64")}
    >
      <div className="p-4">
        <Button
          variant="default"
          className={cn("w-full justify-center", collapsed ? "px-2" : "")}
          onClick={() => {
            // In a real app, this would open a compose modal or navigate to a compose page
            window.location.href = "/mail/compose"
          }}
        >
          <PenSquare className="h-4 w-4 mr-2" />
          {!collapsed && "Compose"}
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-2 max-h-60">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center py-2 px-3 text-sm rounded-md",
              pathname === item.href
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              collapsed ? "justify-center" : "justify-between",
            )}
          >
            <div className="flex items-center">
              {item.icon}
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </div>
            {!collapsed && item.count && (
              <Badge variant={item.variant === "warning" ? "destructive" : "default"} className="ml-auto">
                {item.count}
              </Badge>
            )}
          </Link>
        ))}
      </nav>
      <Button variant="ghost" size="icon" className="m-2 self-end" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  )
}

