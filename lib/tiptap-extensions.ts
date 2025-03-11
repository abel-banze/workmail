import { StarterKit } from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"

export const extensions = [
  StarterKit.configure({
    bulletList: false,
    orderedList: false,
  }),
  Underline,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-primary underline cursor-pointer",
    },
  }),
  Image.configure({
    allowBase64: true,
    HTMLAttributes: {
      class: "rounded-md max-w-full",
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  BulletList,
  OrderedList,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
]

