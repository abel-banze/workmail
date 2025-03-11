"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Search, Paperclip } from "lucide-react"
import type { Email } from "@/lib/types"

interface EmailListProps {
  emails: Email[]
  onSelectEmail: (id: string) => void
  isLoading?: boolean
}

export function EmailList({ emails, onSelectEmail, isLoading = false }: EmailListProps) {
  const [activeTab, setActiveTab] = useState("primary")
  const [selectedEmail, setSelectedEmail] = useState<string | null>(emails[0]?.id)
  const [searchQuery, setSearchQuery] = useState("")

  const tabs = [
    { id: "primary", label: "Primary" },
    { id: "social", label: "Social" },
    { id: "promotions", label: "Promotions" },
  ]

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatEmailDate = (dateString: string) => {
    // If it's already formatted like "18 Oct", return as is
    if (dateString.includes("Oct") || dateString.includes("/")) {
      return dateString
    }

    const date = new Date(dateString)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()

    if (isToday) {
      // Format as time for today's emails
      return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
    } else if (now.getFullYear() === date.getFullYear()) {
      // Format as day/month for this year's emails
      return date.toLocaleDateString(undefined, { day: "numeric", month: "short" })
    } else {
      // Format with year for older emails
      return date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
    }
  }

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email.id)
    onSelectEmail(email.id)
  }

  return (
    <div className="max-w-xs border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search emails"
            className="pl-9 border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm rounded-full",
                activeTab === tab.id
                  ? "border border-gray-200 text-gray-900"
                  : "text-gray-600 hover:border hover:border-gray-100",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1 h-full">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-start space-x-3 p-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredEmails.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No emails found</div>
        ) : (
          filteredEmails.map((email) => (
            <div
              key={email.id}
              onClick={() => handleEmailClick(email)}
              className={cn(
                "flex w-full items-start space-x-3 p-4 border-b cursor-pointer hover:border-l-2 hover:border-l-purple-300",
                selectedEmail === email.id && "border-l-2 border-l-purple-500",
                !email.read && "bg-blue-50 dark:bg-blue-900/10",
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={email.sender.avatar} alt={email.sender.name} />
                <AvatarFallback>{email.sender.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className={cn("text-sm", !email.read && "font-semibold")}>{email.sender.name}</span>
                    {email.labels?.includes("new") && (
                      <span className="ml-2 text-xs text-purple-600 font-medium">New</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{formatEmailDate(email.date)}</span>
                </div>
                <h3 className={cn("text-sm mb-1 flex items-center justify-between", !email.read && "font-semibold")}>
                  <span className="truncate">{email.subject}</span>
                  {email.hasAttachments && <Paperclip className="h-3.5 w-3.5 text-gray-400 flex-shrink-0 ml-1" />}
                </h3>
                <p className="text-sm text-gray-500 truncate">{email.preview.substring(0, 30)} ...</p>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  )
}

