"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, Mail, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

type NotificationType = "new" | "update" | "error"

interface EmailNotification {
  id: string
  type: NotificationType
  message: string
  timestamp: number
}

interface EmailNotificationsProps {
  notifications: EmailNotification[]
  onDismiss: (id: string) => void
}

export function EmailNotifications({ notifications, onDismiss }: EmailNotificationsProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
            className="bg-card border shadow-lg rounded-lg overflow-hidden"
          >
            <div className="flex items-start p-4">
              <div className="flex-shrink-0 mr-3">
                {notification.type === "new" && <Mail className="h-5 w-5 text-blue-500" />}
                {notification.type === "update" && <RefreshCw className="h-5 w-5 text-amber-500" />}
                {notification.type === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
              </div>
              <div className="flex-1 mr-2">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{new Date(notification.timestamp).toLocaleTimeString()}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onDismiss(notification.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Hook to manage email notifications
export function useEmailNotifications() {
  const [notifications, setNotifications] = useState<EmailNotification[]>([])

  const addNotification = (type: NotificationType, message: string) => {
    const id = Date.now().toString()
    setNotifications((prev) => [...prev, { id, type, message, timestamp: Date.now() }])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(id)
    }, 5000)
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return { notifications, addNotification, dismissNotification }
}

