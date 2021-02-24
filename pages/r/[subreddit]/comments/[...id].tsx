import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../../../styles/Post.module.scss'
import { usePost } from '../../../../redditapi/hooks'
import { PostCommentsInner } from '../../../../components/PostCommentsInner'
import { PostComments } from '../../../../components/PostComments'
import cx from 'classnames'
import ThemeChanger from '../../../../components/ThemeChanger'
import Link from 'next/link'

export default function Handler() {
  const {
    query: { subreddit, id },
    asPath,
  } = useRouter()

  const { data, isLoading, isError } = usePost({ id: id && 't3_' + id[0] })

  if (isError) return <p>Failed to fetch post</p>
  if (isLoading) return <p>Loading post...</p>

  return (
    <div
      className={cx(
        styles.post,
        'bg-white dark:bg-gray-900 pb-12 mx-auto sm:mb-0'
      )}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{data.title}</title>
      </Head>
      <ThemeChanger />
      <div className="p-4">
        <div className="py-4">
          <Link href={`/r/${data.subreddit}`}>
            <a className="text-base font-bold text-yellow-900 dark:text-lightBlue-300">
              /r/{data.subreddit}
            </a>
          </Link>
          <br />
          <Link href={`/u/${data.author}`}>
            <a className="text-base font-medium text-fuchsia-800 dark:text-indigo-400">
              /u/{data.author}
            </a>
          </Link>
          <p className="font-medium text-gray-700 dark:text-gray-200">
            {data.title}
          </p>
        </div>
        <p className={styles.selftext}>{data.selftext}</p>
        {data.media && (
          <video
            className={styles.video}
            controls
            width={data.media.reddit_video.width}
          >
            <source
              src={data.media.reddit_video.fallback_url}
              type="video/mp4"
            />
          </video>
        )}
        {data.url &&
          (data.url as string).match(/\.(jpg|jpeg|png|gif|webp)/) && (
            <img className={styles.image} src={data.url} />
          )}
      </div>

      {id.length >= 3 ? (
        <>
          <PostCommentsInner
            currentPath={asPath}
            comment={id[2]}
            sub={subreddit}
            id={data.id}
          />
        </>
      ) : (
        <PostComments sub={subreddit as string} id={data.id} />
      )}
    </div>
  )
}
