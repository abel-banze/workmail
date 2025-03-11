"use client"

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import { extensions } from "@/lib/tiptap-extensions"
import FontSize from '@tiptap/extension-font-size'
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "react-i18next"
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
  Type,
  Palette,
  Heading1,
  Heading2,
  Heading3,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { useState } from "react"

interface EnhancedEditorProps {
    content: string
    onChange: (content: string) => void
    placeholder?: string
    editable?: boolean
    minHeight?: "sm" | "md" | "lg" | "xl" // Change to use predefined sizes
    maxHeight?: "sm" | "md" | "lg" | "xl" // Change to use predefined sizes
    className?: string
    compact?: boolean
  }

export function EnhancedEditor({
  content,
  onChange,
  placeholder,
  editable = true,
  minHeight = "md", // Default to medium size
  maxHeight = "xl",
  className = "",
  compact = false,
}: EnhancedEditorProps) {
  const { t } = useTranslation()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const editor = useEditor({
    extensions: [...extensions, FontSize],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm dark:prose-invert focus:outline-none max-w-none ${
          isFullscreen ? "min-h-[50vh]" : `min-h-${minHeight}`
        } px-3 py-2`,
        placeholder: placeholder || t("writeSomething"),
      },
    },
  })

  if (!editor) {
    return null
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt(t("link"), previousUrl)

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
    const url = window.prompt(t("image"))

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const fontSizes = [
    { value: "small", label: t("fontSize") + ": " + t("small") },
    { value: "normal", label: t("fontSize") + ": " + t("normal") },
    { value: "large", label: t("fontSize") + ": " + t("large") },
    { value: "huge", label: t("fontSize") + ": " + t("huge") },
  ]

  return (
    <div className={`border rounded-md ${className} ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}>
      <div className={`flex ${compact ? "flex-wrap" : ""} items-center gap-1 p-1 border-b`}>
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label={t("bold")}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label={t("italic")}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label={t("underline")}
        >
          <Underline className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          aria-label={t("strikethrough")}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1" />

        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          aria-label={t("bulletList")}
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label={t("numberedList")}
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        {!compact && (
          <>
            <div className="w-px h-6 bg-border mx-1" />

            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "left" })}
              onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
              aria-label={t("alignLeft")}
            >
              <AlignLeft className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "center" })}
              onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
              aria-label={t("alignCenter")}
            >
              <AlignCenter className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "right" })}
              onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
              aria-label={t("alignRight")}
            >
              <AlignRight className="h-4 w-4" />
            </Toggle>
          </>
        )}

        <div className="w-px h-6 bg-border mx-1" />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Type className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">{t("heading")}</h4>
              <div className="grid gap-1">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                  <Heading1 className="h-4 w-4 mr-2" />
                  {t("heading")} 1
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                  <Heading2 className="h-4 w-4 mr-2" />
                  {t("heading")} 2
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                  <Heading3 className="h-4 w-4 mr-2" />
                  {t("heading")} 3
                </Button>
              </div>

              <h4 className="font-medium text-sm">{t("fontSize")}</h4>
              <Select
                onValueChange={(value) => {
                  if (value === "small") {
                    editor.chain().focus().setFontSize("12px").run();
                  } else if (value === "normal") {
                    editor.chain().focus().setFontSize("16px").run()
                  } else if (value === "large") {
                    editor.chain().focus().setFontSize("20px").run()
                  } else if (value === "huge") {
                    editor.chain().focus().setFontSize("24px").run()
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("fontSize")} />
                </SelectTrigger>
                <SelectContent>
                  {fontSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <TabsTrigger value="text">{t("fontColor")}</TabsTrigger>
                <TabsTrigger value="highlight">{t("highlight")}</TabsTrigger>
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

        {!compact && (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={addImage}>
            <ImageIcon className="h-4 w-4" />
          </Button>
        )}

        <div className="ml-auto">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? t("minimize") : t("maximize")}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className={`overflow-y-auto ${isFullscreen ? "h-[calc(100vh-120px)]" : `max-h-${maxHeight}`}`}>
        <EditorContent editor={editor} />
      </div>

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

