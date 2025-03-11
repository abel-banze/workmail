"use client"

import { useState, useEffect } from "react"
import { MainNav } from "../_components/main-nav"
import { EmailList } from "../_components/email-list"
import { EmailDetail } from "../_components/email-detail"
import { ContactList } from "../_components/contact-list"
import { ComposeDialog } from "../_components/compose-dialog"
import { AddContactDialog } from "../_components/add-contact-dialog"
import { AddGroupDialog } from "../_components/add-group-dialog"
import { EmailNotifications, useEmailNotifications } from "../_components/email-notification"
import { getEmails, getEmailById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { PenSquare, UserPlus, FolderPlus } from "lucide-react"
import type { Email } from "@/lib/types"
import { toast } from "sonner"

export default function InboxPage() {
  const [emails, setEmails] = useState<Email[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { notifications, addNotification, dismissNotification } = useEmailNotifications()

  const contactGroups = [
    { id: "favorites", name: "Favorites" },
    { id: "work", name: "Work" },
    { id: "personal", name: "Personal" },
    { id: "family", name: "Family" },
  ]

  // Fetch emails on component mount
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setIsLoading(true)
        const data = await getEmails("inbox")
        setEmails(data)
        if (data.length > 0) {
          const firstEmail = await getEmailById(data[0].id)
          setSelectedEmail(firstEmail)
        }
        addNotification("update", "Email inbox updated")
      } catch (error) {
        console.error("Failed to fetch emails:", error)
        addNotification("error", "Failed to fetch emails")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmails()

    // Set up polling for new emails
    const intervalId = setInterval(async () => {
      try {
        const data = await getEmails("inbox")

        // Check if there are new emails
        if (data.length > emails.length) {
          const newEmails = data.filter((email) => !emails.some((existingEmail) => existingEmail.id === email.id))

          if (newEmails.length > 0) {
            setEmails(data)
            addNotification("new", `${newEmails.length} new ${newEmails.length === 1 ? "email" : "emails"} received`)
          }
        }
      } catch (error) {
        console.error("Failed to poll emails:", error)
      }
    }, 30000) // Poll every 30 seconds

    return () => clearInterval(intervalId)
  }, [emails.length])

  const handleSelectEmail = async (emailId: string) => {
    try {
      const email = await getEmailById(emailId)
      setSelectedEmail(email)
    } catch (error) {
      console.error("Failed to fetch email details:", error)
      toast.error("Failed to load email details")
    }
  }

  const handleComposeClick = () => {
    setIsComposeOpen(true)
  }

  const handleAddContactClick = () => {
    setIsAddContactOpen(true)
  }

  const handleAddGroupClick = () => {
    setIsAddGroupOpen(true)
  }

  return (
    <>
        <EmailList emails={emails} onSelectEmail={handleSelectEmail} isLoading={isLoading} />
        <EmailDetail email={selectedEmail} />
        <ContactList />
    </>
  )
}

