import React from 'react'
import { useRouter } from 'next/router'
import { useSubreddit } from '../../../redditapi/hooks'
import Head from 'next/head'
import Link from 'next/link'

const Router = () => {
  const {
    query: { subreddit },
  } = useRouter()

  const { data, isLoading, isError } = useSubreddit({ id: subreddit as string })

  if (isError) return <p>Failed to fetch post</p>
  if (isLoading) return <p>Loading post &hellip;</p>

  return (
    <div>
      <Head>
        <title>r/{subreddit}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h1 className="text-lg font-medium">r/{subreddit}</h1>
        </div>
        {data.map((post) => (
          <div className="post" key={post.name}>
            <p>
              <Link href={post.permalink}>
                <a>{post.title}</a>
              </Link>
            </p>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Router
