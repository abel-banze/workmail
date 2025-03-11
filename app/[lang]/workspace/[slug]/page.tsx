import InboxPage from "./body-content"
import { getEmails, getEmailById } from "@/lib/data"

export default async function Inbox() {
  const emails = await getEmails("inbox")
  const firstEmail = emails.length > 0 ? await getEmailById(emails[0].id) : null

  return (
    <>
      <InboxPage />
    </>
  )
}

