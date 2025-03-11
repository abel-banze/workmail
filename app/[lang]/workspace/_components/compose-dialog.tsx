import { MessageComposer } from "./message-composer"

interface ComposeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ComposeDialog({ open, onOpenChange }: ComposeDialogProps) {
  // Mock data for recipients and groups
  const recipients = [
    {
      id: "1",
      name: "Ronald Richards",
      email: "ronaldrichards@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40&text=RR",
    },
    {
      id: "2",
      name: "Savannah Nguyen",
      email: "savannah@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=SN",
    },
    {
      id: "3",
      name: "Jerome Bell",
      email: "jerome@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JB",
    },
    {
      id: "4",
      name: "Marvin McKinney",
      email: "marvin@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=MM",
    },
    {
      id: "5",
      name: "Theresa Webb",
      email: "theresa@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=TW",
    },
  ]

  const groups = [
    {
      id: "work",
      name: "Work Team",
      members: [
        {
          id: "1",
          name: "Ronald Richards",
          email: "ronaldrichards@gmail.com",
          avatar: "/placeholder.svg?height=40&width=40&text=RR",
        },
        {
          id: "3",
          name: "Jerome Bell",
          email: "jerome@example.com",
          avatar: "/placeholder.svg?height=40&width=40&text=JB",
        },
      ],
    },
    {
      id: "friends",
      name: "Friends",
      members: [
        {
          id: "2",
          name: "Savannah Nguyen",
          email: "savannah@example.com",
          avatar: "/placeholder.svg?height=40&width=40&text=SN",
        },
        {
          id: "4",
          name: "Marvin McKinney",
          email: "marvin@example.com",
          avatar: "/placeholder.svg?height=40&width=40&text=MM",
        },
      ],
    },
  ]

  return <MessageComposer open={open} onOpenChange={onOpenChange} recipients={recipients} groups={groups} />
}

