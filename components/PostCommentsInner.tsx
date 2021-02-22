import React, {
  createRef,
  RefObject,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import { useMoreCommentsForPost } from '../redditapi/hooks'
import useKeyPress from '../utils/useKeyPress'
import TopLevelComment from './TopLevelComment'
import { OrderedMap } from 'immutable'

export function PostCommentsInner({ currentPath, sub, id, comment }) {
  const { data, isLoading, isError } = useMoreCommentsForPost({
    sub,
    id,
    comment,
  })

  const downPress = useKeyPress('j')
  const upPress = useKeyPress('k')
  const [scrollPos, setScrollPos] = useState(0)
  const [refs, setRefs] = useState<RefObject<HTMLDivElement>[]>([])
  const renders = useRef(0)

  const [cursor, dispatch] = useReducer(function reducer(state, action) {
    if (action.type === 'add') {
      return state.set(action.key, true)
    } else if (action.type === 'remove') {
      return state.set(action.key, false)
    }
  }, OrderedMap())

  renders.current++

  const nextId = Math.min(
    Math.min(
      ...cursor
        .toArray()
        .filter((x) => x[1])
        .map((x) => x[0])
    ) + 1,
    refs.length - 1
  )
  const prevId = Math.max(
    Math.min(
      ...cursor
        .toArray()
        .filter((x) => x[1])
        .map((x) => x[0])
    ) - 1,
    0
  )

  // Resets the refs on new data
  useEffect(() => {
    if (data)
      setRefs((elRefs) =>
        Array(data.length)
          .fill(null)
          .map((_, i) => elRefs[i] || createRef())
      )
  }, [data])

  // Handles the scrolling into view
  useEffect(() => {
    if (refs[scrollPos])
      window.scrollTo({
        top:
          refs[scrollPos].current.getBoundingClientRect().top +
          window.pageYOffset,
        behavior: 'smooth',
      })
  }, [scrollPos])

  useEffect(() => {
    if (data && data.length && downPress) {
      setScrollPos(nextId)
    }
  }, [downPress])

  useEffect(() => {
    if (data && data.length && upPress) {
      setScrollPos(prevId)
    }
  }, [upPress])

  if (isError) return <p>Failed to load comments</p>
  if (isLoading) return <p>Loading comments...</p>

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
        <TopLevelComment
          key={comment.name}
          cursor={cursor}
          dispatch={dispatch}
          refs={refs}
          id={i}
          comment={comment}
        />
      ))}
    </div>
  )
}
