import React, { createRef, useEffect, useState } from 'react'
import Comment from './Comment'
import Link from 'next/link'
import { useCommentsForPost, useMoreCommentsForPost } from '../redditapi/hooks'
import useKeyPress from '../utils/useKeyPress'
import useOnScreen from '../utils/useOnScreen'

export function PostComments({ sub, id }) {
  const { data, isLoading, isError } = useCommentsForPost({
    sub,
    id,
  })

  const [selected, setSelected] = useState(undefined)
  const downPress = useKeyPress('j')
  const upPress = useKeyPress('k')
  const enterPress = useKeyPress('Enter')
  const [cursor, setCursor] = useState(0)
  const [hovered, setHovered] = useState(undefined)
  const [refs, setRefs] = useState([])
  // const refsOnScreen = useOnScreen(refs)

  useEffect(() => {
    if (data)
      setRefs((elRefs) =>
        Array(data.length)
          .fill(null)
          .map((_, i) => elRefs[i] || createRef())
      )
  }, [data])

  useEffect(() => {
    refs[cursor]?.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [cursor])

  console.log(cursor)

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
  // useEffect(() => {
  //   if (data && data.length && enterPress) {
  //     setSelected(data[cursor])
  //   }
  // }, [cursor, enterPress])
  // useEffect(() => {
  //   if (data && data.length && hovered) {
  //     setCursor(data.indexOf(hovered))
  //   }
  // }, [hovered])

  if (isError) return <p>Failed to load comments</p>
  if (isLoading) return <p>Loading comments...</p>

  return (
    <div>
      {data.map((comment, i) => (
        <div
          ref={refs[i]}
          key={comment.name}
          className={`comment ${i === cursor ? 'active' : ''}`}
          onClick={() => setSelected(comment)}
          onMouseEnter={() => setHovered(comment)}
          onMouseLeave={() => setHovered(undefined)}
        >
          <Comment comment={comment} />
        </div>
      ))}
      <style global jsx>{`
        .active {
          transform: translateY(-1px);
          margin-top: -1px;
          background: white;
        }
      `}</style>
    </div>
  )
}
