"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Star,
  Briefcase,
  Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Contact {
  id: string
  name: string
  email: string
  avatar: string
  status: "online" | "offline" | "away"
}

interface ContactGroup {
  id: string
  name: string
  icon: React.ReactNode
  contacts: Contact[]
}

const contactGroups: ContactGroup[] = [
  {
    id: "favorites",
    name: "Favorites",
    icon: <Star className="h-4 w-4 text-yellow-500" />,
    contacts: [
      {
        id: "1",
        name: "Ronald Richards",
        email: "ronald@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=RR",
        status: "online",
      },
      {
        id: "2",
        name: "Savannah Nguyen",
        email: "savannah@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=SN",
        status: "away",
      },
    ],
  },
  {
    id: "work",
    name: "Work",
    icon: <Briefcase className="h-4 w-4 text-blue-500" />,
    contacts: [
      {
        id: "3",
        name: "Jerome Bell",
        email: "jerome@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=JB",
        status: "online",
      },
      {
        id: "4",
        name: "Marvin McKinney",
        email: "marvin@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=MM",
        status: "offline",
      },
      {
        id: "5",
        name: "Theresa Webb",
        email: "theresa@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=TW",
        status: "online",
      },
    ],
  },
  {
    id: "personal",
    name: "Personal",
    icon: <Heart className="h-4 w-4 text-red-500" />,
    contacts: [
      {
        id: "6",
        name: "Cody Fisher",
        email: "cody@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=CF",
        status: "offline",
      },
      {
        id: "7",
        name: "Wade Warren",
        email: "wade@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=WW",
        status: "away",
      },
      {
        id: "8",
        name: "Jenny Wilson",
        email: "jenny@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=JW",
        status: "online",
      },
    ],
  },
]

export function ContactList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["favorites"])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  const allContacts = contactGroups.flatMap((group) => group.contacts)

  const filteredContacts = searchQuery
    ? allContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  return (
    <div className="w-[280px] border-l flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-3">Contacts</h2>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search contacts"
            className="pl-9 border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="groups" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 mx-4 mt-2">
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="all">All Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="flex-1 border-0 p-0 m-0">
          <ScrollArea className="flex-1 h-[calc(100vh-220px)]">
            {searchQuery ? (
              <div className="p-4">
                <h3 className="text-sm font-medium mb-2">Search Results</h3>
                {filteredContacts.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">No contacts found</div>
                ) : (
                  filteredContacts.map((contact) => (
                    <ContactItem
                      key={contact.id}
                      contact={contact}
                      isSelected={selectedContact === contact.id}
                      onSelect={() => setSelectedContact(contact.id === selectedContact ? null : contact.id)}
                    />
                  ))
                )}
              </div>
            ) : (
              contactGroups.map((group) => (
                <div key={group.id} className="mb-2">
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="flex items-center w-full px-4 py-2 text-sm font-medium hover:bg-gray-50"
                  >
                    {expandedGroups.includes(group.id) ? (
                      <ChevronDown className="h-4 w-4 mr-2" />
                    ) : (
                      <ChevronRight className="h-4 w-4 mr-2" />
                    )}
                    {group.icon}
                    <span className="ml-2">{group.name}</span>
                    <span className="ml-auto text-xs text-gray-500">{group.contacts.length}</span>
                  </button>

                  {expandedGroups.includes(group.id) && (
                    <div className="pl-4">
                      {group.contacts.map((contact) => (
                        <ContactItem
                          key={contact.id}
                          contact={contact}
                          isSelected={selectedContact === contact.id}
                          onSelect={() => setSelectedContact(contact.id === selectedContact ? null : contact.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="all" className="flex-1 border-0 p-0 m-0">
          <ScrollArea className="flex-1 h-[calc(100vh-220px)]">
            <div className="p-4">
              {allContacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  isSelected={selectedContact === contact.id}
                  onSelect={() => setSelectedContact(contact.id === selectedContact ? null : contact.id)}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ContactItemProps {
  contact: Contact
  isSelected: boolean
  onSelect: () => void
}

function ContactItem({ contact, isSelected, onSelect }: ContactItemProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "p-2 my-1 rounded-md cursor-pointer hover:bg-gray-50",
        isSelected ? "bg-gray-50 border-l-2 border-l-purple-500" : "",
      )}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback>{contact.name[0]}</AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white",
              contact.status === "online"
                ? "bg-green-500"
                : contact.status === "away"
                  ? "bg-yellow-500"
                  : "bg-gray-300",
            )}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{contact.name}</p>
          <p className="text-xs text-gray-500 truncate">{contact.email}</p>
        </div>
      </div>

      {isSelected && (
        <div className="mt-2 flex justify-around">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Phone className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Mail className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <MessageSquare className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  )
}

