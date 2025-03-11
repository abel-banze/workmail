"use client"

import { useState } from "react"
import { EnhancedEditor } from "./enhaced-editor"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

interface QuickReplyProps {
  onSend?: (content: string) => Promise<void>
  placeholder?: string
  initialContent?: string
  className?: string
}

export function QuickReply({ onSend, placeholder, initialContent = "<p></p>", className = "" }: QuickReplyProps) {
  const { t } = useTranslation()
  const [content, setContent] = useState(initialContent)
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    if (content === "<p></p>" || content === "") {
      toast.error(t("emptyMessage"))
      return
    }

    setIsSending(true)
    try {
      if (onSend) {
        await onSend(content)
      } else {
        // Default behavior if no onSend provided
        await new Promise((resolve) => setTimeout(resolve, 1000))
        toast.success(t("messageSent"))
      }
      setContent("<p></p>")
    } catch (error) {
      toast.error(t("messageError"))
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className={`border rounded-lg ${className}`}>
      <div className="p-3 border-b flex items-center justify-between">
        <span className="text-sm font-medium">{t("quickReply")}</span>
      </div>
      <EnhancedEditor
        content={content}
        onChange={setContent}
        placeholder={placeholder || t("writeSomething")}
        minHeight="lg"
        maxHeight="xl"
        compact={true}
      />
      <div className="p-3 border-t flex justify-between items-center">
        <div className="text-xs text-muted-foreground">{t("pressEnterToSend")}</div>
        <Button
          onClick={handleSend}
          disabled={isSending || content === "<p></p>" || content === ""}
          className="text-white bg-primary"
        >
          <Send className="h-4 w-4 mr-2" />
          {isSending ? t("sending") : t("send")}
        </Button>
      </div>
    </div>
  )
}

