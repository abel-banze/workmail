export interface User {
    id: string
    name: string
    email: string
    avatar?: string
  }
  
  export interface Attachment {
    name: string
    size: number
    type: string
    url: string
  }
  
  export type EmailStatus = "sent" | "delivered" | "read"
  
  export interface Email {
    id: string
    subject: string
    body: string
    preview: string
    sender: User
    recipients: User[]
    date: string
    read: boolean
    starred: boolean
    labels?: string[]
    hasAttachments: boolean
    attachments?: Attachment[]
    status: EmailStatus
  }
  
  