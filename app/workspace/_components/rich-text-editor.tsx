"use client"

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import { extensions } from "@/lib/tiptap-extensions"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
  ImageIcon,
  CheckSquare,
  Type,
  Palette,
} from "lucide-react"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  editable?: boolean
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Write something...",
  editable = true,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions,
    content,
    editable,
    onUpdate: ({ editor }: { editor: any }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert focus:outline-none max-w-none min-h-[150px] px-3 py-2",
      },
    },
  })

  if (!editor) {
    return null
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)

    if (url === null) {
      return
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  const addImage = () => {
    const url = window.prompt("URL")

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap items-center gap-1 p-1 border-b">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Underline"
        >
          <Underline className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1" />

        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet List"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("taskList")}
          onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
          aria-label="Task List"
        >
          <CheckSquare className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1" />

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
          aria-label="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
          aria-label="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
          aria-label="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1" />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Type className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Heading</h4>
              <div className="grid gap-1">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                  Heading 1
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                  Heading 2
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                  Heading 3
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                >
                  Paragraph
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <Tabs defaultValue="text">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="highlight">Highlight</TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="mt-2">
                <div className="grid grid-cols-5 gap-1">
                  {["#000000", "#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#f97316", "#14b8a6", "#f43f5e"].map(
                    (color) => (
                      <button
                        key={color}
                        className="w-6 h-6 rounded-md border"
                        style={{ backgroundColor: color }}
                        onClick={() => editor.chain().focus().setColor(color).run()}
                      />
                    ),
                  )}
                </div>
              </TabsContent>
              <TabsContent value="highlight" className="mt-2">
                <div className="grid grid-cols-5 gap-1">
                  {["#ffffff", "#fef9c3", "#d1fae5", "#dbeafe", "#f3e8ff", "#ffedd5", "#ccfbf1", "#fee2e2"].map(
                    (color) => (
                      <button
                        key={color}
                        className="w-6 h-6 rounded-md border"
                        style={{ backgroundColor: color }}
                        onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                      />
                    ),
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={setLink}>
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={addImage}>
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>

      <EditorContent editor={editor} className="overflow-y-auto" />

      {editor.isActive("link") && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-popover text-popover-foreground shadow-md border rounded-md p-1 flex items-center gap-1">
            <Input
              className="h-8 w-40"
              defaultValue={editor.getAttributes("link").href}
              onChange={(e) => {
                editor.chain().focus().extendMarkRange("link").setLink({ href: e.target.value }).run()
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()}
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
          </div>
        </BubbleMenu>
      )}
    </div>
  )
}

