"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { EnhancedEditor } from "./enhaced-editor"
import { Paperclip, X, Send, ChevronDown, ChevronUp, Users, PlusCircle } from "lucide-react"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Recipient {
  id: string
  name: string
  email: string
  avatar?: string
}

interface Group {
  id: string
  name: string
  members: Recipient[]
}

interface MessageComposerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipients?: Recipient[]
  groups?: Group[]
  onSend?: (data: {
    to: Recipient[]
    cc: Recipient[]
    bcc: Recipient[]
    subject: string
    content: string
    attachments: File[]
  }) => Promise<void>
}

export function MessageComposer({ open, onOpenChange, recipients = [], groups = [], onSend }: MessageComposerProps) {
  const { t } = useTranslation()
  const [to, setTo] = useState<Recipient[]>([])
  const [manualRecipients, setManualRecipients] = useState<string>("")
  const [cc, setCc] = useState<Recipient[]>([])
  const [bcc, setBcc] = useState<Recipient[]>([])
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("<p></p>")
  const [attachments, setAttachments] = useState<File[]>([])
  const [showCcBcc, setShowCcBcc] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
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

  const addRecipient = (recipient: Recipient, type: "to" | "cc" | "bcc") => {
    if (type === "to") {
      if (!to.some((r) => r.id === recipient.id)) {
        setTo([...to, recipient])
      }
    } else if (type === "cc") {
      if (!cc.some((r) => r.id === recipient.id)) {
        setCc([...cc, recipient])
      }
    } else if (type === "bcc") {
      if (!bcc.some((r) => r.id === recipient.id)) {
        setBcc([...bcc, recipient])
      }
    }
  }

  const removeRecipient = (recipientId: string, type: "to" | "cc" | "bcc") => {
    if (type === "to") {
      setTo(to.filter((r) => r.id !== recipientId))
    } else if (type === "cc") {
      setCc(cc.filter((r) => r.id !== recipientId))
    } else if (type === "bcc") {
      setBcc(bcc.filter((r) => r.id !== recipientId))
    }
  }

  const addGroup = (group: Group, type: "to" | "cc" | "bcc") => {
    const uniqueMembers = group.members.filter((member) => {
      if (type === "to") {
        return !to.some((r) => r.id === member.id)
      } else if (type === "cc") {
        return !cc.some((r) => r.id === member.id)
      } else if (type === "bcc") {
        return !bcc.some((r) => r.id === member.id)
      }
      return true
    })

    if (type === "to") {
      setTo([...to, ...uniqueMembers])
    } else if (type === "cc") {
      setCc([...cc, ...uniqueMembers])
    } else if (type === "bcc") {
      setBcc([...bcc, ...uniqueMembers])
    }
  }

  // Process manual recipient input
  const processManualRecipients = () => {
    if (!manualRecipients.trim()) return

    const emails = manualRecipients.split(/[,;]/) // Split by comma or semicolon

    const newRecipients = emails
      .map((email) => {
        const trimmedEmail = email.trim()
        if (!trimmedEmail) return null

        // Create a temporary recipient object for each valid email
        return {
          id: `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: trimmedEmail.split("@")[0] || trimmedEmail, // Use part before @ as name
          email: trimmedEmail,
        }
      })
      .filter(Boolean) as Recipient[]

    setTo([...to, ...newRecipients])
    setManualRecipients("")
  }

  // Process manual recipients when input loses focus
  const handleManualRecipientsBlur = () => {
    processManualRecipients()
  }

  // Process manual recipients when Enter is pressed
  const handleManualRecipientsKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      processManualRecipients()
    }
  }

  const handleSend = async () => {
    // Process any remaining manual recipients
    processManualRecipients()

    // Use setTimeout to ensure state updates have processed
    setTimeout(async () => {
      if (to.length === 0 && manualRecipients.trim() === "") {
        toast.error(t("pleaseSpecifyRecipient"))
        return
      }

      if (!subject) {
        toast.error(t("pleaseEnterSubject"))
        return
      }

      setIsSending(true)
      try {
        if (onSend) {
          await onSend({
            to,
            cc,
            bcc,
            subject,
            content,
            attachments,
          })
        } else {
          // Default behavior if no onSend provided
          await new Promise((resolve) => setTimeout(resolve, 1500))
        }

        toast.success(t("messageSent"))

        // Reset form and close dialog
        setTo([])
        setManualRecipients("")
        setCc([])
        setBcc([])
        setSubject("")
        setContent("<p></p>")
        setAttachments([])
        setShowCcBcc(false)
        onOpenChange(false)
      } catch (error) {
        toast.error(t("messageError"))
      } finally {
        setIsSending(false)
      }
    }, 0)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t("compose")}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-2">
          <div className="space-y-4">
            <div className="flex items-center">
              <Label htmlFor="to" className="w-16">
                {t("to")}
              </Label>
              <div className="flex-1 flex flex-wrap gap-1 items-center border rounded-md pl-3 pr-1 py-1 min-h-10">
                {to.map((recipient) => (
                  <Badge key={recipient.id} variant="secondary" className="flex items-center gap-1 my-1">
                    {recipient.name}
                    <button
                      onClick={() => removeRecipient(recipient.id, "to")}
                      className="ml-1 rounded-full hover:bg-muted"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Input
                  type="text"
                  value={manualRecipients}
                  onChange={(e) => setManualRecipients(e.target.value)}
                  onBlur={handleManualRecipientsBlur}
                  onKeyDown={handleManualRecipientsKeyDown}
                  className="flex-1 min-w-[100px] border-none shadow-none focus-visible:ring-0 h-8 px-2"
                  placeholder={t("enterEmailOrName")}
                />
                <Popover open={isSelectorOpen} onOpenChange={setIsSelectorOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                      <Users className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="end">
                    <RecipientSelector
                      recipients={recipients}
                      groups={groups}
                      onSelectRecipient={(recipient) => {
                        addRecipient(recipient, "to")
                        setIsSelectorOpen(false)
                      }}
                      onSelectGroup={(group) => {
                        addGroup(group, "to")
                        setIsSelectorOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button type="button" variant="ghost" size="sm" className="ml-2" onClick={() => setShowCcBcc(!showCcBcc)}>
                {showCcBcc ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>

            {showCcBcc && (
              <>
                <div className="flex items-center">
                  <Label htmlFor="cc" className="w-16">
                    {t("cc")}
                  </Label>
                  <div className="flex-1 flex flex-wrap gap-1 items-center border rounded-md px-3 py-2 min-h-10">
                    {cc.map((recipient) => (
                      <Badge key={recipient.id} variant="secondary" className="flex items-center gap-1">
                        {recipient.name}
                        <button
                          onClick={() => removeRecipient(recipient.id, "cc")}
                          className="ml-1 rounded-full hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <RecipientSelector
                      recipients={recipients}
                      groups={groups}
                      onSelectRecipient={(recipient) => addRecipient(recipient, "cc")}
                      onSelectGroup={(group) => addGroup(group, "cc")}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <Label htmlFor="bcc" className="w-16">
                    {t("bcc")}
                  </Label>
                  <div className="flex-1 flex flex-wrap gap-1 items-center border rounded-md px-3 py-2 min-h-10">
                    {bcc.map((recipient) => (
                      <Badge key={recipient.id} variant="secondary" className="flex items-center gap-1">
                        {recipient.name}
                        <button
                          onClick={() => removeRecipient(recipient.id, "bcc")}
                          className="ml-1 rounded-full hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <RecipientSelector
                      recipients={recipients}
                      groups={groups}
                      onSelectRecipient={(recipient) => addRecipient(recipient, "bcc")}
                      onSelectGroup={(group) => addGroup(group, "bcc")}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center">
              <Label htmlFor="subject" className="w-16">
                {t("subject")}
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t("enterSubject")}
              />
            </div>

            <div>
              <EnhancedEditor
                content={content}
                onChange={setContent}
                placeholder={t("writeSomething")}
                minHeight="lg"
                maxHeight="xl"
              />
            </div>

            {attachments.length > 0 && (
              <div className="border rounded-md p-3">
                <h3 className="text-sm font-medium mb-2">{t("attachments")}</h3>
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/50 rounded-md p-2">
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
        </div>
        <DialogFooter className="flex justify-between items-center border-t pt-4">
          <Button variant="outline" size="icon" onClick={handleAttachmentClick}>
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={handleSend} disabled={isSending}>
              {isSending ? (
                t("sending")
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {t("send")}
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface RecipientSelectorProps {
  recipients: Recipient[]
  groups: Group[]
  onSelectRecipient: (recipient: Recipient) => void
  onSelectGroup: (group: Group) => void
}

function RecipientSelector({ recipients, groups, onSelectRecipient, onSelectGroup }: RecipientSelectorProps) {
  const { t } = useTranslation()
  const [selectedTab, setSelectedTab] = useState("recipients")

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="recipients">{t("recipients")}</TabsTrigger>
        <TabsTrigger value="groups">{t("groups")}</TabsTrigger>
      </TabsList>
      <TabsContent value="recipients" className="p-0">
        <Command>
          <CommandInput placeholder={t("searchRecipients")} />
          <CommandList>
            <CommandEmpty>{t("noResults")}</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[200px]">
                {recipients.map((recipient) => (
                  <CommandItem
                    key={recipient.id}
                    onSelect={() => onSelectRecipient(recipient)}
                    className="flex items-center gap-2"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={recipient.avatar} alt={recipient.name} />
                      <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm truncate">{recipient.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{recipient.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-full hover:bg-primary hover:text-primary-foreground"
                      onClick={() => onSelectRecipient(recipient)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </TabsContent>
      <TabsContent value="groups" className="p-0">
        <Command>
          <CommandInput placeholder={t("searchGroups")} />
          <CommandList>
            <CommandEmpty>{t("noResults")}</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[200px]">
                {groups.map((group) => (
                  <CommandItem key={group.id} onSelect={() => onSelectGroup(group)} className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm truncate">{group.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {group.members.length} {group.members.length === 1 ? t("member") : t("members")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-full hover:bg-primary hover:text-primary-foreground"
                      onClick={() => onSelectGroup(group)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </TabsContent>
    </Tabs>
  )
}

