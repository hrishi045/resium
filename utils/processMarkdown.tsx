import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

// This is a horrible function, but it works.
// TODO: DRY so much
export function replaceRedditLinks(text: string): string {
  return text
    .replace(/(https?:\/\/((old|www).)?reddit.com)/gi, `${baseURL}`)
    .replace(
      /[)(\][{}\s](?:\/)?((r|u)\/[A-Za-z0-9]{1,20})[)(\][{}\s]/gi,
      ` [$1](${baseURL}/$1) `
    )
    .replace(
      /^(?:\/)?((r|u)\/[A-Za-z0-9]{1,20})[)(\][{}\s]/gi,
      ` [$1](${baseURL}/$1) `
    )
    .replace(
      /[)(\][{}\s](?:\/)?((r|u)\/[A-Za-z0-9]{1,20})$/gi,
      ` [$1](${baseURL}/$1) `
    )
    .replace(/^(?:\/)?((r|u)\/[A-Za-z0-9]{1,20})$/gi, ` [$1](${baseURL}/$1) `)
}

export default function ProcessMarkdown({ text }) {
  return (
    <ReactMarkdown plugins={[gfm]}>{replaceRedditLinks(text)}</ReactMarkdown>
  )
}
