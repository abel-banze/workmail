"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Inbox, Star, Send, Trash2, Menu, Search, Users, FileText, Clock, Plus } from "lucide-react"

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
  count?: number
}

export function EmailSidebar() {
  const pathname = usePathname()

  const sidebarItems: SidebarItem[] = [
    {
      icon: <Inbox className="h-5 w-5" />,
      label: "Inbox",
      href: "/mail/inbox",
      count: 18,
    },
    {
      icon: <Star className="h-5 w-5" />,
      label: "Starred",
      href: "/mail/starred",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Snoozed",
      href: "/mail/snoozed",
    },
    {
      icon: <Send className="h-5 w-5" />,
      label: "Sent",
      href: "/mail/sent",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Drafts",
      href: "/mail/drafts",
      count: 3,
    },
    {
      icon: <Trash2 className="h-5 w-5" />,
      label: "Trash",
      href: "/mail/trash",
    },
  ]

  return (
    <div className="w-64 h-full border-r flex flex-col">
      <div className="p-4 flex items-center">
        <Button variant="ghost" size="icon" className="mr-2">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Inbox</h1>
      </div>

      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-9 bg-gray-100 dark:bg-gray-800 border-0" />
        </div>
      </div>

      <nav className="flex-1 overflow-auto">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center py-2 px-4 text-sm",
              pathname === item.href
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
            )}
          >
            <div className="flex items-center flex-1">
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </div>
            {item.count && (
              <span className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5">{item.count}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300">
          <Users className="h-5 w-5 mr-2" />
          <span>Contacts</span>
        </Button>
      </div>

      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

