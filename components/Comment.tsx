import Link from 'next/link'
import React from 'react'
import styles from '../styles/Comment.module.scss'
import { replaceRedditLinks } from '../utils/processMarkdown'
import cx from 'classnames'

interface CommentProps {
  comment: Record<string, any>
}
export function CommentBody({ comment }: CommentProps) {
  return (
    <>
      <div className={cx(styles.body, 'm-0 overflow-hidden')}>
        <div
          className={cx(styles.wrapper, 'px-3 py-1 text-sm border-t border-b')}
        >
          <div>
            <div
              className={cx(
                styles.header,
                'flex gap-2 mt-2 text-xs text-gray-600'
              )}
            >
              <div
                className={cx(
                  styles.author,
                  'pl-0 font-medium text-yellow-800 border-l-0'
                )}
              >
                {comment.author}
              </div>
              <div className={styles.points}>{comment.ups} points</div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: replaceRedditLinks(comment.body_html),
              }}
              className="mb-2 text-gray-800"
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
    </>
  )
}
const Comment = ({ comment }: CommentProps) => {
  return (
    <div className={styles.comment}>
      <CommentBody comment={comment} />
    </div>
  )
}

export default Comment
