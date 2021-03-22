import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../../../styles/Post.module.scss'
import { usePost } from '../../../../redditapi/hooks'
import { PostCommentsInner } from '../../../../components/PostCommentsInner'
import { PostComments } from '../../../../components/PostComments'
import cx from 'classnames'
import Link from 'next/link'
import ThemeChanger from '../../../../components/ThemeChanger'

export default function Handler() {
  const {
    query: { subreddit, id },
    asPath,
  } = useRouter()

  const { data, isLoading, isError } = usePost({ id: id && 't3_' + id[0] })

  if (isError) return <p>Failed to fetch post</p>
  if (isLoading) return <p>Loading post...</p>

  return (
    <div className={cx('bg-gray-200 dark:bg-gray-700')}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{data.title}</title>
      </Head>
      <ThemeChanger />
      <div className="pb-12 mx-auto sm:mb-0 max-w-6xl">
        <div className="p-4 m-4 bg-white dark:bg-gray-800 shadow rounded">
          <div className="py-4">
            <Link href={`/r/${data.subreddit}`}>
              <a className="font-bold text-yellow-900 dark:text-lightBlue-300">
                /r/{data.subreddit}
              </a>
            </Link>
            <br />
            <Link href={`/u/${data.author}`}>
              <a className="font-medium text-fuchsia-800 dark:text-indigo-400">
                /u/{data.author}
              </a>
            </Link>
            <h1 className="font-medium text-gray-700 dark:text-gray-200">
              {data.title}
            </h1>
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
              <img className="max-w-full max-h-96" src={data.url} />
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
    </div>
  )
}
