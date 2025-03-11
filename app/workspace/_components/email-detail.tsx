"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Flag,
  Trash2,
  RotateCcw,
  Share2,
  Clock,
  HelpCircle,
  FileIcon as FilePdf,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  Image,
  Paperclip,
  Send,
} from "lucide-react"
import type { Email } from "@/lib/types"
import { Separator } from "@/components/ui/separator"

interface EmailDetailProps {
  email: Email | null
}

export function EmailDetail({ email }: EmailDetailProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState("")
  const replyRef = useRef<HTMLTextAreaElement>(null)

  if (!email) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Select an email to view</div>
  }

  const handleReply = () => {
    setIsReplying(true)
    setTimeout(() => {
      replyRef.current?.focus()
    }, 0)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge variant="outline">Sent</Badge>
      case "delivered":
        return <Badge variant="secondary">Delivered</Badge>
      case "read":
        return (
          <Badge variant="default" className="bg-green-500">
            Read
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Flag className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">1 of 200</span>
          <Button variant="ghost" size="icon">
            <Clock className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 h-full">
        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={email.sender.avatar} alt={email.sender.name} />
                  <AvatarFallback>{email.sender.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{email.sender.name}</span>
                  </div>
                  <span className="text-sm text-gray-700">{email.sender.email}</span>
                  <div className="text-xs text-gray-500">
                  {email.date.includes("Dec")
                    ? email.date
                    : new Date(email.date).toLocaleString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-y-1">
                {email.hasAttachments && (
                  <div className="flex items-center text-gray-500">
                    <Paperclip className="h-4 w-4 mr-1" />
                    <span className="text-xs">{email.attachments?.length || 0}</span>
                  </div>
                )}
                {getStatusBadge(email.status)}
                
              </div>
            </div>
            
            <Separator />
            <h1 className="text-2xl font-semibold mb-6 mt-4">{email.subject}</h1>

            <div className="prose prose-sm max-w-none mb-6">
              <div dangerouslySetInnerHTML={{ __html: email.body }} />
            </div>

            {email.hasAttachments && email.attachments && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Attachment</h3>
                <div className="grid grid-cols-2 gap-3">
                  {email.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="h-10 w-10 rounded-lg border flex items-center justify-center">
                        <FilePdf className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{attachment.name}</p>
                        <p className="text-xs text-gray-500">{(attachment.size / 1024 / 1024).toFixed(1)} MB</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Reply Section */}
            <div className="mt-6 border rounded-lg">
              <div className="p-3 border-b flex items-center justify-between">
                <span className="text-sm font-medium">Quick Reply</span>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                ref={replyRef}
                placeholder="Type your reply here..."
                className="border-0 rounded-none focus-visible:ring-0 min-h-[100px] resize-none"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="p-3 border-t flex justify-between items-center">
                <div className="text-xs text-gray-500">Press Ctrl+Enter to send</div>
                <Button className="text-white" style={{ backgroundColor: "#7c3aed" }}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

