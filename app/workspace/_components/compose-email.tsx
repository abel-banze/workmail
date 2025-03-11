"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Paperclip, X, Send, Save, Trash2, Loader2 } from "lucide-react"

export function ComposeEmail() {
  const router = useRouter()
  const { toast } = useToast()
  const [to, setTo] = useState("")
  const [cc, setCc] = useState("")
  const [bcc, setBcc] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAttachmentClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setAttachments((prev) => [...prev, ...newFiles])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSend = async () => {
    if (!to) {
      toast({
        title: "Missing recipient",
        description: "Please specify at least one recipient",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // In a real app, this would be an API call to send the email
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Email sent",
        description: "Your email has been sent successfully",
      })
      router.push("/mail/inbox")
    } catch (error) {
      toast({
        title: "Failed to send email",
        description: "There was an error sending your email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveDraft = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to save the draft
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Draft saved",
        description: "Your draft has been saved",
      })
      router.push("/mail/drafts")
    } catch (error) {
      toast({
        title: "Failed to save draft",
        description: "There was an error saving your draft. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="space-y-4 flex-1">
        <div>
          <Label htmlFor="to">To</Label>
          <Input id="to" placeholder="recipient@example.com" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="cc">Cc</Label>
          <Input id="cc" placeholder="cc@example.com" value={cc} onChange={(e) => setCc(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="bcc">Bcc</Label>
          <Input id="bcc" placeholder="bcc@example.com" value={bcc} onChange={(e) => setBcc(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="Email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="body">Message</Label>
          <Textarea
            id="body"
            placeholder="Write your message here..."
            className="min-h-[200px] flex-1"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        {attachments.length > 0 && (
          <div className="border rounded-md p-2">
            <p className="text-sm font-medium mb-2">Attachments</p>
            <div className="space-y-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-accent/50 rounded-md p-2">
                  <div className="flex items-center space-x-2 truncate">
                    <Paperclip className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">({Math.round(file.size / 1024)} KB)</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeAttachment(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />
      </div>
      <div className="flex items-center justify-between pt-4 border-t mt-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleAttachmentClick}>
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => router.back()}>
            <Trash2 className="h-4 w-4 mr-2" />
            Discard
          </Button>
          <Button variant="outline" onClick={handleSaveDraft} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Draft
          </Button>
          <Button onClick={handleSend} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

