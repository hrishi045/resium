import { ReactChildren } from 'react'

export default function ExternalLink({
  href,
  children,
}: {
  href: string
  children: ReactChildren
}) {
  return (
    <div>
      <a href={href}>{children}</a>
    </div>
  )
}
