"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, FileText, Calendar, Bookmark, LinkIcon, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function ContactView() {
  const [activeTab, setActiveTab] = useState("files")

  return (
    <div className="w-full flex">
        
      <div className="w-full flex bg-background">
        <ContactSidebar />
        <div className="flex-1 flex flex-col">
          <header className="flex items-center h-14 px-4 border-b lg:h-[60px] gap-4">
            <div className="flex items-center gap-2 md:hidden">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sarah Johnson" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-sm font-medium">Sarah Johnson</h2>
                <p className="text-xs text-muted-foreground">Product Designer</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                  <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
                  <DropdownMenuItem>Share Contact</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete Contact</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <ScrollArea className="flex-1 overflow-auto p-4 md:p-6">
            <div className="mx-auto max-w-5xl">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="files">Files</TabsTrigger>
                    <TabsTrigger value="agenda">Agenda</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="files" className="space-y-4">
                  <FilesContent />
                </TabsContent>

                <TabsContent value="agenda" className="space-y-4">
                  <AgendaContent />
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <NotesContent />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

function ContactSidebar({ onTabChange, activeTab } : any) {
  return (
    <ScrollArea className="flex flex-col h-full border-r">
      <div className="p-6 flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Sarah Johnson" />
          <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">Sarah Johnson</h2>
        <p className="text-sm text-muted-foreground mb-2">Product Designer</p>
        <Badge variant="outline" className="mb-4">
          Primary Contact
        </Badge>
      </div>

      <Separator />

      <div className="p-6 flex-1">
        <h3 className="text-sm font-medium mb-3">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-sm">sarah.johnson@example.com</p>
              <p className="text-xs text-muted-foreground">Work</p>
            </div>
          </div>
          <div className="flex items-start">
            <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-sm">(555) 123-4567</p>
              <p className="text-xs text-muted-foreground">Mobile</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-sm">123 Design Street</p>
              <p className="text-sm">San Francisco, CA 94107</p>
              <p className="text-xs text-muted-foreground">Work</p>
            </div>
          </div>
          <div className="flex items-start">
            <LinkIcon className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-sm">sarahjohnson.design</p>
              <p className="text-xs text-muted-foreground">Portfolio</p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="p-6">
        <h3 className="text-sm font-medium mb-3">View</h3>
        <div className="space-y-1">
          <Button
            variant={activeTab === "files" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onTabChange("files")}
          >
            <FileText className="h-4 w-4 mr-2" />
            Files
          </Button>
          <Button
            variant={activeTab === "agenda" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onTabChange("agenda")}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Agenda
          </Button>
          <Button
            variant={activeTab === "notes" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onTabChange("notes")}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Notes
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}

function FilesContent() {
  const files = [
    { name: "Project Proposal.pdf", type: "PDF", size: "2.4 MB", date: "May 12, 2023" },
    { name: "Design Assets.zip", type: "ZIP", size: "14.8 MB", date: "Apr 23, 2023" },
    { name: "Meeting Notes.docx", type: "DOCX", size: "342 KB", date: "Mar 15, 2023" },
    { name: "Product Mockups.sketch", type: "SKETCH", size: "8.2 MB", date: "Feb 28, 2023" },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Files</h2>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Upload File
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shared Files</CardTitle>
          <CardDescription>Files shared with or by Sarah Johnson</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="bg-muted p-2 rounded mr-3">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.type} • {file.size}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{file.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AgendaContent() {
  const meetings = [
    { title: "Product Review", date: "Today", time: "2:00 PM - 3:00 PM", attendees: 5 },
    { title: "Design Sprint Planning", date: "Tomorrow", time: "10:00 AM - 11:30 AM", attendees: 8 },
    { title: "Quarterly Review", date: "May 20, 2023", time: "1:00 PM - 3:00 PM", attendees: 12 },
    { title: "Client Presentation", date: "May 25, 2023", time: "9:00 AM - 10:00 AM", attendees: 4 },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Agenda</h2>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Meetings</CardTitle>
          <CardDescription>Scheduled meetings with Sarah Johnson</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meetings.map((meeting, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="font-medium">{meeting.title}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-sm text-muted-foreground">
                      {meeting.date} • {meeting.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    {Array(Math.min(3, meeting.attendees))
                      .fill(0)
                      .map((_, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-background">
                          <AvatarFallback className="text-[10px]">{String.fromCharCode(65 + i)}</AvatarFallback>
                        </Avatar>
                      ))}
                    {meeting.attendees > 3 && (
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-[10px] font-medium">
                        +{meeting.attendees - 3}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function NotesContent() {
  const notes = [
    {
      title: "Project Requirements",
      date: "May 10, 2023",
      preview: "Discussed key requirements for the new dashboard design...",
    },
    {
      title: "Client Feedback",
      date: "Apr 28, 2023",
      preview: "Sarah provided feedback on the initial mockups and suggested...",
    },
    {
      title: "Meeting Action Items",
      date: "Mar 15, 2023",
      preview: "1. Update wireframes based on feedback\n2. Schedule follow-up...",
    },
    { title: "Design Ideas", date: "Feb 22, 2023", preview: "Brainstormed ideas for the mobile navigation pattern..." },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Notes</h2>
        <Button>
          <Bookmark className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Notes</CardTitle>
          <CardDescription>Notes and reminders related to Sarah Johnson</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{note.title}</h3>
                  <p className="text-xs text-muted-foreground">{note.date}</p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{note.preview}</p>
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

