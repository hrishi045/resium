import { OrderedMap } from 'immutable'
import Link from 'next/link'
import React, { Dispatch, RefObject, useEffect } from 'react'
import styles from '../styles/Comment.module.scss'
import { replaceRedditLinks } from '../utils/processMarkdown'
import Comment from './Comment'

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
  }, [cursor])

  return (
    <div className={styles.comment} ref={refs[id]}>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <div>
            <div className={styles.header}>
              <div className={styles.author}>
                {id} {cursor[0] == id && '[+]'} {comment.author}
              </div>
              <div className={styles.points}>{comment.ups} points</div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: replaceRedditLinks(comment.body_html),
              }}
              className={styles.text}
            ></div>
          </div>
          {comment.replies.length === 0 && comment.depth === 9 && (
            <div>
              <Link href={comment.permalink}>Continue thread..</Link>
            </div>
          )}
        </div>
      </div>
      {comment.replies.map((reply) => (
        <Comment key={reply.name} comment={reply} />
      ))}
    </div>
  )
}

export default TopLevelComment
