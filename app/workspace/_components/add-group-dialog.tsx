"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { CircleDashed, Star, Briefcase, Heart, Users, Tag } from "lucide-react"

interface AddGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const iconOptions = [
  { id: "default", icon: CircleDashed, color: "text-gray-500" },
  { id: "star", icon: Star, color: "text-yellow-500" },
  { id: "work", icon: Briefcase, color: "text-blue-500" },
  { id: "personal", icon: Heart, color: "text-red-500" },
  { id: "family", icon: Users, color: "text-green-500" },
  { id: "custom", icon: Tag, color: "text-purple-500" },
]

export function AddGroupDialog({ open, onOpenChange }: AddGroupDialogProps) {
  const [name, setName] = useState("")
  const [selectedIcon, setSelectedIcon] = useState("default")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      toast.error("Group name is required")
      return
    }

    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call to add the group
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success( `${name} group has been created`)

      // Reset form and close dialog
      setName("")
      setSelectedIcon("default")
      onOpenChange(false)
    } catch (error) {
      toast.error("There was an error creating the group. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Contact Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Group Name
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Icon</Label>
              <div className="flex flex-wrap gap-2 col-span-3">
                {iconOptions.map((option) => {
                  const IconComponent = option.icon
                  return (
                    <Button
                      key={option.id}
                      type="button"
                      variant={selectedIcon === option.id ? "default" : "outline"}
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setSelectedIcon(option.id)}
                    >
                      <IconComponent className={`h-5 w-5 ${option.color}`} />
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

