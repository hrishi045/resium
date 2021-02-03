import React from 'react'
import Comment from './Comment'
import { useMoreCommentsForPost } from '../redditapi/hooks'
import Link from 'next/link'

export function PostCommentsInner({ currentPath, sub, id, comment }) {
  const { data, isLoading, isError } = useMoreCommentsForPost({
    sub,
    id,
    comment,
  })

  if (isError) return <p>Failed to load comments</p>
  if (isLoading) return <p>Loading comments...</p>

  return (
    <div>
      <Link href={currentPath.replace(data[0].id, '')}>View all comments</Link>
      {data[0] && (
        <Link
          href={currentPath.replace(data[0].id, data[0].parent_id.slice(3))}
        >
          Go to parent
        </Link>
      )}
      {data.map((comment) => (
        <Comment
          post_uri={`/r/${sub}/comments/${id}/`}
          key={comment.name}
          comment={comment}
        />
      ))}
    </div>
  )
}
