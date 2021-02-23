import { OrderedMap } from 'immutable'
import React, { Dispatch, RefObject, useEffect } from 'react'
import styles from '../styles/Comment.module.scss'
import cx from 'classnames'
import { CommentBody } from './Comment'

interface TopLevelCommentProps {
  comment: Record<string, any>
  id: number
  dispatch: Dispatch<any>
  refs: RefObject<HTMLDivElement>[]
  cursor: OrderedMap<number, boolean>
}
const TopLevelComment = ({
  comment,
  id,
  dispatch,
  refs,
  cursor,
}: TopLevelCommentProps) => {
  useEffect(() => {
    if (!refs[id]) return

    function intersectCb(entry: IntersectionObserverEntry[]) {
      entry[0].isIntersecting && true
      if (entry[0].isIntersecting) {
        dispatch({ type: 'add', key: id })
      } else {
        dispatch({ type: 'remove', key: id })
      }
    }

    const observer = new IntersectionObserver(intersectCb, {
      rootMargin: '0px',
      threshold: 0.05,
    })
    observer.observe(refs[id].current)
    return () => observer.disconnect()
  }, [cursor, refs])

  return (
    <div
      className={cx(styles.comment, 'bg-white dark:bg-gray-900')}
      ref={refs[id]}
    >
      <CommentBody comment={comment} />
    </div>
  )
}

export default TopLevelComment
