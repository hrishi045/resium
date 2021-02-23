import { OrderedMap } from 'immutable'
import React, {
  createRef,
  RefObject,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import { useCommentsForPost } from '../redditapi/hooks'
import useKeyPress from '../utils/useKeyPress'
import MobileFooter from './MobileFooter'
import TopLevelComment from './TopLevelComment'

interface PostCommentsProp {
  sub: string
  id: string
}
export function PostComments({ sub, id }: PostCommentsProp) {
  const {
    data,
    isLoading,
    isError,
  }: {
    data: Record<string, any>[]
    isLoading: boolean
    isError: boolean
  } = useCommentsForPost({
    sub,
    id,
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

  // useEffect(() => {
  //   setActiveComment(intersects.indexOf(true))
  // }, [intersects])

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
    // refs[scrollPos]?.current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    //   inline: 'nearest',
    // })
    if (refs[scrollPos])
      window.scrollTo({
        top:
          refs[scrollPos].current.getBoundingClientRect().top +
          window.pageYOffset,
        behavior: 'smooth',
      })
  }, [scrollPos])

  const goNext = () => {
    if (data && data.length) {
      setScrollPos(nextId)
    }
  }

  const goPrev = () => {
    if (data && data.length) {
      setScrollPos(prevId)
    }
  }

  useEffect(() => {
    if (downPress) goNext()
  }, [downPress])

  useEffect(() => {
    if (upPress) goPrev()
  }, [upPress])

  if (isError) return <p>Failed to load comments</p>
  if (isLoading) return <p>Loading comments...</p>

  return (
    <div>
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
      <MobileFooter goNext={goNext} goPrev={goPrev} />
    </div>
  )
}
