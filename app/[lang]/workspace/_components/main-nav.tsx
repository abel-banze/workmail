"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Inbox,
  Star,
  Send,
  Archive,
  Trash2,
  AlertCircle,
  FileText,
  Tag,
  Settings,
  Mail,
  ChevronDown,
  PenSquare,
  Users,
  Calendar,
  Phone,
  CheckSquare,
  Clock,
  UserCircle,
  Building,
  Briefcase,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ComposeDialog } from "./compose-dialog"

const mailFolders = [
  {
    title: "Inbox",
    icon: Inbox,
    href: "/mail/inbox",
    count: 12,
    active: true,
  },
  {
    title: "Starred",
    icon: Star,
    href: "/mail/starred",
  },
  {
    title: "Sent",
    icon: Send,
    href: "/mail/sent",
  },
  {
    title: "Drafts",
    icon: FileText,
    href: "/mail/drafts",
    count: 3,
  },
  {
    title: "Archive",
    icon: Archive,
    href: "/mail/archive",
  },
  {
    title: "Spam",
    icon: AlertCircle,
    href: "/mail/spam",
    count: 5,
  },
  {
    title: "Trash",
    icon: Trash2,
    href: "/mail/trash",
  },
]

const mailLabels = [
  {
    title: "Personal",
    color: "bg-blue-500",
    href: "/mail/label/personal",
  },
  {
    title: "Work",
    color: "bg-green-500",
    href: "/mail/label/work",
  },
  {
    title: "Important",
    color: "bg-red-500",
    href: "/mail/label/important",
  },
  {
    title: "Travel",
    color: "bg-yellow-500",
    href: "/mail/label/travel",
  },
]

const contactsItems = [
  {
    title: "All Contacts",
    icon: Users,
    href: "/contacts",
  },
  {
    title: "Personal",
    icon: UserCircle,
    href: "/contacts/personal",
  },
  {
    title: "Business",
    icon: Building,
    href: "/contacts/business",
  },
  {
    title: "Colleagues",
    icon: Briefcase,
    href: "/contacts/colleagues",
  },
]

const appsItems = [
  {
    title: "Calendar",
    icon: Calendar,
    href: "/apps/calendar",
  },
  {
    title: "Tasks",
    icon: CheckSquare,
    href: "/apps/tasks",
  },
  {
    title: "Meetings",
    icon: Clock,
    href: "/apps/meetings",
  },
  {
    title: "Calls",
    icon: Phone,
    href: "/apps/calls",
  },
]

const accounts = [
  {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32&text=JD",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg?height=32&width=32&text=JS",
  },
  {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=32&width=32&text=AJ",
  },
]

export function MainNav() {
  const pathname = usePathname()
  const [currentAccount, setCurrentAccount] = useState(accounts[0])
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [openSections, setOpenSections] = useState<any>({
    messages: true,
    contacts: false,
    apps: false,
    labels: false,
    settings: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    })
  }

  return (
    <>
      <div className="w-60 border-r flex flex-col">
        <div className="p-4 flex items-center space-x-2 border-b">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center border border-purple-200">
            <Mail className="h-5 w-5 text-purple-600" />
          </div>
          <span className="font-semibold">WorkMail</span>
        </div>

        <div className="p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={currentAccount.avatar} alt={currentAccount.name} />
                    <AvatarFallback>{currentAccount.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{currentAccount.name}</span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[240px]">
              <DropdownMenuLabel>Switch account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {accounts.map((account) => (
                <DropdownMenuItem
                  key={account.email}
                  onClick={() => setCurrentAccount(account)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={account.avatar} alt={account.name} />
                      <AvatarFallback>{account.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{account.name}</p>
                      <p className="text-xs text-muted-foreground">{account.email}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="text-sm">Add another account</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="p-3">
          <Button
            className="w-full text-white"
            style={{ backgroundColor: "#7c3aed" }}
            onClick={() => setIsComposeOpen(true)}
          >
            <PenSquare className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-3">
            {/* Messages Section */}
            <Collapsible open={openSections.messages} onOpenChange={() => toggleSection("messages")} className="mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500">
                <span>MESSAGES</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openSections.messages ? "transform rotate-180" : "",
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2">
                {mailFolders.map((folder) => (
                  <Link key={folder.href} href={folder.href}>
                    <span
                      className={cn(
                        "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
                        folder.active
                          ? "text-purple-600 border border-purple-100"
                          : "text-gray-700 hover:border hover:border-gray-200",
                      )}
                    >
                      <div className="flex items-center">
                        <folder.icon className="mr-3 h-4 w-4" />
                        {folder.title}
                      </div>
                      {folder.count && <span className="text-xs rounded-full px-2 py-0.5 border">{folder.count}</span>}
                    </span>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Contacts Section */}
            <Collapsible open={openSections.contacts} onOpenChange={() => toggleSection("contacts")} className="mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500">
                <span>CONTACTS</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openSections.contacts ? "transform rotate-180" : "",
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2">
                {contactsItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:border hover:border-gray-200">
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.title}
                    </span>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Apps Section */}
            <Collapsible open={openSections.apps} onOpenChange={() => toggleSection("apps")} className="mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500">
                <span>APPS</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openSections.apps ? "transform rotate-180" : "",
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2">
                {appsItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:border hover:border-gray-200">
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.title}
                    </span>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Labels Section */}
            <Collapsible open={openSections.labels} onOpenChange={() => toggleSection("labels")} className="mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500">
                <span>LABELS</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openSections.labels ? "transform rotate-180" : "",
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2">
                {mailLabels.map((label) => (
                  <Link key={label.href} href={label.href}>
                    <span className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:border hover:border-gray-200">
                      <span className={`h-2 w-2 rounded-full mr-3 ${label.color}`} />
                      {label.title}
                    </span>
                  </Link>
                ))}
                <Link href="/mail/manage-labels">
                  <span className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:border hover:border-gray-200">
                    <Tag className="mr-3 h-4 w-4" />
                    Manage Labels
                  </span>
                </Link>
              </CollapsibleContent>
            </Collapsible>

            {/* Settings Section */}
            <Collapsible open={openSections.settings} onOpenChange={() => toggleSection("settings")} className="mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500">
                <span>SETTINGS</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openSections.settings ? "transform rotate-180" : "",
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2">
                <Link href="/settings">
                  <span className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:border hover:border-gray-200">
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </span>
                </Link>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="rounded-lg border border-dashed p-4">
            <div className="flex items-center space-x-2 mb-3">
              <span className="font-semibold">PRO</span>
              <div className="h-5 w-5 rounded flex items-center justify-center border border-purple-200">
                <span className="text-xs text-purple-600">✨</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Upgrade for more storage and premium features</p>
            <Button className="w-full text-white border-purple-600" style={{ backgroundColor: "#7c3aed" }}>
              Upgrade PRO
            </Button>
          </div>
        </div>
      </div>

      <ComposeDialog open={isComposeOpen} onOpenChange={setIsComposeOpen} />
    </>
  )
}

