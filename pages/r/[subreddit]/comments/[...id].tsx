import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../../../styles/Post.module.scss'
import { usePost } from '../../../../redditapi/hooks'
import { PostCommentsInner } from '../../../../components/PostCommentsInner'
import { PostComments } from '../../../../components/PostComments'

export default function Handler() {
  const {
    query: { subreddit, id },
    asPath,
  } = useRouter()

  const { data, isLoading, isError } = usePost({ id: id && 't3_' + id[0] })

  if (isError) return <p>Failed to fetch post</p>
  if (isLoading) return <p>Loading post...</p>

  return (
    <div className={styles.post}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{data.title}</title>
      </Head>
      <p className={styles.subreddit}>/r/{data.subreddit}</p>
      <br />
      <p className={styles.author}>{data.author}</p>
      <p className={styles.title}>{data.title}</p>
      <p className={styles.selftext}>{data.selftext}</p>
      {data.media && (
        <video
          className={styles.video}
          controls
          width={data.media.reddit_video.width}
        >
          <source src={data.media.reddit_video.fallback_url} type="video/mp4" />
        </video>
      )}
      {data.url && (data.url as string).match(/\.(jpg|jpeg|png|gif|webp)/) && (
        <img className={styles.image} src={data.url} />
      )}
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
