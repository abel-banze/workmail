import type { Email } from "./types"

const mockEmails: Email[] = [
  {
    id: "1",
    subject: "Request Material Delivery",
    preview: "Dear John Doe, I hope this message finds you well...",
    body: `<p>Dear John Doe,</p>
           <p>I hope this message finds you well.</p>
           <p>We are in need of the following materials for an upcoming project and would greatly appreciate your assistance with the delivery. Kindly arrange for the following items to be delivered to our Store at your earliest convenience:</p>
           <ol>
             <li>Truck Delivery
               <ul>
                 <li>Quantity: 1</li>
                 <li>Can loading 5 Ton</li>
               </ul>
             </li>
             <li>Forklift
               <ul>
                 <li>Quantity: 2</li>
                 <li>If could with the driver</li>
               </ul>
             </li>
           </ol>
           <p>Please ensure that the materials are securely packaged and labeled correctly. Additionally, kindly include a packing slip with details of the delivered items.</p>
           <p>Warm regards,<br>Ronald Richards</p>`,
    sender: {
      id: "1",
      name: "Ronald Richards",
      email: "ronaldrichards@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40&text=RR",
    },
    recipients: [
      {
        id: "admin",
        name: "Egghead Admin",
        email: "admin@egghead.com",
      },
    ],
    date: "December 12, 2023 • 10:00 AM",
    read: false,
    starred: false,
    labels: [],
    hasAttachments: true,
    attachments: [
      {
        name: "Permission 1.pdf",
        size: 2457600,
        type: "application/pdf",
        url: "#",
      },
      {
        name: "Permission 2.pdf",
        size: 1843200,
        type: "application/pdf",
        url: "#",
      },
    ],
    status: "delivered",
  },
  {
    id: "2",
    subject: "Ask Delivery status",
    preview: "Available for a chat?",
    body: "Available for a chat?",
    sender: {
      id: "2",
      name: "Savannah Nguyen",
      email: "savannah@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=SN",
    },
    recipients: [
      {
        id: "admin",
        name: "Egghead Admin",
        email: "admin@egghead.com",
      },
    ],
    date: "18 Oct",
    read: true,
    starred: false,
    labels: ["new"],
    hasAttachments: false,
    attachments: [],
    status: "read",
  },
  {
    id: "3",
    subject: "Request Material Delivery",
    preview: "Great, I've sent them now, cheers",
    body: "Great, I've sent them now, cheers",
    sender: {
      id: "3",
      name: "Jerome Bell",
      email: "jerome@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JB",
    },
    recipients: [
      {
        id: "admin",
        name: "Egghead Admin",
        email: "admin@egghead.com",
      },
    ],
    date: "10 Oct",
    read: true,
    starred: false,
    labels: ["new"],
    hasAttachments: false,
    attachments: [],
    status: "read",
  },
  {
    id: "4",
    subject: "Request Material Delivery",
    preview: "Great, I've sent them now, cheers",
    body: "Great, I've sent them now, cheers",
    sender: {
      id: "4",
      name: "Marvin McKinney",
      email: "marvin@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=MM",
    },
    recipients: [
      {
        id: "admin",
        name: "Egghead Admin",
        email: "admin@egghead.com",
      },
    ],
    date: "8 Oct",
    read: true,
    starred: false,
    labels: ["new"],
    hasAttachments: false,
    attachments: [],
    status: "read",
  },
  {
    id: "5",
    subject: "Need approve for delivery new order",
    preview: "Hi boss, need your approve here, will sent you the details later",
    body: "Hi boss, need your approve here, will sent you the details later",
    sender: {
      id: "5",
      name: "Theresa Webb",
      email: "theresa@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=TW",
    },
    recipients: [
      {
        id: "admin",
        name: "Egghead Admin",
        email: "admin@egghead.com",
      },
    ],
    date: "9/9/23",
    read: true,
    starred: false,
    labels: [],
    hasAttachments: false,
    attachments: [],
    status: "read",
  },
  {
    id: "6",
    subject: "Courier trouble",
    preview: "Hi, I need your help here. Your courier bring my package to wrong address",
    body: "Hi, I need your help here. Your courier bring my package to wrong address",
    sender: {
      id: "6",
      name: "Cody Fisher",
      email: "cody@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=CF",
    },
    recipients: [
      {
        id: "admin",
        name: "Egghead Admin",
        email: "admin@egghead.com",
      },
    ],
    date: "2/9/23",
    read: true,
    starred: false,
    labels: [],
    hasAttachments: false,
    attachments: [],
    status: "read",
  },
  {
    id: "7",
    subject: "Admin assessment",
    preview: "Hi boss, here the preview for new admin manager",
    body: "Hi boss, here the preview for new admin manager",
    sender: {
      id: "7",
      name: "Wade Warren",
      email: "wade@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=WW",
    },
    recipients: [
      {
        id: "admin",
        name: "Egghead Admin",
        email: "admin@egghead.com",
      },
    ],
    date: "1/9/23",
    read: true,
    starred: false,
    labels: [],
    hasAttachments: false,
    attachments: [],
    status: "read",
  },
  {
    id: "8",
    subject: "Request Material Delivery",
    preview: "Bro, need some material here. Please call me soon",
    body: "Bro, need some material here. Please call me soon",
    sender: {
      id: "8",
      name: "Jenny Wilson",
      email: "jenny@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JW",
    },
    recipients: [
      {
        id: "admin",
        name: "Egghead Admin",
        email: "admin@egghead.com",
      },
    ],
    date: "1/8/23",
    read: true,
    starred: false,
    labels: [],
    hasAttachments: false,
    attachments: [],
    status: "read",
  },
  {
    id: "9",
    subject: "Request Material Delivery",
    preview: "Great, I've sent them now, cheers",
    body: "Great, I've sent them now, cheers",
    sender: {
      id: "9",
      name: "Dianne Russell",
      email: "dianne@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=DR",
    },
    recipients: [
      {
        id: "admin",
        name: "Egghead Admin",
        email: "admin@egghead.com",
      },
    ],
    date: "20/7/23",
    read: true,
    starred: false,
    labels: [],
    hasAttachments: false,
    attachments: [],
    status: "read",
  },
]

export async function getEmails(folder: string): Promise<Email[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockEmails
}

export async function getEmailById(id: string): Promise<Email | null> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return mockEmails.find((email) => email.id === id) || null
}

