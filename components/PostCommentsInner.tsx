import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import Link from 'next/link'
import { useMoreCommentsForPost } from '../redditapi/hooks'
import useKeyPress from '../utils/useKeyPress'

export function PostCommentsInner({ currentPath, sub, id, comment }) {
  const { data, isLoading, isError } = useMoreCommentsForPost({
    sub,
    id,
    comment,
  })

  console.log(data)

  const [selected, setSelected] = useState(undefined)
  const downPress = useKeyPress('ArrowDown')
  const upPress = useKeyPress('ArrowUp')
  const enterPress = useKeyPress('Enter')
  const [cursor, setCursor] = useState(0)
  const [hovered, setHovered] = useState(undefined)

  useEffect(() => {
    if (data && data.length && downPress) {
      setCursor((prevState) =>
        prevState < data.length - 1 ? prevState + 1 : prevState
      )
    }
    console.log('DOWNN', data)
  }, [downPress])
  useEffect(() => {
    if (data && data.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState))
    }
  }, [upPress])
  useEffect(() => {
    if (data && data.length && enterPress) {
      setSelected(data[cursor])
    }
  }, [cursor, enterPress])
  useEffect(() => {
    if (data && data.length && hovered) {
      setCursor(data.indexOf(hovered))
    }
  }, [hovered])

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
      {data.map((comment, i) => (
        <div
          key={comment.name}
          className={`comment ${i === cursor ? 'active' : ''}`}
          onClick={() => setSelected(comment)}
          onMouseEnter={() => setHovered(comment)}
          onMouseLeave={() => setHovered(undefined)}
        >
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  )
}
