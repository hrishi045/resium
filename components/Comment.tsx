import Link from 'next/link'
import React from 'react'
import styles from '../styles/Comment.module.scss'
import { replaceRedditLinks } from '../utils/processMarkdown'

const Comment = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <div>
            <div className={styles.header}>
              <div className={styles.author}>{comment.author}</div>
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

export default Comment
