import React from 'react'
import Comment from './Comment'
import { useCommentsForPost } from '../redditapi/hooks'

export function PostComments({ sub, id }) {
  const { data, isLoading, isError } = useCommentsForPost({ sub, id })

  if (isError) return <p>Failed to load comments</p>
  if (isLoading) return <p>Loading comments...</p>

  return (
    <div>
      {data.map((comment) => (
        <Comment key={comment.name} comment={comment} />
      ))}
    </div>
  )
}
