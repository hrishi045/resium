import Link from 'next/link'
import React from 'react'
import styles from '../styles/Comment.module.scss'
import { replaceRedditLinks } from '../utils/processMarkdown'
import cx from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/en-il'
import relativeTime from 'dayjs/plugin/relativeTime'
import ReactMarkDownHTML from 'react-markdown/with-html'
import ExternalLink from './ExternalLink'

dayjs.locale('en-il')
dayjs.extend(relativeTime)

interface CommentProps {
  comment: Record<string, any>
}
export function CommentBody({ comment }: CommentProps) {
  return (
    <>
      <div className={cx(styles.body, 'overflow-hidden')}>
        <div
          className={cx(
            styles.wrapper,
            'px-3 py-1 text-sm'
            // 'px-3 py-1 text-sm'
          )}
        >
          <div>
            <div
              className={cx(
                styles.header,
                'flex gap-2 my-2 text-xs text-gray-600 dark:text-coolGray-400'
              )}
            >
              <div
                className={cx(
                  styles.author,
                  'pl-0 font-medium text-yellow-900 dark:text-blue-300 border-l-0'
                )}
              >
                {comment.author}
              </div>
              <div className={styles.points}>{comment.ups} points</div>
              <div className="">
                {dayjs.unix(comment.created_utc).fromNow()}
              </div>
            </div>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: replaceRedditLinks(comment.body_html),
              }}
              
            ></div> */}
            <ReactMarkDownHTML
              className="mb-2 text-sm text-gray-900 dark:text-gray-200"
              escapeHtml={false}
              source={replaceRedditLinks(comment.body_html)}
              renderers={{
                link: ({ children, href }) => {
                  if (href.contains(process.env.NEXT_PUBLIC_BASE_URL))
                    return (
                      <Link href={href}>
                        <a>{children}</a>
                      </Link>
                    )
                  else
                    return <ExternalLink href={href}>{children}</ExternalLink>
                },
              }}
            />
          </div>
        </div>
      </div>
      {comment.replies.length === 0 && comment.depth === 9 && (
        <div className="border-l-2 border-gray-800 dark:border-gray-400">
          <Link href={comment.permalink}>
            <a className="block px-3 py-2 text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:text-gray-800 bg-gray-50 dark:bg-gray-900 dark:hover:text-gray-400">
              Continue thread &hellip;
            </a>
          </Link>
        </div>
      )}
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
