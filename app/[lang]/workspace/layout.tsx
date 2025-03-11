'use client'

import { useState, useEffect } from "react"
import { MainNav } from "./_components/main-nav"
import { EmailList } from "./_components/email-list"
import { EmailDetail } from "./_components/email-detail"
import { ContactList } from "./_components/contact-list"
import { ComposeDialog } from "./_components/compose-dialog"
import { AddContactDialog } from "./_components/add-contact-dialog"
import { AddGroupDialog } from "./_components/add-group-dialog"
import { EmailNotifications, useEmailNotifications } from "./_components/email-notification"
import { getEmails, getEmailById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import type { Email } from "@/lib/types"
import { PenSquare, UserPlus, FolderPlus } from "lucide-react"
import { toast } from "sonner"

export default function MailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [emails, setEmails] = useState<Email[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)
  const { notifications, addNotification, dismissNotification } = useEmailNotifications()
  const [isLoading, setIsLoading] = useState(true)
  
  const contactGroups = [
    { id: "favorites", name: "Favorites" },
    { id: "work", name: "Work" },
    { id: "personal", name: "Personal" },
    { id: "family", name: "Family" },
  ]

  const handleComposeClick = () => {
    setIsComposeOpen(true)
  }

  const handleAddContactClick = () => {
    setIsAddContactOpen(true)
  }

  const handleAddGroupClick = () => {
    setIsAddGroupOpen(true)
  }

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

  return (
    <>
      <div className="flex h-screen">
        <MainNav />
        <div className="flex-1 flex flex-col">
          <div className="p-3 border-b flex items-center justify-between">
            <h1 className="text-xl font-semibold">Inbox</h1>
            <div className="flex items-center space-x-2">
              <Button onClick={handleComposeClick}>
                <PenSquare className="h-4 w-4 mr-2" />
                Compose
              </Button>
              <Button variant="outline" onClick={handleAddContactClick}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
              <Button variant="outline" onClick={handleAddGroupClick}>
                <FolderPlus className="h-4 w-4 mr-2" />
                Add Group
              </Button>
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden">
            { children }
          </div>
        </div>
      </div>

      <ComposeDialog open={isComposeOpen} onOpenChange={setIsComposeOpen} />

      <AddContactDialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen} groups={contactGroups} />

      <AddGroupDialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen} />

      <EmailNotifications notifications={notifications} onDismiss={dismissNotification} />
    </>
  )
}

