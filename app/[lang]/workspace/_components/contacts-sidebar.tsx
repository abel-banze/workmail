import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const contacts = [
  {
    id: "1",
    name: "Andrew Cano",
    avatar: "/placeholder.svg?height=40&width=40&text=AC",
  },
  {
    id: "2",
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40&text=EW",
  },
  {
    id: "3",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
  },
  {
    id: "5",
    name: "James Dunn",
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
  },
  {
    id: "6",
    name: "Rene Wells",
    avatar: "/placeholder.svg?height=40&width=40&text=RW",
  },
  {
    id: "7",
    name: "Loki Bright",
    avatar: "/placeholder.svg?height=40&width=40&text=LB",
  },
  {
    id: "8",
    name: "Katherine Moss",
    avatar: "/placeholder.svg?height=40&width=40&text=KM",
  },
  {
    id: "9",
    name: "Zahir Mays",
    avatar: "/placeholder.svg?height=40&width=40&text=ZM",
  },
  {
    id: "10",
    name: "Orlando Diggs",
    avatar: "/placeholder.svg?height=40&width=40&text=OD",
  },
]

export function ContactsSidebar() {
  return (
    <div className="w-16 h-full border-l flex flex-col items-center py-4 bg-white dark:bg-gray-900">
      {contacts.map((contact) => (
        <div key={contact.id} className="mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  )
}

