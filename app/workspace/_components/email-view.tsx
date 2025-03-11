"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star, Reply, Forward, Trash2, MoreHorizontal, Paperclip, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Email } from "@/lib/types"

interface EmailViewProps {
  email: Email
}

export function EmailView({ email }: EmailViewProps) {
  const router = useRouter()
  const [starred, setStarred] = useState(email.starred)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold truncate">{email.subject}</h1>
          {email.labels &&
            email.labels.map((label) => (
              <Badge key={label} variant="outline">
                {label}
              </Badge>
            ))}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setStarred(!starred)}>
            <Star className={cn("h-4 w-4", starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Forward className="mr-2 h-4 w-4" />
                <span>Forward</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={email.sender.avatar || "/placeholder.svg?height=40&width=40"} alt={email.sender.name} />
              <AvatarFallback>{email.sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-medium">{email.sender.name}</p>
                <span className="text-xs text-muted-foreground">&lt;{email.sender.email}&gt;</span>
              </div>
              <p className="text-xs text-muted-foreground">To: {email.recipients.map((r) => r.name).join(", ")}</p>
              <p className="text-xs text-muted-foreground">{new Date(email.date).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={email.status === "sent" ? "outline" : email.status === "delivered" ? "secondary" : "success"}
            >
              {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none mb-6">
          <div dangerouslySetInnerHTML={{ __html: email.body }} />
        </div>
        {email.hasAttachments && email.attachments && (
          <div className="border rounded-md p-4 mt-4">
            <h3 className="font-medium mb-2 flex items-center">
              <Paperclip className="h-4 w-4 mr-2" />
              Attachments ({email.attachments.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {email.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center space-x-2 truncate">
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                      {attachment.type.startsWith("image/") ? "IMG" : attachment.type.includes("pdf") ? "PDF" : "DOC"}
                    </div>
                    <div className="truncate">
                      <p className="text-sm truncate">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{Math.round(attachment.size / 1024)} KB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Button className="flex-1 sm:flex-none">
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </Button>
          <Button variant="outline">
            <Forward className="h-4 w-4 mr-2" />
            Forward
          </Button>
        </div>
      </div>
    </div>
  )
}

